# HintForge - AI-Powered Coding Interview Practice

An intelligent learning platform that helps you master data structures and algorithms through AI-guided hints, pattern recognition, and personalized feedback.

## 🚀 Project Status

**Phase 1: Project Setup & Base Layout - ✅ COMPLETED**

### What's Been Built

#### 1. **Project Infrastructure**
- ✅ Next.js 16 with TypeScript and Tailwind CSS
- ✅ App Router architecture
- ✅ ESLint configuration
- ✅ Proper folder structure (`/app`, `/components`, `/lib`, `/types`)

#### 2. **Core Configuration**
- ✅ Environment variables template (`.env.local.example` and `.env.local`)
- ✅ Supabase client and server setup (SSR-ready)
- ✅ TypeScript type definitions for all data structures
- ✅ Utility functions and helpers

#### 3. **UI Foundation**
- ✅ Root layout with navigation
- ✅ Session management context (anonymous user support)
- ✅ Responsive navigation component
- ✅ Landing page with features and how-it-works sections
- ✅ Dark mode support (respects system preference)

#### 4. **Design System**
- ✅ Tailwind utility classes
- ✅ Color scheme (Blue primary, with dark mode variants)
- ✅ Pattern badge colors
- ✅ Difficulty level colors (Easy/Medium/Hard)

## 🏗️ Architecture Overview

```
dsa-tool/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with providers ✅
│   ├── page.tsx             # Landing page ✅
│   ├── problem/             # Problem solving interface (TODO)
│   ├── history/             # Problem history (TODO)
│   ├── patterns/            # Pattern insights (TODO)
│   └── api/                 # API routes (TODO)
├── components/              # React components
│   ├── Navigation.tsx       # Top navigation bar ✅
│   └── SessionProvider.tsx  # Session context ✅
├── lib/                     # Utilities and services
│   ├── supabase/           
│   │   ├── client.ts       # Browser client ✅
│   │   └── server.ts       # Server client ✅
│   ├── patterns.ts         # Pattern definitions ✅
│   └── utils.ts            # Helper functions ✅
├── types/
│   └── index.ts            # TypeScript definitions ✅
└── docs/
    └── system-plan.md      # Complete technical spec ✅
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL with RLS)
- **AI**: OpenRouter API (free models: Llama 3.1, Gemini Flash, Mistral)
- **Auth**: Supabase Auth (optional, anonymous mode supported)
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- A Supabase account (sign up at [supabase.com](https://supabase.com))
- An OpenRouter API key (sign up at [openrouter.ai](https://openrouter.ai))

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenRouter API
OPENROUTER_API_KEY=your-openrouter-api-key
OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct:free
```

### 3. Set Up Supabase Database

Run the SQL migrations from `/docs/system-plan.md` in your Supabase SQL editor:
- Create tables: `users`, `problem_sessions`, `hints`, `solution_attempts`, `user_stats`
- Enable Row Level Security (RLS)
- Create indexes for performance

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## 🎯 Features (Planned)

### Core Features
- **Problem Analysis**: AI identifies patterns, constraints, and difficulty
- **Progressive Hints**: 5 levels of hints from guiding questions to pseudocode
- **Code Review**: Detailed feedback with complexity analysis
- **Pattern Recognition**: Learn 20+ algorithmic patterns
- **Progress Tracking**: Monitor your improvement over time
- **Anonymous Mode**: Use without creating an account

### AI Guardrails
- System prompts prevent solution dumping
- Sequential hint unlocking
- Response filtering for code blocks
- Temperature control (0.7 for hints, 0.3 for analysis)

## 🗂️ Next Steps (Implementation Order)

### Phase 2: AI Service Layer
- [ ] Create OpenRouter client wrapper
- [ ] Implement AI service with prompt templates
- [ ] Add safeguard functions (containsCodeSolution, etc.)
- [ ] Build hint progression logic

### Phase 3: Backend API Routes
- [ ] `/api/analyze-problem` - Problem analysis
- [ ] `/api/get-hint` - Progressive hint delivery
- [ ] `/api/analyze-solution` - Code review
- [ ] `/api/session` - Session management
- [ ] `/api/history` - Problem history
- [ ] `/api/patterns/stats` - Pattern analytics

### Phase 4: Frontend Components
- [ ] `ProblemInput.tsx` - Problem statement input
- [ ] `ProblemAnalysis.tsx` - Display analysis results
- [ ] `HintSystem.tsx` - Progressive hint UI
- [ ] `CodeEditor.tsx` - Monaco or textarea-based editor
- [ ] `SolutionFeedback.tsx` - Display AI feedback
- [ ] `PatternBadge.tsx` - Visual pattern tags

### Phase 5: Pages & Integration
- [ ] `/problem` page - Main problem-solving interface
- [ ] `/history` page - Past problems list
- [ ] `/patterns` page - Pattern insights dashboard
- [ ] Connect all components to API

### Phase 6: Polish & Deploy
- [ ] Error handling and loading states
- [ ] Mobile responsive design
- [ ] Toast notifications
- [ ] Deploy to Vercel
- [ ] Monitor usage and costs

## 📖 Key Design Decisions

1. **Anonymous-First**: Users can start immediately without authentication
2. **Session-Based Tracking**: UUID stored in sessionStorage for anonymous users
3. **Free Tier**: Uses free OpenRouter models (Llama 3.1, Gemini Flash, Mistral)
4. **No Solution Dumping**: Multiple safeguards prevent AI from giving away answers
5. **Progressive Disclosure**: Hints unlock sequentially to encourage learning
6. **Pattern Library**: Predefined list of 20+ patterns for consistency

## 🔒 Security Notes

- RLS policies protect user data in Supabase
- Service role key never exposed to frontend
- Rate limiting prevents API abuse (20 req/min)
- Input validation on all user-submitted content

## 📚 Documentation

- Full technical specification: [docs/system-plan.md](docs/system-plan.md)
- Database schema with migrations included
- API endpoint specifications
- AI prompt templates and guardrails

## 📄 License

MIT License - feel free to use this for learning purposes.

## 🎓 Learning Resources

This project demonstrates:
- Next.js App Router architecture
- TypeScript best practices
- Supabase integration with RLS
- AI prompt engineering
- Progressive web app patterns
- Session management without auth

---

**Current Status**: Phase 1 Complete ✅ | Development Server Running on http://localhost:3000

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
