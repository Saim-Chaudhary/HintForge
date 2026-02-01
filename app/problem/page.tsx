'use client';

import { useState } from 'react';
import { useSession } from '@/components/SessionProvider';
import ProblemInput from '@/components/ProblemInput';
import ProblemAnalysis from '@/components/ProblemAnalysis';
import HintSystem from '@/components/HintSystem';
import CodeEditor from '@/components/CodeEditor';
import SolutionFeedback from '@/components/SolutionFeedback';
import type { AnalyzeProblemResponse, AnalyzeSolutionResponse } from '@/types';

export default function ProblemPage() {
  const { sessionId } = useSession();
  const [problemSessionId, setProblemSessionId] = useState<string>('');
  const [analysis, setAnalysis] = useState<AnalyzeProblemResponse | null>(null);
  const [feedback, setFeedback] = useState<AnalyzeSolutionResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnalyzeProblem = async (problemStatement: string) => {
    setIsAnalyzing(true);
    setAnalysis(null);
    setFeedback(null);

    try {
      const response = await fetch('/api/analyze-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemStatement, sessionId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to analyze problem');
      }

      const data: AnalyzeProblemResponse = await response.json();
      setAnalysis(data);
      setProblemSessionId(data.sessionId);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to analyze problem');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRequestHint = async (currentLevel: number) => {
    const response = await fetch('/api/get-hint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        problemSessionId,
        currentHintLevel: currentLevel,
        sessionId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get hint');
    }

    return await response.json();
  };

  const handleSubmitSolution = async (code: string, language: string) => {
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/analyze-solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemSessionId,
          code,
          language,
          sessionId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to analyze solution');
      }

      const data: AnalyzeSolutionResponse = await response.json();
      setFeedback(data);
      
      // Scroll to feedback
      setTimeout(() => {
        document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to analyze solution');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">
            Solve a Problem
          </h1>
          <p className="text-gray-400">
            Paste a coding problem and get AI-guided hints to help you solve it
          </p>
        </div>

        <div className="space-y-6">
          {/* Problem Input */}
          <ProblemInput onAnalyze={handleAnalyzeProblem} isLoading={isAnalyzing} />

          {/* Problem Analysis */}
          {analysis && (
            <>
              <ProblemAnalysis analysis={analysis} />

              {/* Hint System */}
              <HintSystem
                problemSessionId={problemSessionId}
                sessionId={sessionId}
                onRequestHint={handleRequestHint}
              />

              {/* Code Editor */}
              <CodeEditor onSubmit={handleSubmitSolution} isLoading={isSubmitting} />

              {/* Solution Feedback */}
              {feedback && (
                <div id="feedback">
                  <SolutionFeedback feedback={feedback} />
                </div>
              )}
            </>
          )}
        </div>

        {/* Instructions */}
        {!analysis && !isAnalyzing && (
          <div className="mt-8 bg-[#282828] border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#ffa116] mb-3">
              How to use:
            </h3>
            <ol className="space-y-2 text-gray-300">
              <li>1. Paste any coding problem in the text area above</li>
              <li>2. Click "Analyze Problem" to identify patterns and constraints</li>
              <li>3. Request progressive hints if you need guidance</li>
              <li>4. Write your solution in the code editor</li>
              <li>5. Submit to get detailed feedback and complexity analysis</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
