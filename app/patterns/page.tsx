'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/components/SessionProvider';
import { COMMON_PATTERNS, PATTERN_DESCRIPTIONS } from '@/lib/patterns';
import { PatternStatsResponse } from '@/types';
import { calculateSuccessRate } from '@/lib/utils';

export default function PatternsPage() {
  const { sessionId } = useSession();
  const [stats, setStats] = useState<PatternStatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/patterns/stats?sessionId=${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch pattern stats');
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stats');
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId) {
      fetchStats();
    }
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1f1f1f] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-400">Loading pattern stats...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1f1f1f] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const hasStats = stats && stats.patterns.length > 0;

  return (
    <div className="min-h-screen bg-[#1f1f1f] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">
            Pattern Library
          </h1>
          <p className="text-gray-400">
            Learn about common algorithmic patterns and track your progress
          </p>
        </div>

        {/* Your Progress */}
        {hasStats && (
          <>
            <div className="bg-[#282828] dark:bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-100 mb-6">
                Your Progress
              </h2>

              {/* Weaknesses */}
              {stats.weaknesses.length > 0 && (
                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-300 mb-3">
                    ⚠️ Patterns Needing Practice
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stats.weaknesses.map((pattern) => (
                      <span
                        key={pattern}
                        className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium"
                      >
                        {pattern}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-3">
                    These patterns have less than 50% success rate. Try more problems with these patterns!
                  </p>
                </div>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.patterns.map((pattern) => (
                  <div
                    key={pattern.name}
                    className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-700"
                  >
                    <h3 className="font-semibold text-gray-100 mb-2">
                      {pattern.name}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Attempts:</span>
                        <span className="font-medium text-gray-100">
                          {pattern.count}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Rate:</span>
                        <span
                          className={`font-semibold ${
                            pattern.successRate >= 70
                              ? 'text-green-600 dark:text-green-400'
                              : pattern.successRate >= 50
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {pattern.successRate}%
                        </span>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            pattern.successRate >= 70
                              ? 'bg-[#00b300]'
                              : pattern.successRate >= 50
                              ? 'bg-yellow-600'
                              : 'bg-red-600'
                          }`}
                          style={{ width: `${pattern.successRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* No Stats Yet */}
        {!hasStats && (
          <div className="bg-[#2d2d2d] border border-[#ffa116]/30 rounded-lg p-6 mb-8 text-center">
            <p className="text-[#ffa116] text-lg font-medium mb-2">
              No stats yet!
            </p>
            <p className="text-[#ffa116] dark:text-blue-400">
              Start solving problems to track your progress across different patterns.
            </p>
          </div>
        )}

        {/* All Patterns Library */}
        <div className="bg-[#282828] dark:bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
          <h2 className="text-2xl font-semibold text-gray-100 mb-6">
            Common Patterns
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMMON_PATTERNS.map((pattern, index) => {
              const userStat = stats?.patterns.find(p => p.name === pattern);
              const hasAttempted = userStat && userStat.count > 0;

              return (
                <div
                  key={pattern}
                  className="bg-[#1f1f1f] rounded-lg p-5 border border-gray-700 hover:border-[#ffa116] dark:hover:border-[#ffa116] transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-100">
                      {pattern}
                    </h3>
                    {hasAttempted && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-gray-300">
                        Practiced
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3">
                    {PATTERN_DESCRIPTIONS[pattern] || 'Common algorithmic pattern'}
                  </p>

                  {hasAttempted && userStat && (
                    <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-500">
                      <span>
                        {userStat.count} attempt{userStat.count !== 1 ? 's' : ''}
                      </span>
                      <span>
                        {userStat.successRate}% success
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-[#ffa116]/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-100 mb-4">
            💡 Tips for Pattern Recognition
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex gap-2">
              <span className="text-[#ffa116] dark:text-blue-400">•</span>
              <span>Look for sorted arrays → Binary Search might work</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#ffa116] dark:text-blue-400">•</span>
              <span>Need to find subarrays/substrings → Try Sliding Window</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#ffa116] dark:text-blue-400">•</span>
              <span>Optimization problems with choices → Consider Dynamic Programming</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#ffa116] dark:text-blue-400">•</span>
              <span>Need O(1) lookups → Use Hash Map</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#ffa116] dark:text-blue-400">•</span>
              <span>Tree/Graph traversal → DFS or BFS</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
