import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // There is no direct listModels in the client SDK, we usually use the REST API for that
    // but we can try to guess or use the common ones.
    
    // Let's try the common ones one by one
    const models = ['text-embedding-004', 'embedding-001', 'models/text-embedding-004', 'models/embedding-001'];
    for (const m of models) {
        try {
            const model = genAI.getGenerativeModel({ model: m });
            await model.embedContent('test');
            console.log(`✅ Model ${m} is available`);
        } catch (e) {
            console.log(`❌ Model ${m} failed: ${e.message}`);
        }
    }
}
listModels();
