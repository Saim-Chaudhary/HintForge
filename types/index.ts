// Core Types for HintForge Application

export interface ProblemSession {
  id: string;
  user_id?: string;
  session_id: string;
  problem_statement: string;
  patterns: string[];
  constraints: Constraint[];
  examples: Example[];
  difficulty: Difficulty;
  current_hint_level: number;
  created_at: string;
  updated_at: string;
}

export interface Constraint {
  key: string;
  value: string;
}

export interface Example {
  input: string;
  output: string;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Hint {
  id: string;
  problem_session_id: string;
  hint_level: number;
  content: string;
  created_at: string;
}

export interface SolutionAttempt {
  id: string;
  problem_session_id: string;
  code: string;
  language: string;
  time_complexity?: string;
  space_complexity?: string;
  correctness: Correctness;
  feedback: SolutionFeedback;
  created_at: string;
}

export type Correctness = 'correct' | 'partial' | 'incorrect' | 'unknown';

export interface SolutionFeedback {
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  issues: Issue[];
  suggestions: string[];
  correctness: Correctness;
}

export interface Issue {
  type: 'bug' | 'inefficiency' | 'edge-case';
  description: string;
}

export interface UserStats {
  id: string;
  user_id?: string;
  session_id: string;
  pattern_name: string;
  attempt_count: number;
  success_count: number;
  last_attempted: string;
}

export interface PatternStats {
  name: string;
  count: number;
  successRate: number;
}

// API Request/Response Types

export interface AnalyzeProblemRequest {
  problemStatement: string;
  sessionId: string;
  userId?: string;
}

export interface AnalyzeProblemResponse {
  sessionId: string;
  patterns: string[];
  constraints: Constraint[];
  examples: Example[];
  difficulty: Difficulty;
  timeComplexity?: string;
  spaceComplexity?: string;
}

export interface GetHintRequest {
  problemSessionId: string;
  currentHintLevel: number;
  sessionId: string;
}

export interface GetHintResponse {
  hintLevel: number;
  content: string;
  hasMoreHints: boolean;
}

export interface AnalyzeSolutionRequest {
  problemSessionId: string;
  code: string;
  language: string;
  sessionId: string;
}

export interface AnalyzeSolutionResponse {
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  issues: Issue[];
  suggestions: string[];
  correctness: Correctness;
}

export interface SessionResponse {
  sessionId: string;
  userId?: string;
  isAuthenticated: boolean;
}

export interface ProblemHistoryResponse {
  problems: {
    id: string;
    problemStatement: string;
    patterns: string[];
    createdAt: string;
    attemptCount: number;
  }[];
}

export interface PatternStatsResponse {
  patterns: PatternStats[];
  weaknesses: string[];
}

export interface APIError {
  error: string;
  details?: string;
}

// AI Service Types

export interface ProblemContext {
  patterns: string[];
  constraints: Constraint[];
  examples: Example[];
  difficulty: Difficulty;
}

export interface AIPromptConfig {
  systemPrompt: string;
  userPrompt: string;
  temperature: number;
  maxTokens: number;
}

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature: number;
  max_tokens: number;
}

export interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
