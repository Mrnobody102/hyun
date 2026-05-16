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
                text: `Article titled "${titleMatch[1]}" in category "${categoryMatch ? categoryMatch[1] : 'General'}". Content summary: ${cleanText(bodyMatch[1])}`
            });
        }
    } else {
        // Special handling for project-like files
        if (content.includes('title:') && content.includes('description:')) {
            // Match each object block in the array
            const blocks = content.match(/\{[\s\S]+?\}(?=\s*,|\s*\])/g) || [];
            for (const block of blocks) {
                const title = (block.match(/title:\s*['"](.+?)['"]/) || [])[1];
                const github = (block.match(/githubLink:\s*['"](.+?)['"]/) || [])[1];
                const live = (block.match(/liveLink:\s*['"](.+?)['"]/) || [])[1];
                const tags = (block.match(/tags:\s*\[(.+?)\]/s) || [])[1];
                
                if (title) {
                    let text = `Project: ${title}. `;
                    const descEn = (block.match(/en:\s*['"](.+?)['"]/) || [])[1];
                    const descVi = (block.match(/vi:\s*['"](.+?)['"]/) || [])[1];
                    
                    if (descEn) text += `Description (EN): ${descEn}. `;
                    if (descVi) text += `Description (VI): ${descVi}. `;
                    if (tags) text += `Technologies: ${tags.replace(/['"\s]/g, '')}. `;
                    if (github) text += `GitHub Repository: ${github}. `;
                    if (live) text += `Live Demo Link: ${live}. `;
                    
                    chunks.push({
                        source: fileName,
                        type: 'project-detail',
                        text: text.trim()
                    });
                }
            }
        } 
        
        // Special handling for skills.js
        if (fileName === 'skills.js') {
            const categories = content.match(/\w+:\s*\{[\s\S]+?\}\s*(?=,\s*\w+:|\s*\})/g) || [];
            for (const cat of categories) {
                const titleEn = (cat.match(/en:\s*['"](.+?)['"]/) || [])[1];
                const skillsList = (cat.match(/skills:\s*\[(.+?)\]/s) || [])[1];
                if (titleEn && skillsList) {
                    chunks.push({
                        source: fileName,
                        type: 'skill-category',
                        text: `Huy's skills in ${titleEn}: ${skillsList.replace(/['"\s]/g, '')}`
                    });
                }
            }
        }

        // Special handling for about.js
        if (fileName === 'about.js') {
            const paragraphs = content.match(/paragraph\d+:\s*\{[\s\S]+?\}/g) || [];
            for (const p of paragraphs) {
                const en = (p.match(/en:\s*['"](.+?)['"]/) || [])[1];
                const vi = (p.match(/vi:\s*['"](.+?)['"]/) || [])[1];
                if (en || vi) {
                    chunks.push({
                        source: fileName,
                        type: 'about-paragraph',
                        text: `About Huy: ${en || ''} ${vi ? '(Vietnamese: ' + vi + ')' : ''}`
                    });
                }
            }
        }

        if (chunks.length === 0) {
            // Fallback for other data files
            const objectBlocks = content.match(/\{[\s\S]+?\}(?=\s*,|\s*\])/g) || [];
            for (const block of objectBlocks) {
                const cleaned = cleanText(block);
                if (cleaned.length > 40) {
                    chunks.push({
                        source: fileName,
                        type: 'data-entry',
                        text: `Information from ${fileName}: ${cleaned}`
                    });
                }
            }
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
