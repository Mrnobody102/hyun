import { GoogleGenerativeAI } from '@google/generative-ai';
import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { CHATBOT_CONFIG } from '../src/config/chatbot.js';

dotenv.config();

const geminiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const openaiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
const groqKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;

const genAI = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;
const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;

const kbCache = {
    gemini: null,
    openai: null
};

function cosineSimilarity(vecA, vecB) {
    if (!vecA || !vecB) return 0;
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function getContext(message, provider) {
    let kbProvider = provider === 'groq' ? 'gemini' : provider;
    let kbPath = path.join(process.cwd(), 'public', 'chatbot', `knowledge-base-${kbProvider}.json`);
    
    if (!fs.existsSync(kbPath)) {
        kbPath = path.join(process.cwd(), 'public', 'chatbot', 'knowledge-base.json');
    }

    if (!kbCache[kbProvider]) {
        if (!fs.existsSync(kbPath)) throw new Error(`KB not found`);
        kbCache[kbProvider] = JSON.parse(fs.readFileSync(kbPath, 'utf-8'));
    }

    let userEmbedding;
    try {
        if (kbProvider === 'openai') {
            const response = await openai.embeddings.create({
                model: CHATBOT_CONFIG.openai.embeddingModel,
                input: message,
            });
            userEmbedding = response.data[0].embedding;
        } else {
            const model = genAI.getGenerativeModel(
                { model: CHATBOT_CONFIG.gemini.embeddingModel },
                { apiVersion: CHATBOT_CONFIG.gemini.apiVersion }
            );
            const result = await model.embedContent(message);
            userEmbedding = result.embedding.values;
        }

        const similarities = kbCache[kbProvider]
            .filter(item => item.embedding) // Chỉ lấy các item có embedding
            .map(item => ({
                ...item,
                similarity: cosineSimilarity(userEmbedding, item.embedding)
            }));

        if (similarities.length === 0) throw new Error('No embeddings available');

        return similarities
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 8)
            .map(chunk => chunk.text)
            .join('\n\n');
    } catch (embeddingError) {
        console.warn('⚠️ Embedding failed, falling back to keyword search:', embeddingError.message);
        
        // Simple Keyword Search Fallback
        const keywords = message.toLowerCase().split(' ').filter(w => w.length > 2);
        const matches = kbCache[kbProvider].map(item => {
            const text = item.text.toLowerCase();
            let score = 0;
            keywords.forEach(word => { if (text.includes(word)) score++; });
            return { ...item, score };
        });

        return matches
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map(chunk => chunk.text)
            .join('\n\n');
    }
}

async function tryProvider(provider, message, history, language) {
    const context = await getContext(message, provider);
    const systemInstruction = `You are Huy's professional AI assistant. 
DỮ LIỆU GỐC: ${context}. 

QUY TẮC BẮT BUỘC:
1. Chỉ trả lời dựa trên DỮ LIỆU GỐC được cung cấp. Không tự ý thêm thắt thông tin ngoài luồng.
2. Trả lời đúng trọng tâm, khuôn phép, chuyên nghiệp và nhất quán.
3. Respond in the language the user is using.
4. Tuyệt đối không trộn lẫn các bộ chữ cái (ví dụ: không dùng chữ Hán trong câu tiếng Việt).`;

    if (provider === 'openai') {
        const response = await openai.chat.completions.create({
            model: CHATBOT_CONFIG.openai.chatModel,
            messages: [{ role: 'system', content: systemInstruction }, ...history.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content })), { role: 'user', content: message }],
            max_tokens: 1000,
            temperature: 0, // Đảm bảo câu trả lời nhất quán
        });
        return response.choices[0].message.content;
    } else if (provider === 'groq') {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${groqKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: CHATBOT_CONFIG.groq.chatModel,
                messages: [{ role: 'system', content: systemInstruction }, ...history.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content })), { role: 'user', content: message }],
                max_tokens: 1000,
                temperature: 0, // Đảm bảo câu trả lời nhất quán
            })
        });
        const data = await response.json();
        return data.choices?.[0]?.message?.content || "Groq Error";
    } else {
        const chatModel = genAI.getGenerativeModel(
            { model: CHATBOT_CONFIG.gemini.chatModel },
            { apiVersion: CHATBOT_CONFIG.gemini.apiVersion }
        );

        let geminiHistory = history.map(msg => ({ 
            role: msg.role === 'user' ? 'user' : 'model', 
            parts: [{ text: msg.content }] 
        }));
        
        while (geminiHistory.length > 0 && geminiHistory[0].role !== 'user') {
            geminiHistory.shift();
        }

        const chat = chatModel.startChat({ 
            history: geminiHistory,
            generationConfig: {
                temperature: 0, // Đảm bảo câu trả lời nhất quán
                maxOutputTokens: 1000,
            }
        });
        const result = await chat.sendMessage(`${systemInstruction}\n\nUser Question: ${message}`);
        return result.response.text();
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { message, history, language } = req.body;

    try {
        console.log('🤖 Layer 1: Gemini...');
        return res.status(200).json({ response: await tryProvider('gemini', message, history, language) });
    } catch (e1) {
        console.error('⚠️ Gemini failed:', e1.message);
        try {
            if (!groqKey) throw new Error('No Groq Key');
            console.log('🤖 Layer 2: Groq...');
            return res.status(200).json({ response: await tryProvider('groq', message, history, language) });
        } catch (e2) {
            console.error('⚠️ Groq failed:', e2.message);
            try {
                if (!openaiKey) throw new Error('No OpenAI Key');
                console.log('🤖 Layer 3: OpenAI...');
                return res.status(200).json({ response: await tryProvider('openai', message, history, language) });
            } catch (e3) {
                console.error('❌ All AI providers failed:', e3.message);
                const contactMessage = language === 'vi' 
                    ? "Rất tiếc, các hệ thống AI của tôi hiện đang bảo trì. Bạn vui lòng liên hệ trực tiếp với Huy qua:\n\n📧 Email: huypq1801@gmail.com\n📱 SĐT/Zalo: 0986.865.089\n🌐 LinkedIn: https://www.linkedin.com/in/huypham102\n\nCảm ơn bạn! 🙏"
                    : "I'm sorry, my AI systems are currently under maintenance. Please contact Huy directly at:\n\n📧 Email: huypq1801@gmail.com\n📱 Phone: +84 986 865 089\n🌐 LinkedIn: https://www.linkedin.com/in/huypham102\n\nThank you! 🙏";
                return res.status(200).json({ response: contactMessage });
            }
        }
    }
}
