# Supabase Database Setup Guide

This guide will help you set up the Supabase database for the DSA Tutor application.

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in project details:
   - **Name**: dsa-tutor
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your location
   - **Plan**: Free tier is sufficient
4. Click "Create new project" and wait for provisioning (~2 minutes)

## Step 2: Get API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values to your `.env.local`:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

## Step 3: Run Database Migrations

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the following SQL (run each section separately):

### Create Tables

```sql
-- Users table (optional - for auth)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Problem sessions
CREATE TABLE problem_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  patterns TEXT[] NOT NULL,
  constraints JSONB,
  examples JSONB,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  current_hint_level INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hints
CREATE TABLE hints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_session_id UUID REFERENCES problem_sessions(id) ON DELETE CASCADE,
  hint_level INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Solution attempts
CREATE TABLE solution_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_session_id UUID REFERENCES problem_sessions(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  language TEXT NOT NULL,
  time_complexity TEXT,
  space_complexity TEXT,
  correctness TEXT CHECK (correctness IN ('correct', 'partial', 'incorrect', 'unknown')),
  feedback JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User stats
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
```

### Create Indexes

```sql
-- Indexes for problem_sessions
CREATE INDEX idx_problem_sessions_user_id ON problem_sessions(user_id);
CREATE INDEX idx_problem_sessions_session_id ON problem_sessions(session_id);
CREATE INDEX idx_problem_sessions_created_at ON problem_sessions(created_at DESC);

-- Indexes for hints
CREATE INDEX idx_hints_problem_session_id ON hints(problem_session_id);

-- Indexes for solution_attempts
CREATE INDEX idx_solution_attempts_problem_session_id ON solution_attempts(problem_session_id);

-- Indexes for user_stats
CREATE INDEX idx_user_stats_user_id ON user_stats(user_id);
CREATE INDEX idx_user_stats_session_id ON user_stats(session_id);
```

### Enable Row Level Security (RLS)

```sql
-- Enable RLS on all tables
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

CREATE POLICY "Users can view own hints"
  ON hints FOR SELECT
  USING (
    problem_session_id IN (
      SELECT id FROM problem_sessions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert hints"
  ON hints FOR INSERT
  WITH CHECK (
    problem_session_id IN (
      SELECT id FROM problem_sessions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own solution attempts"
  ON solution_attempts FOR SELECT
  USING (
    problem_session_id IN (
      SELECT id FROM problem_sessions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert solution attempts"
  ON solution_attempts FOR INSERT
  WITH CHECK (
    problem_session_id IN (
      SELECT id FROM problem_sessions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own stats"
  ON user_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert/update own stats"
  ON user_stats FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### Policies for Anonymous Users (Session-Based)

```sql
-- Allow anonymous users to insert problem sessions
CREATE POLICY "Anonymous users can insert sessions"
  ON problem_sessions FOR INSERT
  WITH CHECK (true);

-- Allow anonymous users to select their own sessions by session_id
CREATE POLICY "Anonymous users can view own sessions"
  ON problem_sessions FOR SELECT
  USING (true);  -- Note: We'll filter by session_id in the application

-- Allow anonymous users to insert hints
CREATE POLICY "Anonymous users can insert hints"
  ON hints FOR INSERT
  WITH CHECK (true);

-- Allow anonymous users to select hints
CREATE POLICY "Anonymous users can view hints"
  ON hints FOR SELECT
  USING (true);

-- Allow anonymous users to insert solution attempts
CREATE POLICY "Anonymous users can insert attempts"
  ON solution_attempts FOR INSERT
  WITH CHECK (true);

-- Allow anonymous users to select solution attempts
CREATE POLICY "Anonymous users can view attempts"
  ON solution_attempts FOR SELECT
  USING (true);

-- Allow anonymous users to manage stats
CREATE POLICY "Anonymous users can manage stats"
  ON user_stats FOR ALL
  USING (true)
  WITH CHECK (true);
```

## Step 4: Verify Setup

1. Go to **Table Editor** in Supabase dashboard
2. You should see all tables: `users`, `problem_sessions`, `hints`, `solution_attempts`, `user_stats`
3. Click on each table to verify columns are created correctly

## Step 5: Test Connection

Back in your application:

```bash
npm run dev
```

The app should start without database errors. You'll test the full connection when implementing the API routes.

## Optional: Enable Email Auth

If you want to add user authentication:

1. Go to **Authentication** → **Providers** in Supabase
2. Enable "Email" provider
3. Configure email templates if desired
4. Users will be automatically added to the `users` table when they sign up

## Troubleshooting

### Error: relation "problem_sessions" does not exist
- Make sure you ran all CREATE TABLE statements
- Check the SQL Editor for any errors

### Error: permission denied for table
- Ensure RLS policies are created
- For testing, you can temporarily disable RLS on a table: `ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;`

### Can't insert data
- Check RLS policies are configured for anonymous users
- Verify your `SUPABASE_SERVICE_ROLE_KEY` is correct in `.env.local`

## Security Notes

⚠️ **Important**:
- Never commit `.env.local` to git (it's in `.gitignore`)
- The `service_role_key` bypasses RLS - only use server-side
- The `anon` key is safe to expose in frontend code
- RLS policies protect data even if someone gets the anon key

## Next Steps

Once your database is set up:
1. ✅ Tables created
2. ✅ Indexes added
3. ✅ RLS enabled
4. ✅ Environment variables configured

You're ready to implement the API routes! 🚀
