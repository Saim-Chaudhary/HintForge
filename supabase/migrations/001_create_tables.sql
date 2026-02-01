-- Migration 001: Create core tables
-- Run this in Supabase SQL Editor

-- Users table (optional - for auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Problem sessions
CREATE TABLE IF NOT EXISTS problem_sessions (
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
CREATE TABLE IF NOT EXISTS hints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_session_id UUID REFERENCES problem_sessions(id) ON DELETE CASCADE,
  hint_level INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Solution attempts
CREATE TABLE IF NOT EXISTS solution_attempts (
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
CREATE TABLE IF NOT EXISTS user_stats (
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
