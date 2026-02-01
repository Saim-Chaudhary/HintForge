// OpenRouter API Client
// Handles communication with OpenRouter for AI capabilities

import { OpenRouterRequest, OpenRouterResponse } from '@/types';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct:free';

interface CallOpenRouterOptions {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
  retries?: number;
}

export class OpenRouterError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'OpenRouterError';
  }
}

/**
 * Call OpenRouter API with retry logic and error handling
 */
export async function callOpenRouter(
  options: CallOpenRouterOptions
): Promise<string> {
  const {
    systemPrompt,
    userPrompt,
    temperature = 0.7,
    maxTokens = 800,
    retries = 1,
  } = options;

  if (!OPENROUTER_API_KEY) {
    throw new OpenRouterError('OPENROUTER_API_KEY is not configured');
  }

  const request: OpenRouterRequest = {
    model: OPENROUTER_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature,
    max_tokens: maxTokens,
  };

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
          'X-Title': 'HintForge',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new OpenRouterError(
          `OpenRouter API error: ${response.statusText}`,
          response.status,
          errorText
        );
      }

      const data: OpenRouterResponse = await response.json();

      if (!data.choices || data.choices.length === 0) {
        throw new OpenRouterError('No response from OpenRouter API');
      }

      const content = data.choices[0].message.content;
      
      if (!content) {
        throw new OpenRouterError('Empty response from OpenRouter API');
      }

      return content.trim();

    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't retry on certain errors
      if (error instanceof OpenRouterError && error.statusCode === 401) {
        throw error; // Authentication error - no point retrying
      }

      // Log attempt failure
      console.error(`OpenRouter attempt ${attempt + 1}/${retries + 1} failed:`, lastError.message);

      // Wait before retrying (exponential backoff)
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  throw new OpenRouterError(
    `Failed after ${retries + 1} attempts: ${lastError?.message}`,
    undefined,
    lastError
  );
}

/**
 * Test the OpenRouter connection
 */
export async function testOpenRouterConnection(): Promise<boolean> {
  try {
    const response = await callOpenRouter({
      systemPrompt: 'You are a helpful assistant.',
      userPrompt: 'Say "OK" if you can hear me.',
      temperature: 0.3,
      maxTokens: 50,
      retries: 0,
    });

    return response.toLowerCase().includes('ok');
  } catch (error) {
    console.error('OpenRouter connection test failed:', error);
    return false;
  }
}

/**
 * Parse JSON response from AI with error handling
 */
export function parseAIResponse<T>(content: string): T {
  try {
    // Try to extract JSON from markdown code blocks
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || 
                      content.match(/```\s*([\s\S]*?)\s*```/);
    
    const jsonStr = jsonMatch ? jsonMatch[1] : content;
    
    return JSON.parse(jsonStr.trim());
  } catch (error) {
    throw new OpenRouterError(
      'Failed to parse AI response as JSON',
      undefined,
      error
    );
  }
}
