# HintForge - AI-Powered DSA Learning Platform

Master data structures and algorithms through AI-guided progressive hints, intelligent pattern recognition, and personalized feedback. Learn by thinking, not by copying solutions.

## ✨ Features

- 🎯 **Progressive Hint System**: Get 5 levels of hints from guiding questions to implementation strategies
- 🤖 **AI Pattern Recognition**: Automatically identifies algorithmic patterns in your problems
- 📊 **Detailed Code Analysis**: Receive comprehensive feedback on time/space complexity
- 📈 **Progress Tracking**: Monitor your learning journey and pattern mastery
- 🎨 **Beautiful Dark UI**: Easy on the eyes during long coding sessions
- 🔓 **100% Free**: Built with free AI models (OpenRouter + Nvidia Nemotron)

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

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenRouter API (Nvidia Nemotron)
- **Deployment**: Vercel

## 📋 Prerequisites
Setup

### Prerequisites
- Node.js 18+
- [Supabase account](https://supabase.com) (free tier)
- [OpenRouter API key](https://openrouter.ai) (free tier
### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Saim-Chaudhary/HintForge.git
   cd HintForge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   
   # OpenRouter
   OPENROUTER_API_KEY=your-openrouter-api-key
   OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
   OPENROUTER_MODEL=nvidia/nemotron-3-nano-30b-a3b:free
   
   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Supabase database**
   
   Run the SQL migrations in your Supabase SQL editor (found in `/supabase/migrations/`):
   - `001_create_tables.sql`
   - `002_create_indexes.sql`
   - `003_enable_rls.sql`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🚀 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Saim-Chaudhary/HintForge)

**Important**: Add all environment variables in Vercel project settings before deploying.

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 📖 Usage

1. **Enter a problem**: Paste any DSA problem statement
2. **Get analysis**: AI identifies patterns, constraints, and difficulty
3. **Request hints**: Unlock 5 progressive levels of hints
4. **Submit solution**: Get detailed feedback on your code
5. **Track progress**: View your history and pattern mastery

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [OpenRouter](https://openrouter.ai/)
- Database by [Supabase](https://supabase.com/)

---

Made with ❤️ by [Saim Chaudhary](https://github.com/Saim-Chaudhary)
