AI-Powered DSA & Coding Interview Tutor - Technical Implementation Plan
Observations
The workspace is empty, indicating a greenfield project. The application requires a learning-focused AI tutor system with progressive hint delivery, code analysis capabilities, and lightweight user tracking. The architecture must support both anonymous and authenticated users while maintaining free-tier constraints. The system needs careful prompt engineering to prevent solution dumping and ensure pedagogical value.

Approach
The implementation follows a Next.js App Router architecture with server-side API routes, Supabase for database and optional authentication, and OpenRouter for AI capabilities. The design prioritizes progressive disclosure of hints through a state-machine approach, uses session-based tracking for anonymous users, and implements strict AI guardrails through multi-stage prompting. The build order focuses on core AI functionality first, then user tracking, ensuring rapid deployment and iterative enhancement.

1. System Architecture
Supabase DB
OpenRouter
AI Service
API Routes
NextJS Frontend
User
Supabase DB
OpenRouter
AI Service
API Routes
NextJS Frontend
User
Paste problem statement
POST /api/analyze-problem
Analyze problem
Pattern identification prompt
Pattern + constraints
Analysis result
Store problem session
Return analysis
Request hint (level N)
POST /api/get-hint
Check hint level
Generate hint (level N)
Hint generation prompt
Progressive hint
Hint content
Update hint level
Return hint
Submit solution code
POST /api/analyze-solution
Analyze code
Code review prompt
Analysis + complexity
Review result
Store attempt + update stats
Return feedback
Architecture Layers:

Presentation Layer: Next.js App Router pages with React Server Components and Client Components
API Layer: Next.js API routes (/app/api/*) handling business logic
Service Layer: Reusable AI service modules for prompt management and response parsing
Data Layer: Supabase PostgreSQL with Row Level Security (RLS)
External Services: OpenRouter API for LLM access*
2. Frontend Structure
Page Structure

/app
├── layout.tsx                    # Root layout with providers
├── page.tsx                      # Landing/home page
├── problem/
│   └── page.tsx                  # Main problem-solving interface
├── history/
│   └── page.tsx                  # Problem history (auth required)
├── patterns/
│   └── page.tsx                  # Pattern library and weaknesses
└── api/                          # API routes (see section 3)
Core React Components
Client Components:

ProblemInput.tsx - Textarea for problem statement with validation
ProblemAnalysis.tsx - Display identified patterns, constraints, examples
HintSystem.tsx - Progressive hint unlocking UI with level indicator
CodeEditor.tsx - Monaco or CodeMirror integration for solution submission
SolutionFeedback.tsx - Display AI analysis, complexity, and suggestions
PatternBadge.tsx - Visual tag for algorithmic patterns
ProgressTracker.tsx - Visual representation of user stats
SessionManager.tsx - Handle anonymous session ID generation/storage
Server Components:

ProblemHistoryList.tsx - Fetch and display past problems from DB
PatternInsights.tsx - Aggregate pattern statistics from DB
AuthButton.tsx - Supabase auth integration (optional)
State Management
Frontend State:

Local Component State: React useState for UI interactions (hint level, code input)
Session Storage: Anonymous user session ID (UUID v4)
React Context: SessionContext for user/session ID, ThemeContext for dark mode
URL State: Problem ID in query params for shareable links
No global state library needed - Server Components and API routes handle data fetching.

3. Backend API Endpoints
All endpoints in /app/api/ directory:

/api/analyze-problem (POST)
Request Body:

typescript

{
  problemStatement: string;
  sessionId: string;
  userId?: string; // optional if authenticated
}
Responsibilities:

Validate problem statement (min 50 chars, max 5000 chars)
Call AI service to identify patterns, constraints, examples
Generate unique problem session ID
Store in problem_sessions table
Return analysis object
Response:

typescript

{
  sessionId: string;
  patterns: string[];
  constraints: { key: string; value: string }[];
  examples: { input: string; output: string }[];
  difficulty: "easy" | "medium" | "hard";
}
/api/get-hint (POST)
Request Body:

typescript

{
  problemSessionId: string;
  currentHintLevel: number;
  sessionId: string;
}
Responsibilities:

Validate hint level progression (must be sequential)
Retrieve problem context from DB
Call AI service with hint level parameter
Store hint in hints table
Return hint content with next level indicator
Response:

typescript

{
  hintLevel: number;
  content: string;
  hasMoreHints: boolean;
}
/api/analyze-solution (POST)
Request Body:

typescript

{
  problemSessionId: string;
  code: string;
  language: string;
  sessionId: string;
}
Responsibilities:

Validate code (max 10,000 chars)
Call AI service for code analysis
Store attempt in solution_attempts table
Update user statistics in user_stats table
Return detailed feedback
Response:

typescript

{
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  issues: { type: string; description: string }[];
  suggestions: string[];
  correctness: "correct" | "partial" | "incorrect" | "unknown";
}
/api/session (GET)
Responsibilities:

Check if user is authenticated (Supabase session)
Return user ID or generate anonymous session ID
No database write for anonymous users
Response:

typescript

{
  sessionId: string;
  userId?: string;
  isAuthenticated: boolean;
}
/api/history (GET)
Query Params: sessionId or userId

Responsibilities:

Fetch problem sessions from DB
Return paginated list (limit 20)
Response:

typescript

{
  problems: {
    id: string;
    problemStatement: string;
    patterns: string[];
    createdAt: string;
    attemptCount: number;
  }[];
}
/api/patterns/stats (GET)
Query Params: sessionId or userId

Responsibilities:

Aggregate pattern frequency from problem_sessions
Calculate success rate per pattern
Identify weak patterns (low success rate)
Response:

typescript

{
  patterns: {
    name: string;
    count: number;
    successRate: number;
  }[];
  weaknesses: string[];
}
4. AI System Design
System Prompt (Base Tutor Persona)

You are an expert computer science tutor specializing in data structures and algorithms. Your role is to guide students through problem-solving using the Socratic method.
CORE PRINCIPLES:
1. NEVER provide complete solutions or full code implementations
2. Guide through reasoning, not answers
3. Focus on pattern recognition and algorithmic thinking
4. Encourage independent problem-solving
RESPONSE STYLE:
- Clear, concise, educational
- Use analogies and examples
- Break complex concepts into digestible parts
- Celebrate progress and correct thinking
FORBIDDEN ACTIONS:
- Writing complete solution code
- Revealing optimal algorithms directly
- Solving the problem for the student
- Providing step-by-step code walkthroughs before student attempts
User Prompt Templates
Pattern Identification Prompt

Analyze the following coding problem and identify:
1. The primary algorithmic pattern(s) (e.g., Two Pointers, Sliding Window, DFS, BFS, Dynamic Programming, etc.)
2. Key constraints that affect solution approach
3. Input/output examples if provided
Problem Statement:
"""
{problemStatement}
"""
Return a JSON object with this structure:
{
  "patterns": ["pattern1", "pattern2"],
  "constraints": [{"key": "constraint name", "value": "constraint detail"}],
  "examples": [{"input": "example input", "output": "expected output"}],
  "difficulty": "easy|medium|hard"
}
Be precise and educational. Focus on teaching the student to recognize these patterns in future problems.
Progressive Hint Generation Prompt

You are providing hint level {hintLevel} for a coding problem. The student has already received {previousHintCount} hints.
Problem Context:
- Patterns: {patterns}
- Constraints: {constraints}
Hint Level Guidelines:
- Level 1: Ask guiding questions about the problem structure
- Level 2: Suggest the general approach category (e.g., "Consider using a hash map")
- Level 3: Explain the high-level algorithm without code
- Level 4: Provide pseudocode structure
- Level 5: Discuss edge cases and optimizations
Current Hint Level: {hintLevel}
Generate a hint that:
1. Builds on previous hints
2. Does NOT provide complete code
3. Encourages the student to think critically
4. Is appropriate for the current hint level
Return only the hint text, no JSON.
Code Analysis Prompt

Analyze the following student solution for a coding problem. Provide educational feedback.
Problem Patterns: {patterns}
Problem Constraints: {constraints}
Student Code ({language}):
"""
{code}
"""
Provide analysis in JSON format:
{
  "explanation": "What does this code do? Explain the approach.",
  "timeComplexity": "Big O time complexity with explanation",
  "spaceComplexity": "Big O space complexity with explanation",
  "issues": [
    {"type": "bug|inefficiency|edge-case", "description": "specific issue"}
  ],
  "suggestions": ["improvement suggestion 1", "improvement suggestion 2"],
  "correctness": "correct|partial|incorrect|unknown"
}
Be constructive and educational. If the solution is incorrect, guide toward the right approach without solving it for them.
Hint-Level Control Logic
Implementation in /lib/ai-service.ts:

typescript

const MAX_HINTS = 5;
function validateHintProgression(currentLevel: number, requestedLevel: number): boolean {
  // Must request hints sequentially
  return requestedLevel === currentLevel + 1 && requestedLevel <= MAX_HINTS;
}
function buildHintPrompt(level: number, context: ProblemContext): string {
  const basePrompt = HINT_SYSTEM_PROMPT;
  const userPrompt = HINT_USER_TEMPLATE
    .replace('{hintLevel}', level.toString())
    .replace('{previousHintCount}', (level - 1).toString())
    .replace('{patterns}', context.patterns.join(', '))
    .replace('{constraints}', JSON.stringify(context.constraints));
  
  return basePrompt + "\n\n" + userPrompt;
}
Safeguards Against Solution Dumping
Prompt Engineering: System prompt explicitly forbids complete solutions
Response Filtering: Post-process AI responses to detect code blocks; if detected in hints levels 1-3, reject and regenerate
Hint Level Gating: Enforce sequential hint unlocking in API
Temperature Control: Use temperature 0.7 for hints (creative but controlled), 0.3 for analysis (precise)
Token Limits: Cap hint responses at 300 tokens, analysis at 800 tokens
Regex Validation: Scan hint responses for patterns like function, def, class in levels 1-2 and reject
Implementation in /lib/ai-service.ts:

typescript

function containsCodeSolution(text: string, hintLevel: number): boolean {
  if (hintLevel >= 4) return false; // Pseudocode allowed at level 4+
  
  const codePatterns = [
    /function\s+\w+\s*\(/,
    /def\s+\w+\s*\(/,
    /class\s+\w+/,
    /for\s*\(.*\)\s*{/,
    /while\s*\(.*\)\s*{/
  ];
  
  return codePatterns.some(pattern => pattern.test(text));
}
5. Database Schema (Supabase PostgreSQL)
Table: users
sql

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);
Notes: Optional - only if authentication is enabled. Supabase Auth handles this automatically.

Table: problem_sessions
sql

CREATE TABLE problem_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL, -- Anonymous session ID
  problem_statement TEXT NOT NULL,
  patterns TEXT[] NOT NULL,
  constraints JSONB,
  examples JSONB,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  current_hint_level INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_problem_sessions_user_id ON problem_sessions(user_id);
CREATE INDEX idx_problem_sessions_session_id ON problem_sessions(session_id);
CREATE INDEX idx_problem_sessions_created_at ON problem_sessions(created_at DESC);
Table: hints
sql

CREATE TABLE hints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_session_id UUID REFERENCES problem_sessions(id) ON DELETE CASCADE,
  hint_level INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_hints_problem_session_id ON hints(problem_session_id);
Table: solution_attempts
sql

CREATE TABLE solution_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_session_id UUID REFERENCES problem_sessions(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  language TEXT NOT NULL,
  time_complexity TEXT,
  space_complexity TEXT,
  correctness TEXT CHECK (correctness IN ('correct', 'partial', 'incorrect', 'unknown')),
  feedback JSONB, -- Store full AI response
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_solution_attempts_problem_session_id ON solution_attempts(problem_session_id);
Table: user_stats
sql

CREATE TABLE user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  pattern_name TEXT NOT NULL,
  attempt_count INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0,
  last_attempted TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, pattern_name),
  UNIQUE(session_id, pattern_name)
);
CREATE INDEX idx_user_stats_user_id ON user_stats(user_id);
CREATE INDEX idx_user_stats_session_id ON user_stats(session_id);
Row Level Security (RLS) Policies
sql

-- Enable RLS
ALTER TABLE problem_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hints ENABLE ROW LEVEL SECURITY;
ALTER TABLE solution_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
-- Policies for authenticated users
CREATE POLICY "Users can view own problem sessions"
  ON problem_sessions FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own problem sessions"
  ON problem_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
-- Policies for anonymous users (session-based)
CREATE POLICY "Anonymous users can view own sessions"
  ON problem_sessions FOR SELECT
  USING (session_id = current_setting('app.session_id', true));
CREATE POLICY "Anonymous users can insert sessions"
  ON problem_sessions FOR INSERT
  WITH CHECK (true);
-- Similar policies for other tables
Note: For anonymous users, set session ID in Supabase client context before queries.

6. Environment Variables
Create .env.local file:

bash

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
# OpenRouter API
OPENROUTER_API_KEY=your-openrouter-api-key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
# Free Models to Use
# - meta-llama/llama-3.1-8b-instruct:free
# - google/gemini-flash-1.5:free
# - mistralai/mistral-7b-instruct:free
OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct:free
# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
# Optional: Rate Limiting (for production)
RATE_LIMIT_MAX_REQUESTS=20
RATE_LIMIT_WINDOW_MS=60000
Deployment Environment Variables (Vercel):

Add all above variables in Vercel dashboard under Project Settings → Environment Variables.

7. Step-by-Step Build Order
Phase 1: Project Setup & Core Infrastructure (Day 1)
Initialize Next.js Project
Run npx create-next-app@latest dsa-tutor --typescript --tailwind --app
Configure tsconfig.json with strict mode
Set up folder structure: /app, /components, /lib, /types
Install Dependencies
bash

npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install axios
npm install uuid
npm install @types/uuid --save-dev
Configure Supabase
Create Supabase project at supabase.com
Run database migrations (SQL from section 5)
Create /lib/supabase/client.ts and /lib/supabase/server.ts
Set up environment variables
Create Type Definitions
File: /types/index.ts
Define interfaces: ProblemSession, Hint, SolutionAttempt, UserStats, APIResponse
Phase 2: AI Service Layer (Day 2)
Build AI Service Module
File: /lib/ai-service.ts
Implement analyzeProblems(), generateHint(), analyzeSolution()
Create prompt templates as constants
Implement safeguard functions (containsCodeSolution(), validateHintProgression())
OpenRouter Integration
File: /lib/openrouter-client.ts
Create wrapper for OpenRouter API calls
Implement retry logic and error handling
Add response parsing utilities
Phase 3: Backend API Routes (Day 3)
Implement API Endpoints
/app/api/analyze-problem/route.ts
/app/api/get-hint/route.ts
/app/api/analyze-solution/route.ts
/app/api/session/route.ts
/app/api/history/route.ts
/app/api/patterns/stats/route.ts
Add Validation & Error Handling
Create /lib/validation.ts with Zod schemas
Implement rate limiting middleware (simple in-memory for free tier)
Add error response utilities
Phase 4: Frontend Components (Day 4-5)
Build Core UI Components
ProblemInput.tsx - Textarea with character count
ProblemAnalysis.tsx - Display patterns and constraints
HintSystem.tsx - Progressive hint UI with unlock buttons
CodeEditor.tsx - Integrate Monaco Editor or simple textarea
SolutionFeedback.tsx - Display AI feedback with syntax highlighting
Create Layout & Pages
/app/layout.tsx - Root layout with Tailwind, fonts, providers
/app/page.tsx - Landing page with CTA
/app/problem/page.tsx - Main problem-solving interface
/app/history/page.tsx - Problem history list
/app/patterns/page.tsx - Pattern insights dashboard
Implement Session Management
SessionManager.tsx - Generate/store anonymous session ID
SessionContext.tsx - React Context for session state
Integrate with API calls
Phase 5: State Management & Integration (Day 6)
Connect Frontend to Backend
Create /lib/api-client.ts with typed fetch wrappers
Implement loading states and error boundaries
Add optimistic UI updates where appropriate
Build User Flow
Problem submission → Analysis display
Hint request → Progressive unlock
Code submission → Feedback display
Navigation between pages
Phase 6: Polish & Deployment (Day 7)
UI/UX Enhancements
Add loading skeletons
Implement toast notifications for errors
Add dark mode toggle
Responsive design for mobile
Testing & Validation
Test all API endpoints with various inputs
Verify hint progression logic
Test anonymous vs authenticated flows
Check database queries and indexes
Deploy to Vercel
Connect GitHub repository to Vercel
Configure environment variables
Set up custom domain (optional)
Enable analytics (Vercel Analytics - free tier)
Post-Deployment
Monitor Supabase usage dashboard
Test production environment
Set up error logging (Vercel logs)
8. Implementation Notes for AI Coding Agent
Critical Implementation Details
1. Session ID Management

Generate UUID v4 on first visit, store in sessionStorage
Pass sessionId in all API requests
For authenticated users, use Supabase auth.uid() as primary identifier
Fallback to sessionId for anonymous users
2. Hint Progression Enforcement

Frontend: Disable "Next Hint" button until current hint is revealed
Backend: Validate currentHintLevel + 1 === requestedLevel in /api/get-hint
Store current_hint_level in problem_sessions table, increment on each hint request
3. OpenRouter API Integration

typescript

// Example API call structure
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: process.env.OPENROUTER_MODEL,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7,
    max_tokens: 300,
  })
});
4. Database Query Patterns

Use Supabase client with RLS enabled
For anonymous users: Set session context before queries
typescript

await supabase.rpc('set_session_id', { session_id: sessionId });
For authenticated users: RLS automatically filters by auth.uid()
5. Error Handling Strategy

API routes: Return structured errors with status codes
typescript

return NextResponse.json({ error: 'Invalid hint level' }, { status: 400 });
Frontend: Display user-friendly messages, log technical details
OpenRouter failures: Retry once, then return graceful error
6. Code Editor Integration

Use @monaco-editor/react for rich editing experience
Fallback to <textarea> with syntax highlighting via prismjs if Monaco is too heavy
Support languages: JavaScript, Python, Java, C++
Add "Run Code" button (future enhancement - not in initial build)
7. Pattern Recognition

Maintain a predefined list of common patterns in /lib/patterns.ts:
typescript

export const COMMON_PATTERNS = [
  'Two Pointers', 'Sliding Window', 'Binary Search',
  'DFS', 'BFS', 'Dynamic Programming', 'Greedy',
  'Backtracking', 'Divide and Conquer', 'Hash Map',
  'Stack', 'Queue', 'Heap', 'Trie', 'Union Find'
];
AI should select from this list for consistency
8. Performance Optimizations

Use React Server Components for data fetching (history, stats)
Implement pagination for history (20 items per page)
Add database indexes on frequently queried columns
Cache OpenRouter responses for identical problem statements (optional)
9. Security Considerations

Validate all user inputs (max lengths, allowed characters)
Sanitize problem statements before storing (remove script tags)
Rate limit API endpoints (20 requests per minute per session)
Never expose SUPABASE_SERVICE_ROLE_KEY to frontend
10. Styling Guidelines

Use Tailwind utility classes consistently
Color scheme: Primary (blue-600), Secondary (purple-600), Success (green-600), Error (red-600)
Dark mode: Use dark: variants, store preference in localStorage
Component library: Build custom components (no external UI library needed)
File Structure Reference

dsa-tutor/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── problem/
│   │   └── page.tsx
│   ├── history/
│   │   └── page.tsx
│   ├── patterns/
│   │   └── page.tsx
│   └── api/
│       ├── analyze-problem/
│       │   └── route.ts
│       ├── get-hint/
│       │   └── route.ts
│       ├── analyze-solution/
│       │   └── route.ts
│       ├── session/
│       │   └── route.ts
│       ├── history/
│       │   └── route.ts
│       └── patterns/
│           └── stats/
│               └── route.ts
├── components/
│   ├── ProblemInput.tsx
│   ├── ProblemAnalysis.tsx
│   ├── HintSystem.tsx
│   ├── CodeEditor.tsx
│   ├── SolutionFeedback.tsx
│   ├── PatternBadge.tsx
│   ├── ProgressTracker.tsx
│   ├── SessionManager.tsx
│   ├── ProblemHistoryList.tsx
│   ├── PatternInsights.tsx
│   └── AuthButton.tsx
├── lib/
│   ├── ai-service.ts
│   ├── openrouter-client.ts
│   ├── api-client.ts
│   ├── validation.ts
│   ├── patterns.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils.ts
├── types/
│   └── index.ts
├── public/
├── .env.local
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
Testing Checklist
 Problem analysis returns valid patterns
 Hints unlock sequentially (cannot skip levels)
 Code analysis provides complexity feedback
 Anonymous session persists across page refreshes
 Authenticated users see their history
 Pattern stats calculate correctly
 Rate limiting prevents abuse
 Error states display user-friendly messages
 Mobile responsive design works
 Dark mode toggles correctly
Deployment Checklist
 All environment variables set in Vercel
 Supabase RLS policies enabled
 Database indexes created
 OpenRouter API key valid and has credits
 Custom domain configured (optional)
 Analytics enabled
 Error logging configured
 CORS headers set correctly for API routes
Summary
This implementation plan provides a complete, production-ready architecture for an AI-powered DSA tutor. The system uses Next.js App Router for modern React patterns, Supabase for scalable data storage with RLS, and OpenRouter for cost-effective AI capabilities. The AI system is carefully designed with multi-level prompting and safeguards to ensure pedagogical value over answer dumping. The build order prioritizes core functionality first, enabling rapid deployment and iterative enhancement. All components are designed to work seamlessly for both anonymous and authenticated users, with clear separation of concerns and type safety throughout.