export const CHATBOT_CONFIG = {
    // Ưu tiên: gemini -> groq -> openai
    
    // Cấu hình Gemini (Mặc định - Miễn phí)
    gemini: {
        chatModel: 'gemini-1.5-flash',
        embeddingModel: 'gemini-embedding-001',
        apiVersion: 'v1beta',
    },

    // Cấu hình Groq (Dự phòng 1 - Siêu nhanh & Miễn phí)
    groq: {
        chatModel: 'llama-3.1-8b-instant',
    },

    // Cấu hình OpenAI (Dự phòng cuối - Trả phí)
    openai: {
        chatModel: 'gpt-4o-mini',
        embeddingModel: 'text-embedding-3-small',
    }
};
