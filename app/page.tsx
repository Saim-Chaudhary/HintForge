'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Master DSA with AI Guidance';
  const splitPoint = 'Master DSA with '.length;
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    
    return () => clearInterval(interval);
  }, []);

  const beforeOrange = displayText.slice(0, splitPoint);
  const afterOrange = displayText.slice(splitPoint);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-100 mb-6 min-h-[80px]">
            {beforeOrange}
            <span className="text-[#ffa116]">{afterOrange}</span>
            {displayText.length < fullText.length && <span className="animate-pulse">|</span>}
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Learn data structures and algorithms through progressive hints, pattern recognition, 
            and personalized feedback. No solution dumping—just smart guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/problem"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#ffa116] hover:bg-[#ff9800] transition-colors"
            >
              Start Solving Problems
            </Link>
            <Link
              href="/patterns"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-300 bg-[#282828] hover:bg-[#333] transition-colors"
            >
              Explore Patterns
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="🎯"
            title="Progressive Hints"
            description="Get hints that guide your thinking without giving away the solution. Unlock up to 5 levels of increasingly detailed guidance."
          />
          <FeatureCard
            icon="🔍"
            title="Pattern Recognition"
            description="Automatically identify algorithmic patterns like Two Pointers, Dynamic Programming, and more. Learn to recognize patterns in new problems."
          />
          <FeatureCard
            icon="📊"
            title="Code Analysis"
            description="Submit your solution and receive detailed feedback on time complexity, space complexity, and potential improvements."
          />
          <FeatureCard
            icon="📈"
            title="Track Progress"
            description="Monitor your problem-solving history and identify weak patterns that need more practice."
          />
          <FeatureCard
            icon="🤖"
            title="AI-Powered"
            description="Leverages advanced AI to provide personalized, educational feedback while preventing solution dumping."
          />
          <FeatureCard
            icon="🆓"
            title="100% Free"
            description="No subscriptions, no paywalls. Access all features for free with our AI-powered learning platform."
          />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-[#282828] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-100 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Step
              number={1}
              title="Paste Problem"
              description="Copy any coding problem statement into the input field."
            />
            <Step
              number={2}
              title="Get Analysis"
              description="AI identifies patterns, constraints, and difficulty level."
            />
            <Step
              number={3}
              title="Request Hints"
              description="Unlock progressive hints that guide your thinking process."
            />
            <Step
              number={4}
              title="Submit & Learn"
              description="Get detailed feedback on your solution with complexity analysis."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-100 mb-4">
          Ready to level up your coding skills?
        </h2>
        <p className="text-lg text-gray-400 mb-8">
          Start practicing with AI-guided hints today.
        </p>
        <Link
          href="/problem"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#ffa116] hover:bg-[#ff9800] transition-colors"
        >
          Get Started Now
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-[#282828] p-6 rounded-lg shadow-sm border border-gray-700">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-400">
        {description}
      </p>
    </div>
  );
}

function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ffa116] text-white text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-400">
        {description}
      </p>
    </div>
  );
}
