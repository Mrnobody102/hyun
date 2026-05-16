// Centralized configuration for the ChatBot
export const CHATBOT_CONFIG = {
    // The model used for semantic search (RAG)
    embeddingModel: 'gemini-embedding-2',
    
    // The model used for generating conversational responses
    // Using 2.5-flash as it has available quota in your account
    chatModel: 'gemini-2.5-flash',
    
    // API Version to use
    apiVersion: 'v1beta'
};
