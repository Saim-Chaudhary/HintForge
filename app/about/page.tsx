'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-100 mb-4">
            About <span className="text-[#ffa116]">HintForge</span>
          </h1>
          <p className="text-xl text-gray-400">
            Your AI-powered companion for mastering data structures and algorithms
          </p>
        </div>

        {/* Mission Section */}
        <section className="bg-[#282828] rounded-lg border border-gray-700 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-100 mb-4">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            HintForge is designed to help aspiring software engineers master data structures and algorithms 
            through intelligent, progressive guidance—not solution dumping.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            We believe the best way to learn is by thinking through problems yourself with just enough 
            guidance to keep you on track. Our AI tutor provides hints that progressively guide your 
            thinking process, helping you develop problem-solving intuition that will serve you throughout 
            your career.
          </p>
        </section>

        {/* How It's Different */}
        <section className="bg-[#282828] rounded-lg border border-gray-700 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-100 mb-6">What Makes HintForge Different?</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#ffa116] rounded-lg flex items-center justify-center text-2xl mr-4">
                🎯
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Progressive Hint System</h3>
                <p className="text-gray-400">
                  Unlike other platforms that give you the full solution, HintForge provides 5 levels of 
                  increasingly detailed hints. Start with conceptual questions, work up to pseudocode structures, 
                  and only get specific implementation details when you need them.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#ffa116] rounded-lg flex items-center justify-center text-2xl mr-4">
                🧠
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">AI-Powered Pattern Recognition</h3>
                <p className="text-gray-400">
                  Our AI automatically identifies algorithmic patterns in problems (Two Pointers, Dynamic Programming, 
                  Sliding Window, etc.) and tracks which patterns you need more practice with.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#ffa116] rounded-lg flex items-center justify-center text-2xl mr-4">
                ✅
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Detailed Code Analysis</h3>
                <p className="text-gray-400">
                  Submit your solution and get comprehensive feedback on correctness, time/space complexity, 
                  potential bugs, edge cases, and optimization suggestions—all without judgment.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#ffa116] rounded-lg flex items-center justify-center text-2xl mr-4">
                📊
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Progress Tracking</h3>
                <p className="text-gray-400">
                  Keep track of all problems you've solved, see which patterns you're strong in, and identify 
                  areas that need improvement. Your learning journey is saved and always accessible.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#ffa116] rounded-lg flex items-center justify-center text-2xl mr-4">
                🆓
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">100% Free</h3>
                <p className="text-gray-400">
                  No subscriptions, no hidden costs, no premium tiers. HintForge is completely free to use 
                  for everyone. We believe quality education should be accessible to all.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="bg-[#282828] rounded-lg border border-gray-700 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-100 mb-6">How to Use HintForge</h2>
          <ol className="space-y-4">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-[#ffa116] rounded-full flex items-center justify-center text-white font-bold mr-4">
                1
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-1">Paste Your Problem</h3>
                <p className="text-gray-400">
                  Copy any coding problem from LeetCode, HackerRank, or interview prep books and paste it into HintForge.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-[#ffa116] rounded-full flex items-center justify-center text-white font-bold mr-4">
                2
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-1">Get AI Analysis</h3>
                <p className="text-gray-400">
                  Our AI analyzes the problem, identifies patterns, extracts constraints, and estimates difficulty.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-[#ffa116] rounded-full flex items-center justify-center text-white font-bold mr-4">
                3
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-1">Request Progressive Hints</h3>
                <p className="text-gray-400">
                  Stuck? Request hints one at a time. Each level reveals more detail, from high-level approach to implementation specifics.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-[#ffa116] rounded-full flex items-center justify-center text-white font-bold mr-4">
                4
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-1">Write Your Solution</h3>
                <p className="text-gray-400">
                  Use our Monaco-powered code editor with syntax highlighting and auto-completion. Supports 9+ languages.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-[#ffa116] rounded-full flex items-center justify-center text-white font-bold mr-4">
                5
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-1">Get Detailed Feedback</h3>
                <p className="text-gray-400">
                  Submit your code for comprehensive analysis: correctness, complexity, bugs, edge cases, and optimization tips.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* Philosophy */}
        <section className="bg-[#282828] rounded-lg border border-gray-700 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-100 mb-4">Our Philosophy</h2>
          <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
            <p>
              <span className="text-[#ffa116] font-semibold">Learning by thinking, not by copying.</span> We 
              designed HintForge to prevent "solution dumping" where students just copy answers without 
              understanding. Our progressive hint system forces you to engage with the problem at each step.
            </p>
            <p>
              <span className="text-[#ffa116] font-semibold">Pattern recognition over memorization.</span> The 
              key to acing coding interviews isn't memorizing 1000 problems—it's recognizing the 20-30 common 
              patterns and knowing when to apply them. HintForge helps you build this pattern recognition skill.
            </p>
            <p>
              <span className="text-[#ffa116] font-semibold">Personalized learning path.</span> Everyone has 
              different strengths and weaknesses. Our progress tracking identifies which patterns you struggle 
              with so you can focus your practice where it matters most.
            </p>
          </div>
        </section>

        {/* Open Source */}
        <section className="bg-[#282828] rounded-lg border border-gray-700 p-8 mb-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-100 mb-4">Open Source & Free Forever</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            HintForge is free to use and will always remain free. We built this tool because we believe 
            everyone deserves access to quality technical interview preparation, regardless of their financial situation.
          </p>
          <p className="text-gray-400">
            Built with ❤️ by developer, for developers.
          </p>
        </section>

        {/* Connect */}
        <section className="bg-[#282828] rounded-lg border border-gray-700 p-8">
          <h2 className="text-3xl font-bold text-gray-100 mb-6">Connect With Me</h2>
          <p className="text-gray-300 text-lg mb-6">
            Have questions, feedback, or want to collaborate? Feel free to reach out!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/Saim-Chaudhary"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-gray-700 rounded-lg transition-colors group"
            >
              <svg className="w-6 h-6 text-gray-400 group-hover:text-[#ffa116] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300 font-medium">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-saim-1642a131b/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-gray-700 rounded-lg transition-colors group"
            >
              <svg className="w-6 h-6 text-gray-400 group-hover:text-[#ffa116] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-gray-300 font-medium">LinkedIn</span>
            </a>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/problem"
            className="inline-block px-8 py-4 bg-[#ffa116] hover:bg-[#ff9800] text-white text-lg font-semibold rounded-lg transition-colors"
          >
            Start Learning Now
          </a>
        </div>
      </div>
    </div>
  );
}
