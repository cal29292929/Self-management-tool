
import { GoogleGenAI } from "@google/genai";
import { CbtEntry } from '../types';

if (!process.env.API_KEY) {
    // This provides a clearer message in the console if the key is missing during development/build.
    console.error("API_KEY environment variable not set. Please ensure it is configured in your deployment environment.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

interface BalancedThoughtPrompt {
    situation: string;
    mood: string;
    rating: number;
    negativeThought: string;
}

export const getBalancedThought = async (promptData: BalancedThoughtPrompt): Promise<string> => {
     if (!process.env.API_KEY) {
        throw new Error('APIキーが設定されていません。');
    }
    
    const { situation, mood, rating, negativeThought } = promptData;
    const prompt = `以下の状況と気分に基づいて、ネガティブな思考に対するよりバランスの取れた、建設的な考え方を提案してください。
    状況: ${situation}
    気分: ${mood} (5段階評価: ${rating})
    ネガティブ思考: ${negativeThought}
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API call for balanced thought failed:", error);
        throw new Error('Geminiからの提案の取得中にエラーが発生しました。しばらくしてからもう一度お試しください。');
    }
};

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' });
};

export const getEntriesAnalysis = async (entries: CbtEntry[]): Promise<string> => {
     if (!process.env.API_KEY) {
        throw new Error('APIキーが設定されていません。');
    }

    const recentEntries = entries.slice(0, 10);
    const formattedEntries = recentEntries.map(entry => {
        const customFieldsText = Object.entries(entry)
            .filter(([key]) => key.startsWith('custom_'))
            .map(([key, value]) => `${key.replace('custom_', '')}: ${value}`)
            .join(', ');
        
        return `日付: ${formatDate(entry.timestamp)}, 気分: ${entry.mood} (${entry.rating}点), ネガティブ思考: ${entry.negativeThought}${customFieldsText ? `, ${customFieldsText}` : ''}`;
    }).join('\n');

    const prompt = `以下の自己管理ノートの記録を分析し、ユーザーの感情の傾向や繰り返されるネガティブ思考のパターンを要約してください。
    そして、認知行動療法（CBT）の考え方に基づき、現状を改善するための短く建設的なアドバイスを提案してください。Markdown形式で見やすく整形してください。
    記録:\n${formattedEntries}`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API call for analysis failed:", error);
        throw new Error('Geminiによる分析の取得中にエラーが発生しました。しばらくしてからもう一度お試しください。');
    }
};