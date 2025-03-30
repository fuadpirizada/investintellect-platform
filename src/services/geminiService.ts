
// Update to use the provided Gemini API key
const API_KEY = "AIzaSyCzCrpXvgkjXMfoslDCCoBOBxNrbcaQDl8";

interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export async function analyzeStockWithGemini(
  symbol: string,
  stockData: any,
  news: any
): Promise<string> {
  try {
    // Format the data for Gemini
    const prompt = `
      Analyze this stock data for ${symbol}:
      
      Price data:
      ${JSON.stringify(stockData, null, 2)}
      
      Recent news:
      ${JSON.stringify(news, null, 2)}
      
      Provide a concise recommendation (buy/sell/hold/short/long) with 1-3 sentence rationale based on technicals, fundamentals, and news sentiment.
    `;

    const requestBody: GeminiRequest = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API returned ${response.status}`);
    }

    const data: GeminiResponse = await response.json();

    // Extract the text from the response
    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0]
    ) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Unexpected Gemini API response format");
    }
  } catch (error) {
    console.error("Error in Gemini analysis:", error);
    return "Unable to generate analysis at this time. Please try again later.";
  }
}
