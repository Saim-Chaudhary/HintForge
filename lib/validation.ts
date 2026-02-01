// Validation utilities with Zod schemas
// Validates API requests and sanitizes user input

import { z } from 'zod';

// ============================================================================
// ZOD SCHEMAS
// ============================================================================

export const analyzeProblemSchema = z.object({
  problemStatement: z.string()
    .min(50, 'Problem statement must be at least 50 characters')
    .max(5000, 'Problem statement cannot exceed 5000 characters')
    .trim(),
  sessionId: z.string().min(1, 'Session ID is required'),
  userId: z.string().optional(),
});

export const getHintSchema = z.object({
  problemSessionId: z.string().uuid('Invalid problem session ID'),
  currentHintLevel: z.number()
    .int('Hint level must be an integer')
    .min(0, 'Hint level must be non-negative')
    .max(5, 'Maximum hint level is 5'),
  sessionId: z.string().min(1, 'Session ID is required'),
});

export const analyzeSolutionSchema = z.object({
  problemSessionId: z.string().uuid('Invalid problem session ID'),
  code: z.string()
    .min(1, 'Code cannot be empty')
    .max(10000, 'Code cannot exceed 10,000 characters')
    .trim(),
  language: z.enum(['javascript', 'typescript', 'python', 'java', 'cpp', 'c', 'go', 'rust', 'other'], {
    errorMap: () => ({ message: 'Invalid language' }),
  }),
  sessionId: z.string().min(1, 'Session ID is required'),
});

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

export type ValidationResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string; details?: Record<string, string[]> };

/**
 * Validate data against a Zod schema
 */
export function validate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  try {
    const parsed = schema.parse(data);
    return { success: true, data: parsed };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (!details[path]) {
          details[path] = [];
        }
        details[path].push(err.message);
      });

      return {
        success: false,
        error: error.errors[0]?.message || 'Validation error',
        details,
      };
    }

    return {
      success: false,
      error: 'Unknown validation error',
    };
  }
}

/**
 * Sanitize HTML/script tags from user input
 */
export function sanitizeText(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

/**
 * Validate problem statement with custom rules
 */
export function validateProblemStatement(statement: string): ValidationResult<string> {
  if (!statement || statement.trim().length === 0) {
    return { success: false, error: 'Problem statement cannot be empty' };
  }

  const sanitized = sanitizeText(statement);

  if (sanitized.length < 50) {
    return { success: false, error: 'Problem statement must be at least 50 characters' };
  }

  if (sanitized.length > 5000) {
    return { success: false, error: 'Problem statement cannot exceed 5000 characters' };
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /eval\s*\(/i,
    /exec\s*\(/i,
    /Function\s*\(/i,
  ];

  if (suspiciousPatterns.some(pattern => pattern.test(sanitized))) {
    return { success: false, error: 'Problem statement contains forbidden patterns' };
  }

  return { success: true, data: sanitized };
}

/**
 * Validate code submission
 */
export function validateCode(code: string): ValidationResult<string> {
  if (!code || code.trim().length === 0) {
    return { success: false, error: 'Code cannot be empty' };
  }

  if (code.length > 10000) {
    return { success: false, error: 'Code cannot exceed 10,000 characters' };
  }

  return { success: true, data: code.trim() };
}

/**
 * Validate session ID format
 */
export function validateSessionId(sessionId: string): ValidationResult<string> {
  if (!sessionId || sessionId.trim().length === 0) {
    return { success: false, error: 'Session ID is required' };
  }

  // Check if it's a UUID or our custom session format
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const customPattern = /^session_\d+_[a-z0-9]+$/;

  if (!uuidPattern.test(sessionId) && !customPattern.test(sessionId)) {
    return { success: false, error: 'Invalid session ID format' };
  }

  return { success: true, data: sessionId };
}

// ============================================================================
// RATE LIMITING (Simple in-memory implementation)
// ============================================================================

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Check if request is rate limited
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 20,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // Clean up expired entries periodically
  if (rateLimitStore.size > 10000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!entry || entry.resetTime < now) {
    // Create new entry
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetIn: windowMs,
    };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: entry.resetTime - now,
    };
  }

  // Increment count
  entry.count++;
  rateLimitStore.set(identifier, entry);

  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetIn: entry.resetTime - now,
  };
}

/**
 * Reset rate limit for testing
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}
