// AI Service
// Core AI functionality for problem analysis, hints, and solution review

import { callOpenRouter, parseAIResponse, OpenRouterError } from './openrouter-client';
import { 
  ProblemContext, 
  AnalyzeProblemResponse, 
  GetHintResponse,
  AnalyzeSolutionResponse,
  Constraint,
  Example 
} from '@/types';

// Maximum hint levels
export const MAX_HINTS = 5;

// ============================================================================
// SYSTEM PROMPTS
// ============================================================================

const TUTOR_SYSTEM_PROMPT = `You are an expert computer science tutor specializing in data structures and algorithms. Your role is to guide students through problem-solving using the Socratic method.

CORE PRINCIPLES:
1. NEVER provide complete solutions or full code implementations
2. Guide through reasoning, not answers
3. Focus on pattern recognition and algorithmic thinking
4. Encourage independent problem-solving

RESPONSE STYLE:
- Clear, concise, educational
- Use analogies and examples
- Break complex concepts into digestible parts
- Celebrate progress and correct thinking

FORBIDDEN ACTIONS:
- Writing complete solution code
- Revealing optimal algorithms directly
- Solving the problem for the student
- Providing step-by-step code walkthroughs before student attempts`;

// ============================================================================
// USER PROMPT TEMPLATES
// ============================================================================

const PATTERN_IDENTIFICATION_TEMPLATE = `You are a DSA expert. Analyze this coding problem thoroughly.

Problem:
"""
{problemStatement}
"""

Provide your analysis as a JSON object with this exact format:
{
  "patterns": ["Pattern1", "Pattern2"],
  "constraints": [{"key": "name", "value": "detail"}],
  "examples": [{"input": "input description", "output": "output description"}],
  "difficulty": "easy",
  "timeComplexity": "O(n) - explanation of why",
  "spaceComplexity": "O(n) - explanation of why"
}

For the "patterns" field, identify algorithmic patterns like: Hash Map, Two Pointers, Sliding Window, Binary Search, DFS, BFS, Dynamic Programming, Greedy, Stack, Queue, Recursion, Sorting, etc.

For "difficulty", choose exactly one: "easy", "medium", or "hard".

For complexity, provide the optimal solution's Big O notation with a brief explanation.

Respond with ONLY the JSON object. No other text.`;

const HINT_GENERATION_TEMPLATE = `You are an expert DSA tutor helping a student solve a coding problem. Provide a detailed, educational hint.

Problem Context:
- Patterns involved: {patterns}
- Key constraints: {constraints}
- Student has received {previousHintCount} hints before this one

Current Hint Level: {hintLevel} out of 5

Hint Level Guidelines:
- Level 1: Ask 2-3 thought-provoking questions about the problem structure. Help them understand what the problem is really asking.
- Level 2: Suggest the general approach or data structure to consider (e.g., "A hash map could help here because..."). Explain WHY this approach works.
- Level 3: Describe the high-level algorithm step by step without any code. Walk through the logic clearly.
- Level 4: Provide pseudocode or step-by-step implementation guide. Be specific about the logic flow.
- Level 5: Discuss edge cases, optimizations, and common pitfalls. Help them perfect their solution.

IMPORTANT:
- Write at least 100 words for a complete, helpful hint
- Build on the context of previous hints
- Do NOT provide complete working code
- Be encouraging and educational
- Use examples where helpful

Provide your hint now:`;

const CODE_ANALYSIS_TEMPLATE = `Analyze the following student solution for a coding problem. Provide educational feedback.

Problem Patterns: {patterns}
Problem Constraints: {constraints}

Student Code ({language}):
"""
{code}
"""

Provide analysis in JSON format:
{
  "explanation": "What does this code do? Explain the approach.",
  "timeComplexity": "Big O time complexity with explanation",
  "spaceComplexity": "Big O space complexity with explanation",
  "issues": [
    {"type": "bug|inefficiency|edge-case", "description": "specific issue"}
  ],
  "suggestions": ["improvement suggestion 1", "improvement suggestion 2"],
  "correctness": "correct|partial|incorrect|unknown"
}

Be constructive and educational. If the solution is incorrect, guide toward the right approach without solving it for them.`;

// ============================================================================
// SAFEGUARD FUNCTIONS
// ============================================================================

/**
 * Check if response contains code solution (forbidden in early hints)
 */
export function containsCodeSolution(text: string, hintLevel: number): boolean {
  if (hintLevel >= 4) return false; // Pseudocode allowed at level 4+
  
  const codePatterns = [
    /function\s+\w+\s*\(/i,
    /def\s+\w+\s*\(/i,
    /class\s+\w+/i,
    /for\s*\(.*\)\s*\{/,
    /while\s*\(.*\)\s*\{/,
    /if\s*\(.*\)\s*\{/,
    /const\s+\w+\s*=/,
    /let\s+\w+\s*=/,
    /var\s+\w+\s*=/,
  ];
  
  return codePatterns.some(pattern => pattern.test(text));
}

/**
 * Validate hint progression (must be sequential)
 */
export function validateHintProgression(
  currentLevel: number,
  requestedLevel: number
): { valid: boolean; error?: string } {
  if (requestedLevel < 1 || requestedLevel > MAX_HINTS) {
    return { 
      valid: false, 
      error: `Hint level must be between 1 and ${MAX_HINTS}` 
    };
  }

  if (requestedLevel !== currentLevel + 1) {
    return { 
      valid: false, 
      error: 'Hints must be unlocked sequentially' 
    };
  }

  return { valid: true };
}

/**
 * Build hint prompt with context substitution
 */
function buildHintPrompt(
  level: number,
  context: ProblemContext
): string {
  return HINT_GENERATION_TEMPLATE
    .replace('{hintLevel}', level.toString())
    .replace('{previousHintCount}', (level - 1).toString())
    .replace('{patterns}', context.patterns.join(', '))
    .replace('{constraints}', JSON.stringify(context.constraints));
}

// ============================================================================
// MAIN AI FUNCTIONS
// ============================================================================

/**
 * Analyze a problem statement to identify patterns and constraints
 */
export async function analyzeProblem(
  problemStatement: string
): Promise<Omit<AnalyzeProblemResponse, 'sessionId'>> {
  try {
    const userPrompt = PATTERN_IDENTIFICATION_TEMPLATE
      .replace('{problemStatement}', problemStatement);

    const response = await callOpenRouter({
      systemPrompt: TUTOR_SYSTEM_PROMPT,
      userPrompt,
      temperature: 0.3,
      maxTokens: 1000,
    });

    console.log('Raw AI response:', response);

    const parsed = parseAIResponse<{
      patterns: string[];
      constraints: Constraint[];
      examples: Example[];
      difficulty: 'easy' | 'medium' | 'hard';
      timeComplexity?: string;
      spaceComplexity?: string;
    }>(response);

    console.log('Parsed response:', parsed);

    return {
      patterns: Array.isArray(parsed.patterns) ? parsed.patterns : [],
      constraints: Array.isArray(parsed.constraints) ? parsed.constraints : [],
      examples: Array.isArray(parsed.examples) ? parsed.examples : [],
      difficulty: parsed.difficulty || 'medium',
      timeComplexity: parsed.timeComplexity || undefined,
      spaceComplexity: parsed.spaceComplexity || undefined,
    };

  } catch (error) {
    console.error('Error analyzing problem:', error);
    throw new OpenRouterError(
      'Failed to analyze problem',
      undefined,
      error
    );
  }
}

/**
 * Generate a progressive hint for the current level
 */
export async function generateHint(
  level: number,
  context: ProblemContext
): Promise<string> {
  try {
    // Basic validation - level must be between 1 and MAX_HINTS
    if (level < 1 || level > MAX_HINTS) {
      throw new Error(`Hint level must be between 1 and ${MAX_HINTS}`);
    }

    const userPrompt = buildHintPrompt(level, context);

    const response = await callOpenRouter({
      systemPrompt: TUTOR_SYSTEM_PROMPT,
      userPrompt,
      temperature: 0.7,
      maxTokens: 600,
    });

    // Check for forbidden code in early hints
    if (containsCodeSolution(response, level)) {
      console.warn(`Hint level ${level} contained code solution, regenerating...`);
      
      // Retry with stricter prompt
      const stricterPrompt = userPrompt + '\n\nIMPORTANT: Do NOT include any code. Only provide conceptual guidance.';
      const retryResponse = await callOpenRouter({
        systemPrompt: TUTOR_SYSTEM_PROMPT,
        userPrompt: stricterPrompt,
        temperature: 0.6,
        maxTokens: 600,
      });

      return retryResponse;
    }

    return response;

  } catch (error) {
    console.error(`Error generating hint level ${level}:`, error);
    throw new OpenRouterError(
      `Failed to generate hint level ${level}`,
      undefined,
      error
    );
  }
}

/**
 * Analyze a student's solution code
 */
export async function analyzeSolution(
  code: string,
  language: string,
  context: ProblemContext
): Promise<Omit<AnalyzeSolutionResponse, 'sessionId'>> {
  try {
    const userPrompt = CODE_ANALYSIS_TEMPLATE
      .replace('{patterns}', context.patterns.join(', '))
      .replace('{constraints}', JSON.stringify(context.constraints))
      .replace('{language}', language)
      .replace('{code}', code);

    const response = await callOpenRouter({
      systemPrompt: TUTOR_SYSTEM_PROMPT,
      userPrompt,
      temperature: 0.3,
      maxTokens: 1000,
    });

    const parsed = parseAIResponse<AnalyzeSolutionResponse>(response);

    return {
      explanation: parsed.explanation || 'Unable to analyze code.',
      timeComplexity: parsed.timeComplexity || 'Unknown',
      spaceComplexity: parsed.spaceComplexity || 'Unknown',
      issues: parsed.issues || [],
      suggestions: parsed.suggestions || [],
      correctness: parsed.correctness || 'unknown',
    };

  } catch (error) {
    console.error('Error analyzing solution:', error);
    throw new OpenRouterError(
      'Failed to analyze solution',
      undefined,
      error
    );
  }
}
