'use client';

import { AnalyzeSolutionResponse } from '@/types';

interface SolutionFeedbackProps {
  feedback: AnalyzeSolutionResponse;
}

export default function SolutionFeedback({ feedback }: SolutionFeedbackProps) {
  const getCorrectnessColor = (correctness: string) => {
    switch (correctness) {
      case 'correct':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400';
      case 'partial':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400';
      case 'incorrect':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400';
      default:
        return 'bg-[#1f1f1f]/20 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-400';
    }
  };

  const getCorrectnessIcon = (correctness: string) => {
    switch (correctness) {
      case 'correct':
        return '✅';
      case 'partial':
        return '⚠️';
      case 'incorrect':
        return '❌';
      default:
        return '🤔';
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'bug':
        return '🐛';
      case 'inefficiency':
        return '⚡';
      case 'edge-case':
        return '🎯';
      default:
        return '⚠️';
    }
  };

  return (
    <div className="bg-[#282828] dark:bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">
        Solution Feedback
      </h2>

      {/* Correctness Badge */}
      <div className={`mb-6 p-4 rounded-lg border ${getCorrectnessColor(feedback.correctness)}`}>
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span>{getCorrectnessIcon(feedback.correctness)}</span>
          <span className="capitalize">{feedback.correctness}</span>
        </div>
      </div>

      {/* Explanation */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-3">
          Explanation
        </h3>
        <p className="text-gray-300 whitespace-pre-wrap">
          {feedback.explanation}
        </p>
      </div>

      {/* Complexity Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#2d2d2d] border border-[#ffa116]/30 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-[#ffa116] mb-2">
            Time Complexity
          </h3>
          <p className="text-gray-100 font-mono">
            {feedback.timeComplexity}
          </p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-300 mb-2">
            Space Complexity
          </h3>
          <p className="text-gray-100 font-mono">
            {feedback.spaceComplexity}
          </p>
        </div>
      </div>

      {/* Issues */}
      {feedback.issues && feedback.issues.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-3">
            Issues Found
          </h3>
          <div className="space-y-3">
            {feedback.issues.map((issue, index) => (
              <div
                key={index}
                className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4"
              >
                <div className="flex items-start gap-2">
                  <span className="text-xl">{getIssueIcon(issue.type)}</span>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-orange-900 dark:text-orange-300 capitalize">
                      {issue.type.replace('-', ' ')}:{' '}
                    </span>
                    <span className="text-gray-100">
                      {issue.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {feedback.suggestions && feedback.suggestions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-3">
            💡 Suggestions for Improvement
          </h3>
          <ul className="space-y-2">
            {feedback.suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="flex gap-2 text-gray-300"
              >
                <span className="text-green-600 dark:text-green-400">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
