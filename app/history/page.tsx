'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/components/SessionProvider';
import Link from 'next/link';

interface ProblemSession {
  id: string;
  problem_statement: string;
  identified_patterns: string[];
  estimated_difficulty: string;
  current_hint_level: number;
  created_at: string;
  attempt_count: number;
  last_attempt_correct: boolean | null;
}

interface HistoryResponse {
  sessions: ProblemSession[];
}

export default function HistoryPage() {
  const { sessionId } = useSession();
  const [sessions, setSessions] = useState<ProblemSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'difficulty'>('date');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  useEffect(() => {
    if (!sessionId) return;

    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch history: ${response.statusText}`);
        }

        const data: HistoryResponse = await response.json();
        setSessions(data.sessions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [sessionId]);

  // Sort and filter sessions
  const filteredSessions = sessions
    .filter(session => {
      if (filterDifficulty === 'all') return true;
      return session.estimated_difficulty.toLowerCase() === filterDifficulty.toLowerCase();
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else {
        const difficultyOrder: Record<string, number> = {
          easy: 1,
          medium: 2,
          hard: 3,
        };
        return (
          difficultyOrder[a.estimated_difficulty.toLowerCase()] -
          difficultyOrder[b.estimated_difficulty.toLowerCase()]
        );
      }
    });

  const getDifficultyColor = (difficulty: string) => {
    const lower = difficulty.toLowerCase();
    if (lower === 'easy') return 'text-green-600 bg-green-50 border-green-200';
    if (lower === 'medium') return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getAttemptStatusColor = (correct: boolean | null) => {
    if (correct === null) return 'text-gray-600 bg-[#1f1f1f]';
    if (correct) return 'text-green-600 bg-green-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  const getAttemptStatusText = (correct: boolean | null, attemptCount: number) => {
    if (attemptCount === 0) return 'Not attempted';
    if (correct === null) return `${attemptCount} attempt${attemptCount > 1 ? 's' : ''}`;
    if (correct) return '✓ Solved';
    return 'Needs improvement';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-100 mb-8">Problem History</h1>
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffa116]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-100 mb-8">Problem History</h1>
          <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded">
            <p className="font-bold">Error loading history</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Problem History</h1>
          <p className="text-gray-400">
            Review your past problem-solving sessions and track your progress
          </p>
        </div>

        {/* Filters */}
        <div className="bg-[#282828] rounded-lg shadow-sm p-4 mb-6 border border-gray-700">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'difficulty')}
                className="border border-gray-600 bg-[#1f1f1f] text-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ffa116]"
              >
                <option value="date">Most Recent</option>
                <option value="difficulty">Difficulty</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Filter by difficulty
              </label>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="border border-gray-600 bg-[#1f1f1f] text-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ffa116]"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="flex items-end ml-auto">
              <div className="text-sm text-gray-400">
                {filteredSessions.length} problem{filteredSessions.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        {filteredSessions.length === 0 ? (
          <div className="bg-[#282828] rounded-lg shadow-sm p-12 text-center border border-gray-700">
            <div className="text-gray-500 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-300 font-medium">No problems found</p>
            <p className="text-gray-500 text-sm mt-1">
              {filterDifficulty !== 'all' 
                ? 'Try changing the difficulty filter'
                : 'Start solving problems to build your history'}
            </p>
            <Link
              href="/problem"
              className="inline-block mt-4 px-4 py-2 bg-[#ffa116] text-white rounded-md hover:bg-[#ff9800] transition-colors"
            >
              Solve a Problem
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="bg-[#282828] rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-700"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-gray-300 font-medium mb-2 leading-relaxed">
                      {truncateText(session.problem_statement, 200)}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(
                        session.estimated_difficulty
                      )}`}
                    >
                      {session.estimated_difficulty}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {session.identified_patterns.map((pattern, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-[#ffa116]/10 text-[#ffa116] text-xs rounded-md border border-[#ffa116]/30"
                    >
                      {pattern}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400">
                      {formatDate(session.created_at)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getAttemptStatusColor(
                        session.last_attempt_correct
                      )}`}
                    >
                      {getAttemptStatusText(
                        session.last_attempt_correct,
                        session.attempt_count
                      )}
                    </span>
                    {session.current_hint_level > 0 && (
                      <span className="text-gray-400">
                        {session.current_hint_level} hint{session.current_hint_level > 1 ? 's' : ''} used
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/problem?sessionId=${session.id}`}
                    className="text-[#ffa116] hover:text-[#ff9800] font-medium"
                  >
                    Continue →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {filteredSessions.length > 0 && (
          <div className="mt-8 bg-[#282828] rounded-lg shadow-sm p-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-100">
                  {filteredSessions.length}
                </div>
                <div className="text-sm text-gray-400 mt-1">Total Problems</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00b300]">
                  {filteredSessions.filter((s) => s.last_attempt_correct === true).length}
                </div>
                <div className="text-sm text-gray-400 mt-1">Solved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-100">
                  {Math.round(
                    filteredSessions.reduce((sum, s) => sum + s.current_hint_level, 0) /
                      filteredSessions.length
                  )}
                </div>
                <div className="text-sm text-gray-400 mt-1">Avg Hints Used</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-100">
                  {filteredSessions.reduce((sum, s) => sum + s.attempt_count, 0)}
                </div>
                <div className="text-sm text-gray-400 mt-1">Total Attempts</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
