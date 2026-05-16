import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { CHATBOT_CONFIG } from '../src/config/chatbot';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

let cachedKbData = null;

function cosineSimilarity(vecA, vecB) {
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

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, history, language } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // 1. Generate embedding for the user message
        const model = genAI.getGenerativeModel({ model: CHATBOT_CONFIG.embeddingModel });
        const embeddingResult = await model.embedContent(message);
        const userEmbedding = embeddingResult.embedding.values;

        // 2. Load knowledge base
        const kbPath = path.join(process.cwd(), 'public', 'chatbot', 'knowledge-base.json');
        
        if (!cachedKbData) {
            if (!fs.existsSync(kbPath)) {
                return res.status(500).json({ error: 'Knowledge base not found. Please run embedding generation script.' });
            }
            cachedKbData = JSON.parse(fs.readFileSync(kbPath, 'utf-8'));
        }
        
        const kbData = cachedKbData;

        // 3. Find most relevant chunks
        const similarities = kbData.map(item => ({
            ...item,
            similarity: cosineSimilarity(userEmbedding, item.embedding)
        }));

        const topChunks = similarities
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 5); // Take top 5 chunks

        const context = topChunks.map(chunk => chunk.text).join('\n\n');

        // 4. Generate response using Gemini
        const chatModel = genAI.getGenerativeModel({ model: CHATBOT_CONFIG.chatModel });
        
        const systemInstruction = `
            You are a helpful and professional AI assistant for Pham Quang Huy's (Hyun) portfolio website.
            Your goal is to answer questions about Huy's experience, projects, skills, and articles based on the provided context.
            
            Context about Huy:
            ${context}
            
            Guidelines:
            - If the information is not in the context, say you don't know but offer to let the user contact Huy via the contact form.
            - Be polite, concise, and professional.
            - Huy's full name is Pham Quang Huy (nickname: Hyun).
            - Respond in ${language === 'vi' ? 'Vietnamese' : 'English'}.
            - Use Markdown for formatting (bold, lists, etc.).
            - Mention specific projects or companies from the context when relevant.
        `;

        const chat = chatModel.startChat({
            history: history.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }],
            })),
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(
            `${systemInstruction}\n\nUser Question: ${message}`
        );
        const responseText = result.response.text();

        return res.status(200).json({ response: responseText });

    } catch (error) {
        console.error('Chat API Error:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
