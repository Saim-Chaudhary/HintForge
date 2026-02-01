// Utility functions

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function calculateSuccessRate(successCount: number, totalCount: number): number {
  if (totalCount === 0) return 0;
  return Math.round((successCount / totalCount) * 100);
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20';
    case 'hard':
      return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20';
    default:
      return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20';
  }
}

export function getPatternColor(index: number): string {
  const colors = [
    'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20',
    'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20',
    'text-pink-600 bg-pink-50 dark:text-pink-400 dark:bg-pink-900/20',
    'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-900/20',
    'text-cyan-600 bg-cyan-50 dark:text-cyan-400 dark:bg-cyan-900/20',
  ];
  return colors[index % colors.length];
}

export function validateProblemStatement(statement: string): { valid: boolean; error?: string } {
  if (!statement || statement.trim().length === 0) {
    return { valid: false, error: 'Problem statement cannot be empty' };
  }
  if (statement.length < 50) {
    return { valid: false, error: 'Problem statement must be at least 50 characters' };
  }
  if (statement.length > 5000) {
    return { valid: false, error: 'Problem statement cannot exceed 5000 characters' };
  }
  return { valid: true };
}

export function validateCode(code: string): { valid: boolean; error?: string } {
  if (!code || code.trim().length === 0) {
    return { valid: false, error: 'Code cannot be empty' };
  }
  if (code.length > 10000) {
    return { valid: false, error: 'Code cannot exceed 10,000 characters' };
  }
  return { valid: true };
}
