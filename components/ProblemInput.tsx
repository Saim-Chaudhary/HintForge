'use client';

import { useState } from 'react';
import { validateProblemStatement } from '@/lib/utils';

interface ProblemInputProps {
  onAnalyze: (problemStatement: string) => void;
  isLoading?: boolean;
}

export default function ProblemInput({ onAnalyze, isLoading }: ProblemInputProps) {
  const [problemStatement, setProblemStatement] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const validation = validateProblemStatement(problemStatement);
    
    if (!validation.valid) {
      setError(validation.error || 'Invalid input');
      return;
    }

    setError('');
    onAnalyze(problemStatement);
  };

  return (
    <div className="bg-[#282828] dark:bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">
        Problem Statement
      </h2>
      
      <textarea
        value={problemStatement}
        onChange={(e) => {
          setProblemStatement(e.target.value);
          setError('');
        }}
        placeholder="Paste your coding problem here... (min 50 characters)"
        className="w-full h-64 px-4 py-3 text-gray-100 bg-[#1f1f1f] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ffa116] focus:border-transparent resize-none"
        disabled={isLoading}
      />
      
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-400">
          {problemStatement.length} / 5000 characters
          {problemStatement.length > 0 && problemStatement.length < 50 && (
            <span className="text-yellow-600 dark:text-yellow-400 ml-2">
              (Need {50 - problemStatement.length} more)
            </span>
          )}
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={isLoading || problemStatement.length < 50}
          className="px-6 py-2 bg-[#ffa116] hover:bg-[#ff9800] disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Problem'}
        </button>
      </div>
      
      {error && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
