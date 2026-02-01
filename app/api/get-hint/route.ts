import { NextRequest, NextResponse } from 'next/server';
import { generateHint, MAX_HINTS, validateHintProgression } from '@/lib/ai-service';
import { validate, getHintSchema, checkRateLimit } from '@/lib/validation';
import { createClient } from '@/lib/supabase/server';
import { v4 as uuidv4 } from 'uuid';
import { ProblemContext } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input
    const validation = validate(getHintSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error, details: validation.details },
        { status: 400 }
      );
    }

    const { problemSessionId, currentHintLevel, sessionId } = validation.data;

    // Rate limiting
    const rateLimit = checkRateLimit(
      sessionId,
      parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '20'),
      parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000')
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded', 
          resetIn: Math.ceil(rateLimit.resetIn / 1000) 
        },
        { status: 429 }
      );
    }

    // Validate hint progression
    const requestedLevel = currentHintLevel + 1;
    const progressionValidation = validateHintProgression(currentHintLevel, requestedLevel);
    
    if (!progressionValidation.valid) {
      return NextResponse.json(
        { error: progressionValidation.error },
        { status: 400 }
      );
    }

    // Get problem context from database
    const supabase = await createClient();
    const { data: problemSession, error: fetchError } = await supabase
      .from('problem_sessions')
      .select('patterns, constraints, examples, difficulty, session_id')
      .eq('id', problemSessionId)
      .single();

    if (fetchError || !problemSession) {
      return NextResponse.json(
        { error: 'Problem session not found' },
        { status: 404 }
      );
    }

    // Verify session ownership
    if (problemSession.session_id !== sessionId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Get actual hint count from hints table (source of truth)
    const { count: hintCount, error: countError } = await supabase
      .from('hints')
      .select('*', { count: 'exact', head: true })
      .eq('problem_session_id', problemSessionId);

    if (countError) {
      console.error('Database error counting hints:', countError);
      return NextResponse.json(
        { error: 'Failed to verify hint progress' },
        { status: 500 }
      );
    }

    const actualCurrentLevel = hintCount || 0;

    // Verify hint level matches actual hints in database
    if (actualCurrentLevel !== currentHintLevel) {
      return NextResponse.json(
        { 
          error: `Hint level mismatch. You have ${actualCurrentLevel} hints. Please refresh the page.`,
          currentLevel: actualCurrentLevel
        },
        { status: 400 }
      );
    }

    // Generate hint with AI
    const context: ProblemContext = {
      patterns: problemSession.patterns,
      constraints: problemSession.constraints,
      examples: problemSession.examples,
      difficulty: problemSession.difficulty,
    };

    const hintContent = await generateHint(requestedLevel, context);

    // Store hint in database
    const { error: insertError } = await supabase
      .from('hints')
      .insert({
        id: uuidv4(),
        problem_session_id: problemSessionId,
        hint_level: requestedLevel,
        content: hintContent,
      });

    if (insertError) {
      console.error('Database error storing hint:', insertError);
      return NextResponse.json(
        { error: 'Failed to store hint' },
        { status: 500 }
      );
    }

    // Update current hint level
    const { error: updateError } = await supabase
      .from('problem_sessions')
      .update({ 
        current_hint_level: requestedLevel,
        updated_at: new Date().toISOString()
      })
      .eq('id', problemSessionId);

    if (updateError) {
      console.error('Database error updating hint level:', updateError);
      return NextResponse.json(
        { error: 'Failed to update hint progress' },
        { status: 500 }
      );
    }

    // Return hint
    return NextResponse.json({
      hintLevel: requestedLevel,
      content: hintContent,
      hasMoreHints: requestedLevel < MAX_HINTS,
    });

  } catch (error) {
    console.error('Error in get-hint:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to generate hint'
      },
      { status: 500 }
    );
  }
}
