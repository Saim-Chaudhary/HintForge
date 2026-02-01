import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { problemSessionId, sessionId } = body;

    if (!problemSessionId || !sessionId) {
      return NextResponse.json(
        { error: 'problemSessionId and sessionId are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Verify session ownership
    const { data: problemSession, error: sessionError } = await supabase
      .from('problem_sessions')
      .select('session_id')
      .eq('id', problemSessionId)
      .single();

    if (sessionError || !problemSession) {
      return NextResponse.json(
        { error: 'Problem session not found' },
        { status: 404 }
      );
    }

    if (problemSession.session_id !== sessionId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Fetch all hints for this problem session
    const { data: hints, error: hintsError } = await supabase
      .from('hints')
      .select('hint_level, content')
      .eq('problem_session_id', problemSessionId)
      .order('hint_level', { ascending: true });

    if (hintsError) {
      console.error('Database error fetching hints:', hintsError);
      return NextResponse.json(
        { error: 'Failed to fetch hints' },
        { status: 500 }
      );
    }

    // Map to the format expected by frontend
    const mappedHints = (hints || []).map(h => ({
      level: h.hint_level,
      content: h.content,
    }));

    return NextResponse.json({
      hints: mappedHints,
    });

  } catch (error) {
    console.error('Error in get-hints:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hints' },
      { status: 500 }
    );
  }
}
