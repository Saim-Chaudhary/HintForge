'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  onSubmit: (code: string, language: string) => void;
  isLoading?: boolean;
}

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', monacoLang: 'javascript' },
  { value: 'typescript', label: 'TypeScript', monacoLang: 'typescript' },
  { value: 'python', label: 'Python', monacoLang: 'python' },
  { value: 'java', label: 'Java', monacoLang: 'java' },
  { value: 'cpp', label: 'C++', monacoLang: 'cpp' },
  { value: 'c', label: 'C', monacoLang: 'c' },
  { value: 'go', label: 'Go', monacoLang: 'go' },
  { value: 'rust', label: 'Rust', monacoLang: 'rust' },
  { value: 'other', label: 'Other', monacoLang: 'plaintext' },
];

export default function CodeEditor({ onSubmit, isLoading }: CodeEditorProps) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!code.trim()) {
      setError('Please write some code first');
      return;
    }

    if (code.length > 10000) {
      setError('Code exceeds 10,000 character limit');
      return;
    }

    setError('');
    onSubmit(code, language);
  };

  const currentLang = LANGUAGES.find(l => l.value === language);

  return (
    <div className="bg-[#282828] dark:bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-100">
          Your Solution
        </h2>
        
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 bg-[#1f1f1f] border border-gray-600 rounded-lg text-gray-100 text-sm focus:ring-2 focus:ring-[#ffa116]"
          disabled={isLoading}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="border border-gray-600 rounded-lg overflow-hidden">
        <Editor
          height="400px"
          language={currentLang?.monacoLang || 'javascript'}
          value={code}
          onChange={(value) => {
            setCode(value || '');
            setError('');
          }}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            readOnly: isLoading,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            formatOnPaste: true,
            formatOnType: true,
            bracketPairColorization: { enabled: true },
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            padding: { top: 16, bottom: 16 },
          }}
          loading={
            <div className="flex items-center justify-center h-96 bg-gray-900">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ffa116]"></div>
            </div>
          }
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-400">
          {code.length} / 10,000 characters
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={isLoading || !code.trim()}
          className="px-6 py-2 bg-[#00b300] hover:bg-[#009900] disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing...' : 'Submit Solution'}
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
