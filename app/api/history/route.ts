import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, userId } = body;

    if (!sessionId && !userId) {
      return NextResponse.json(
        { error: 'sessionId or userId is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    let query = supabase
      .from('problem_sessions')
      .select('id, problem_statement, patterns, difficulty, current_hint_level, created_at, session_id')
      .order('created_at', { ascending: false })
      .limit(50);

    if (userId) {
      query = query.eq('user_id', userId);
    } else if (sessionId) {
      query = query.eq('session_id', sessionId);
    }

    const { data: sessions, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch history' },
        { status: 500 }
      );
    }

    // Get attempt counts and last attempt correctness for each problem
    const sessionsWithAttempts = await Promise.all(
      (sessions || []).map(async (session) => {
        const { data: attempts } = await supabase
          .from('solution_attempts')
          .select('correctness, created_at')
          .eq('problem_session_id', session.id)
          .order('created_at', { ascending: false });

        const attemptCount = attempts?.length || 0;
        const lastAttemptCorrect = attempts && attempts.length > 0 
          ? attempts[0].correctness === 'correct' 
          : null;

        return {
          id: session.id,
          problem_statement: session.problem_statement,
          identified_patterns: session.patterns || [],
          estimated_difficulty: session.difficulty,
          current_hint_level: session.current_hint_level,
          created_at: session.created_at,
          attempt_count: attemptCount,
          last_attempt_correct: lastAttemptCorrect,
        };
      })
    );

    return NextResponse.json({
      sessions: sessionsWithAttempts,
    });

  } catch (error) {
    console.error('Error in history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}
