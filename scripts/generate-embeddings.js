import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { OpenAI } from 'openai';
import { CHATBOT_CONFIG } from '../src/config/chatbot.js';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const openai = OPENAI_KEY ? new OpenAI({ apiKey: OPENAI_KEY }) : null;

async function getEmbedding(text, provider) {
    try {
        if (provider === 'openai' && openai) {
            const response = await openai.embeddings.create({
                model: CHATBOT_CONFIG.openai.embeddingModel,
                input: text,
            });
            return response.data[0].embedding;
        } else if (genAI) {
            const model = genAI.getGenerativeModel(
                { model: CHATBOT_CONFIG.gemini.embeddingModel },
                { apiVersion: CHATBOT_CONFIG.gemini.apiVersion }
            );
            const result = await model.embedContent(text);
            return result.embedding.values;
        }
    } catch (e) {
        console.warn(`  ⚠️ Could not generate embedding for a chunk: ${e.message}`);
    }
    return null; // Trả về null nếu không tạo được embedding
}

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

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
    
    const skipFiles = ['ui.js', 'header.js', 'footer.js', 'index.js', 'portfolioData.js', 'articles.js'];
    if (skipFiles.includes(fileName)) return [];

    if (fileName === 'personalProjects.js') {
        const blocks = content.match(/\{[\s\S]+?\}(?=\s*,|\s*\])/g) || [];
        for (const block of blocks) {
            const title = (block.match(/title:\s*\{[\s\S]+?vi:\s*['"](.+?)['"]/) || block.match(/title:\s*['"](.+?)['"]/))?.[1];
            if (title) chunks.push({ source: fileName, type: 'personal-project', text: `[DỰ ÁN CÁ NHÂN] Tên dự án: ${title}. Chi tiết: ${cleanText(block)}` });
        }
    } else if (fileName === 'companyProjects.js') {
        const blocks = content.match(/\{[\s\S]+?\}(?=\s*,|\s*\])/g) || [];
        for (const block of blocks) {
            const name = (block.match(/name:\s*['"](.+?)['"]/) || [])[1];
            if (name) chunks.push({ source: fileName, type: 'company-project', text: `[DỰ ÁN CÔNG TY] Tên dự án: ${name}. Chi tiết: ${cleanText(block)}` });
        }
    } else if (fileName === 'educationExperience.js') {
        const items = content.match(/\{[\s\S]+?\}(?=\s*,|\s*\])/g) || [];
        for (const item of items) chunks.push({ source: fileName, type: 'experience', text: `[KINH NGHIỆM] ${cleanText(item)}` });
    } else if (fileName === 'skills.js') {
        chunks.push({ source: fileName, type: 'skill', text: `[KỸ NĂNG] ${cleanText(content)}` });
    } else if (['about.js', 'personalInfo.js', 'contact.js'].includes(fileName)) {
        chunks.push({ source: fileName, type: 'info', text: `[GIỚI THIỆU] ${cleanText(content)}` });
    }
    return chunks;
}

async function runForProvider(provider) {
    console.log(`🚀 Processing Knowledge Base for ${provider.toUpperCase()}...`);
    const OUTPUT_DIR = path.join(process.cwd(), 'public', 'chatbot');
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.js')).map(f => path.join(DATA_DIR, f));
    const knowledgeBase = [];

    for (const file of files) {
        try {
            const chunks = await processFile(file);
            for (const chunk of chunks) {
                const embedding = await getEmbedding(chunk.text, provider);
                knowledgeBase.push({ ...chunk, embedding });
            }
        } catch (e) { console.error(`  ⚠️ Error in file ${file}: ${e.message}`); }
    }

    if (knowledgeBase.length > 0) {
        fs.writeFileSync(path.join(OUTPUT_DIR, `knowledge-base-${provider}.json`), JSON.stringify(knowledgeBase, null, 2));
        fs.writeFileSync(path.join(OUTPUT_DIR, `knowledge-base.json`), JSON.stringify(knowledgeBase, null, 2));
        console.log(`✅ Success! Generated ${knowledgeBase.length} data entries.`);
    }
}

async function main() {
    // Run at least for Gemini (or generic)
    await runForProvider('gemini');
}

main();
