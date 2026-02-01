'use client';

import { useState, useEffect } from 'react';
import { MAX_HINTS } from '@/lib/ai-service';

interface Hint {
  level: number;
  content: string;
}

interface HintSystemProps {
  problemSessionId: string;
  sessionId: string;
  onRequestHint: (currentLevel: number) => Promise<{ hintLevel: number; content: string; hasMoreHints: boolean }>;
}

export default function HintSystem({ problemSessionId, sessionId, onRequestHint }: HintSystemProps) {
  const [hints, setHints] = useState<Hint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingHints, setIsFetchingHints] = useState(true);
  const [error, setError] = useState('');
  const [hasMoreHints, setHasMoreHints] = useState(true);

  // Fetch existing hints on mount
  useEffect(() => {
    const fetchExistingHints = async () => {
      try {
        setIsFetchingHints(true);
        const response = await fetch('/api/get-hints', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ problemSessionId, sessionId }),
        });

        if (response.ok) {
          const data = await response.json();
          setHints(data.hints || []);
          setHasMoreHints(data.hints.length < MAX_HINTS);
        }
      } catch (err) {
        console.error('Failed to fetch existing hints:', err);
      } finally {
        setIsFetchingHints(false);
      }
    };

    fetchExistingHints();
  }, [problemSessionId, sessionId]);

  const handleRequestHint = async () => {
    setIsLoading(true);
    setError('');

    try {
      const currentLevel = hints.length;
      const result = await onRequestHint(currentLevel);
      
      setHints([...hints, { level: result.hintLevel, content: result.content }]);
      setHasMoreHints(result.hasMoreHints);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get hint');
    } finally {
      setIsLoading(false);
    }
  };

  const currentLevel = hints.length;

  if (isFetchingHints) {
    return (
      <div className="bg-[#282828] dark:bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#282828] dark:bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-100">
          Progressive Hints
        </h2>
        <div className="text-sm text-gray-400">
          Level {currentLevel} / {MAX_HINTS}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-[#ffa116] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentLevel / MAX_HINTS) * 100}%` }}
          />
        </div>
      </div>

      {/* Hints Display */}
      {hints.length > 0 && (
        <div className="space-y-4 mb-6">
          {hints.map((hint) => (
            <div
              key={hint.level}
              className="bg-[#2d2d2d] border border-[#ffa116]/30 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#ffa116] text-white text-xs font-bold">
                  {hint.level}
                </span>
                <span className="text-sm font-medium text-[#ffa116]">
                  Hint Level {hint.level}
                </span>
              </div>
              <p className="text-gray-100 whitespace-pre-wrap">
                {hint.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Request Hint Button */}
      {hasMoreHints && (
        <button
          onClick={handleRequestHint}
          disabled={isLoading}
          className="w-full px-6 py-3 bg-[#ffa116] hover:bg-[#ff9800] disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {isLoading ? 'Getting Hint...' : `Get Hint ${currentLevel + 1}`}
        </button>
      )}

      {!hasMoreHints && currentLevel === MAX_HINTS && (
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400">
          🎉 All hints unlocked! Try solving the problem now.
        </div>
      )}

      {error && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Hint Guidelines */}
      {hints.length === 0 && (
        <div className="mt-4 p-4 bg-[#1f1f1f] rounded-lg">
          <h3 className="text-sm font-semibold text-gray-100 mb-2">
            What to expect:
          </h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Level 1: Guiding questions</li>
            <li>• Level 2: Approach suggestions</li>
            <li>• Level 3: High-level algorithm</li>
            <li>• Level 4: Pseudocode structure</li>
            <li>• Level 5: Edge cases & optimizations</li>
          </ul>
        </div>
      )}
    </div>
  );
}
