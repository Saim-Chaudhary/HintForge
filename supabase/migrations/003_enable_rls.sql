-- Migration 003: Enable Row Level Security (RLS)
-- Run this in Supabase SQL Editor after 002_create_indexes.sql

-- Enable RLS on all tables
ALTER TABLE problem_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hints ENABLE ROW LEVEL SECURITY;
ALTER TABLE solution_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (for re-running)
DROP POLICY IF EXISTS "Users can view own problem sessions" ON problem_sessions;
DROP POLICY IF EXISTS "Users can insert own problem sessions" ON problem_sessions;
DROP POLICY IF EXISTS "Users can view own hints" ON hints;
DROP POLICY IF EXISTS "Users can insert hints" ON hints;
DROP POLICY IF EXISTS "Users can view own solution attempts" ON solution_attempts;
DROP POLICY IF EXISTS "Users can insert solution attempts" ON solution_attempts;
DROP POLICY IF EXISTS "Users can view own stats" ON user_stats;
DROP POLICY IF EXISTS "Users can insert/update own stats" ON user_stats;
DROP POLICY IF EXISTS "Anonymous users can insert sessions" ON problem_sessions;
DROP POLICY IF EXISTS "Anonymous users can view own sessions" ON problem_sessions;
DROP POLICY IF EXISTS "Anonymous users can insert hints" ON hints;
DROP POLICY IF EXISTS "Anonymous users can view hints" ON hints;
DROP POLICY IF EXISTS "Anonymous users can insert attempts" ON solution_attempts;
DROP POLICY IF EXISTS "Anonymous users can view attempts" ON solution_attempts;
DROP POLICY IF EXISTS "Anonymous users can manage stats" ON user_stats;

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

-- Policies for anonymous users (session-based)
-- These allow anonymous users to use the app without authentication
CREATE POLICY "Anonymous users can insert sessions"
  ON problem_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anonymous users can view own sessions"
  ON problem_sessions FOR SELECT
  USING (true);

CREATE POLICY "Anonymous users can insert hints"
  ON hints FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anonymous users can view hints"
  ON hints FOR SELECT
  USING (true);

CREATE POLICY "Anonymous users can insert attempts"
  ON solution_attempts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anonymous users can view attempts"
  ON solution_attempts FOR SELECT
  USING (true);

CREATE POLICY "Anonymous users can manage stats"
  ON user_stats FOR ALL
  USING (true)
  WITH CHECK (true);
