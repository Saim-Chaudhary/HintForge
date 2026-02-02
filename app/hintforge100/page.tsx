'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { hintforge100, companyInfo } from '@/lib/hintforge100-data';

export default function HintForge100Page() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const companies = ['all', ...Object.keys(companyInfo)];

  const filteredProblems = useMemo(() => {
    return hintforge100.filter(problem => {
      const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
      const matchesCompany = selectedCompany === 'all' || problem.companies.includes(selectedCompany);
      const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           problem.pattern.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesDifficulty && matchesCompany && matchesSearch;
    });
  }, [selectedDifficulty, selectedCompany, searchQuery]);

  const stats = {
    total: hintforge100.length,
    easy: hintforge100.filter(p => p.difficulty === 'easy').length,
    medium: hintforge100.filter(p => p.difficulty === 'medium').length,
    hard: hintforge100.filter(p => p.difficulty === 'hard').length,
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              HintForge <span className="text-[#ffa116]">100</span>
            </h1>
            <span className="px-3 py-1 bg-[#ffa116] text-black text-sm font-bold rounded-full">
              FAANG
            </span>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Master the 100 most frequently asked problems in top tech companies. 
            Curated list from Amazon, Google, Meta, Apple, Microsoft & more.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#282828] rounded-lg p-4 border border-gray-700">
            <div className="text-3xl font-bold text-white">{stats.total}</div>
            <div className="text-gray-400 text-sm">Total Problems</div>
          </div>
          <div className="bg-[#282828] rounded-lg p-4 border border-green-900/30">
            <div className="text-3xl font-bold text-green-400">{stats.easy}</div>
            <div className="text-gray-400 text-sm">Easy</div>
          </div>
          <div className="bg-[#282828] rounded-lg p-4 border border-yellow-900/30">
            <div className="text-3xl font-bold text-yellow-400">{stats.medium}</div>
            <div className="text-gray-400 text-sm">Medium</div>
          </div>
          <div className="bg-[#282828] rounded-lg p-4 border border-red-900/30">
            <div className="text-3xl font-bold text-red-400">{stats.hard}</div>
            <div className="text-gray-400 text-sm">Hard</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#282828] rounded-lg p-6 mb-8 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search Problems
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title or pattern..."
                className="w-full px-4 py-2 bg-[#1f1f1f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ffa116] focus:border-transparent"
              />
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                className="w-full px-4 py-2 bg-[#1f1f1f] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#ffa116] focus:border-transparent"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Company Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company
              </label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full px-4 py-2 bg-[#1f1f1f] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#ffa116] focus:border-transparent"
              >
                {companies.map(company => (
                  <option key={company} value={company}>
                    {company === 'all' ? 'All Companies' : company}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            Showing <span className="text-[#ffa116] font-semibold">{filteredProblems.length}</span> problems
          </div>
        </div>

        {/* Problems Table */}
        <div className="bg-[#282828] rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1f1f1f] border-b border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-16">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Problem
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Pattern
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Companies
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Frequency
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredProblems.map((problem) => (
                  <tr key={problem.id} className="hover:bg-[#1f1f1f] transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">
                      {problem.id}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-white">
                        {problem.title}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        problem.difficulty === 'easy' 
                          ? 'bg-green-900/30 text-green-400 border border-green-700'
                          : problem.difficulty === 'medium'
                          ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700'
                          : 'bg-red-900/30 text-red-400 border border-red-700'
                      }`}>
                        {problem.difficulty.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {problem.pattern.slice(0, 2).map((p, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-[#ffa116]/10 text-[#ffa116] rounded border border-[#ffa116]/30"
                          >
                            {p}
                          </span>
                        ))}
                        {problem.pattern.length > 2 && (
                          <span className="px-2 py-1 text-xs text-gray-400">
                            +{problem.pattern.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {problem.companies.slice(0, 3).map((company, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs font-medium rounded"
                            style={{
                              backgroundColor: `${companyInfo[company]?.color}20`,
                              color: companyInfo[company]?.color || '#fff',
                              border: `1px solid ${companyInfo[company]?.color}50`
                            }}
                          >
                            {company}
                          </span>
                        ))}
                        {problem.companies.length > 3 && (
                          <span className="px-2 py-1 text-xs text-gray-400">
                            +{problem.companies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        problem.frequency === 'very-high'
                          ? 'bg-red-900/30 text-red-400'
                          : problem.frequency === 'high'
                          ? 'bg-orange-900/30 text-orange-400'
                          : 'bg-blue-900/30 text-blue-400'
                      }`}>
                        {problem.frequency === 'very-high' ? '🔥 Very High' : 
                         problem.frequency === 'high' ? '⚡ High' : '📊 Medium'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Link
                          href="/problem"
                          className="px-3 py-1 bg-[#ffa116] hover:bg-[#ff8800] text-black text-xs font-semibold rounded transition-colors"
                        >
                          Solve
                        </Link>
                        {problem.leetcodeUrl && (
                          <a
                            href={problem.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-[#282828] hover:bg-[#333] text-gray-300 text-xs font-semibold rounded border border-gray-600 transition-colors"
                          >
                            LeetCode
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>💡 <span className="text-white font-semibold">Pro Tip:</span> Start with Easy problems, then progress to Medium and Hard.</p>
          <p className="mt-2">Problems are ordered by pattern to help you master one concept at a time.</p>
        </div>
      </div>
    </div>
  );
}
