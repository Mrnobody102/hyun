import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { CHATBOT_CONFIG } from '../src/config/chatbot.js';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error('Please set GEMINI_API_KEY in your environment variables');
    process.exit(1);
}

const DATA_DIR = './src/data';
const ARTICLES_DIR = './src/articles';
const OUTPUT_FILE = './public/chatbot/knowledge-base.json';

async function generateEmbedding(text, modelName = CHATBOT_CONFIG.embeddingModel) {
    const url = `https://generativelanguage.googleapis.com/${CHATBOT_CONFIG.apiVersion}/models/${modelName}:embedContent?key=${API_KEY}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: { parts: [{ text }] }
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || 'API call failed');
    }

    const data = await response.json();
    return data.embedding.values;
}

function cleanText(text) {
    if (typeof text !== 'string') return '';
    return text
        .replace(/import\s+.+?;/g, '')
        .replace(/export\s+const\s+\w+\s*=\s*/g, '')
        .replace(/[`'"]\s*\+\s*[`'"]/g, '')
        .replace(/[\r\n]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

async function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const chunks = [];
    const fileName = path.basename(filePath);
    
    if (fileName.startsWith('article-')) {
        const titleMatch = content.match(/title:\s*['"](.+?)['"]/);
        const bodyMatch = content.match(/content:\s*`([\s\S]+?)`/);
        const categoryMatch = content.match(/category:\s*['"](.+?)['"]/);
        
        if (titleMatch && bodyMatch) {
            chunks.push({
                source: fileName,
                type: 'article',
                title: titleMatch[1],
                text: `Article: ${titleMatch[1]}. Category: ${categoryMatch ? categoryMatch[1] : 'General'}. Content: ${cleanText(bodyMatch[1])}`
            });
        }
    } else {
        if (content.includes('[{') || content.includes(' = [')) {
            const objectBlocks = content.match(/\{[\s\S]+?\}(?=\s*,|\s*\])/g) || [];
            for (const block of objectBlocks) {
                const cleaned = cleanText(block);
                if (cleaned.length > 50) {
                    chunks.push({
                        source: fileName,
                        type: 'data-entry',
                        text: `${fileName}: ${cleaned}`
                    });
                }
            }
        } 
        if (chunks.length === 0) {
            chunks.push({
                source: fileName,
                type: 'data-file',
                text: `${fileName}: ${cleanText(content)}`
            });
        }
    }
    return chunks;
}

async function main() {
    console.log('🚀 Starting embedding generation with fallback models...');
    
    if (!fs.existsSync('./public/chatbot')) {
        fs.mkdirSync('./public/chatbot', { recursive: true });
    }

    const files = [
        ...fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.js')).map(f => path.join(DATA_DIR, f)),
        ...fs.readdirSync(ARTICLES_DIR).filter(f => f.startsWith('article-')).map(f => path.join(ARTICLES_DIR, f))
    ];

    const knowledgeBase = [];
    let activeModel = CHATBOT_CONFIG.embeddingModel;

    console.log(`🔍 Using model: ${activeModel}`);

    for (const file of files) {
        console.log(`📦 Processing ${file}...`);
        try {
            const fileChunks = await processFile(file);
            for (const chunk of fileChunks) {
                console.log(`  ✨ Embedding chunk (${chunk.text.substring(0, 40)}...)`);
                const embedding = await generateEmbedding(chunk.text, activeModel);
                knowledgeBase.push({ ...chunk, embedding });
            }
        } catch (error) {
            console.error(`  ⚠️ Error: ${error.message}`);
        }
    }

    if (knowledgeBase.length > 0) {
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(knowledgeBase, null, 2));
        console.log(`\n✅ Success! Generated ${knowledgeBase.length} vectors.`);
    } else {
        console.log('\n❌ Failed to generate any embeddings.');
    }
}

main();
