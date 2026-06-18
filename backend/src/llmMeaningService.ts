import { FinalOutput } from './tokenizer/types';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
dotenv.config();

export async function fetchContextualMeaning(output: FinalOutput): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_api_key_here') {
    // Dynamic mock fallback based on actual tokens
    const tokensStr = output.cleanTokens.join(', ');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`[MOCK MODE] The text appears to discuss the following concepts: ${tokensStr}.\n\nTo get a real AI explanation, please create a .env file in the backend folder with GEMINI_API_KEY=your_key and restart the backend server.\n\n(Note: Automata handled tokenization.)`);
      }, 1500);
    });
  }

  const prompt = `
You are not allowed to tokenize the raw input.
You will only explain the contextual meaning of the already-tokenized output.

Raw Input:
${output.rawInput}

Clean Tokens:
${output.cleanTokens.join(', ')}

Detected Language Type:
${output.languageType}

Detected Noise:
${output.detectedNoise.join(', ')}

Detected Keywords:
${output.detectedKeywords.join(', ')}

Explain the contextual meaning in simple English. Mention the likely meaning of the sentence. Do not change the tokens. Do not add new tokens.
  `;

  try {
    if (apiKey.startsWith('sk-or-')) {
      // OpenRouter API
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await response.json();
      if (!data.choices || !data.choices[0]) throw new Error(JSON.stringify(data));
      return data.choices[0].message.content + '\n\n(Note: Generated via OpenRouter API. Automata handled tokenization.)';
    } else {
      // Google Native API
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text + '\n\n(Note: Generated via Gemini API. Automata handled tokenization.)';
    }
  } catch (error: any) {
    console.error("LLM Error:", error);
    return `Error generating meaning: ${error.message}`;
  }
}
