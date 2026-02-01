-- Migration 002: Create indexes
-- Run this in Supabase SQL Editor after 001_create_tables.sql

-- Indexes for problem_sessions
CREATE INDEX IF NOT EXISTS idx_problem_sessions_user_id ON problem_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_problem_sessions_session_id ON problem_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_problem_sessions_created_at ON problem_sessions(created_at DESC);

-- Indexes for hints
CREATE INDEX IF NOT EXISTS idx_hints_problem_session_id ON hints(problem_session_id);

-- Indexes for solution_attempts
CREATE INDEX IF NOT EXISTS idx_solution_attempts_problem_session_id ON solution_attempts(problem_session_id);

-- Indexes for user_stats
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_session_id ON user_stats(session_id);
