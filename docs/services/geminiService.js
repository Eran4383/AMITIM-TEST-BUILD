import { GoogleGenAI, Type } from "@google/genai";

// This check is to prevent crashes in environments where process.env is not defined.
const apiKey = typeof process !== 'undefined' && process.env && process.env.API_KEY
  ? process.env.API_KEY
  : undefined;

if (!apiKey) {
  console.warn("API_KEY environment variable not set. Smart search will be disabled.");
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Gets related search terms for a given query using the Gemini API.
 * @param query The user's search term.
 * @returns A promise that resolves to an array of related search terms.
 */
export const getRelatedSearchTerms = async (query) => {
  if (!ai) {
    return []; // Return empty if API key is not set
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Given the search term for community activities '${query}', provide a list of up to 3 related or synonymous terms in Hebrew. For example, for 'בריכה' you might suggest 'שחיה'. Return ONLY a JSON array of strings, like ["term1", "term2"]. If no good suggestions are found, return an empty array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
        temperature: 0.2,
      },
    });

    const jsonString = response.text.trim();
    const relatedTerms = JSON.parse(jsonString);
    
    if (Array.isArray(relatedTerms) && relatedTerms.every(item => typeof item === 'string')) {
        return relatedTerms;
    }
    return [];

  } catch (error) {
    console.error("Error fetching related search terms from Gemini:", error);
    // In case of an error (e.g., API error, parsing error), fall back gracefully.
    return [];
  }
};
