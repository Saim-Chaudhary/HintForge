'use client';

import { AnalyzeProblemResponse } from '@/types';
import { getDifficultyColor, getPatternColor } from '@/lib/utils';

interface ProblemAnalysisProps {
  analysis: AnalyzeProblemResponse;
}

export default function ProblemAnalysis({ analysis }: ProblemAnalysisProps) {
  return (
    <div className="bg-[#282828] dark:bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">
        Problem Analysis
      </h2>
      
      {/* Difficulty Badge */}
      <div className="mb-6">
        <span className="text-sm font-medium text-gray-400">Difficulty: </span>
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize ${getDifficultyColor(analysis.difficulty)}`}>
          {analysis.difficulty}
        </span>
      </div>

      {/* Time & Space Complexity */}
      {(analysis.timeComplexity || analysis.spaceComplexity) && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.timeComplexity && (
            <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#ffa116] text-lg">⏱️</span>
                <span className="text-sm font-semibold text-gray-300">Time Complexity</span>
              </div>
              <p className="text-gray-100 text-sm">{analysis.timeComplexity}</p>
            </div>
          )}
          {analysis.spaceComplexity && (
            <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#ffa116] text-lg">💾</span>
                <span className="text-sm font-semibold text-gray-300">Space Complexity</span>
              </div>
              <p className="text-gray-100 text-sm">{analysis.spaceComplexity}</p>
            </div>
          )}
        </div>
      )}
      
      {/* Patterns */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-3">
          Identified Patterns
        </h3>
        <div className="flex flex-wrap gap-2">
          {analysis.patterns.map((pattern, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm font-medium ${getPatternColor(index)}`}
            >
              {pattern}
            </span>
          ))}
        </div>
      </div>
      
      {/* Constraints */}
      {analysis.constraints && analysis.constraints.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-3">
            Key Constraints
          </h3>
          <div className="space-y-2">
            {analysis.constraints.map((constraint, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-gray-400 font-medium">
                  {constraint.key}:
                </span>
                <span className="text-gray-100">
                  {constraint.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Examples */}
      {analysis.examples && analysis.examples.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-3">
            Examples
          </h3>
          <div className="space-y-3">
            {analysis.examples.map((example, index) => (
              <div key={index} className="bg-[#1f1f1f] rounded-lg p-4">
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-400">Input: </span>
                  <code className="text-sm text-gray-100 font-mono">
                    {example.input}
                  </code>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-400">Output: </span>
                  <code className="text-sm text-gray-100 font-mono">
                    {example.output}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
