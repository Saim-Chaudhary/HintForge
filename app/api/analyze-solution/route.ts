import { NextRequest, NextResponse } from 'next/server';
import { analyzeSolution } from '@/lib/ai-service';
import { validate, analyzeSolutionSchema, checkRateLimit } from '@/lib/validation';
import { createClient } from '@/lib/supabase/server';
import { v4 as uuidv4 } from 'uuid';
import { ProblemContext } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input
    const validation = validate(analyzeSolutionSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error, details: validation.details },
        { status: 400 }
      );
    }

    const { problemSessionId, code, language, sessionId } = validation.data;

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

    // Get problem context from database
    const supabase = await createClient();
    const { data: problemSession, error: fetchError } = await supabase
      .from('problem_sessions')
      .select('patterns, constraints, examples, difficulty, session_id, user_id')
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

    // Analyze solution with AI
    const context: ProblemContext = {
      patterns: problemSession.patterns,
      constraints: problemSession.constraints,
      examples: problemSession.examples,
      difficulty: problemSession.difficulty,
    };

    const analysis = await analyzeSolution(code, language, context);

    // Store solution attempt in database
    const { error: insertError } = await supabase
      .from('solution_attempts')
      .insert({
        id: uuidv4(),
        problem_session_id: problemSessionId,
        code,
        language,
        time_complexity: analysis.timeComplexity,
        space_complexity: analysis.spaceComplexity,
        correctness: analysis.correctness,
        feedback: {
          explanation: analysis.explanation,
          issues: analysis.issues,
          suggestions: analysis.suggestions,
        },
      });

    if (insertError) {
      console.error('Database error storing solution:', insertError);
      return NextResponse.json(
        { error: 'Failed to store solution' },
        { status: 500 }
      );
    }

    // Update user stats
    for (const pattern of problemSession.patterns) {
      const isCorrect = analysis.correctness === 'correct';
      
      // Try to update existing stat
      const { data: existingStat } = await supabase
        .from('user_stats')
        .select('id, attempt_count, success_count')
        .eq('session_id', sessionId)
        .eq('pattern_name', pattern)
        .single();

      if (existingStat) {
        // Update existing
        await supabase
          .from('user_stats')
          .update({
            attempt_count: existingStat.attempt_count + 1,
            success_count: existingStat.success_count + (isCorrect ? 1 : 0),
            last_attempted: new Date().toISOString(),
          })
          .eq('id', existingStat.id);
      } else {
        // Insert new
        await supabase
          .from('user_stats')
          .insert({
            id: uuidv4(),
            user_id: problemSession.user_id || null,
            session_id: sessionId,
            pattern_name: pattern,
            attempt_count: 1,
            success_count: isCorrect ? 1 : 0,
            last_attempted: new Date().toISOString(),
          });
      }
    }

    // Return analysis
    return NextResponse.json({
      explanation: analysis.explanation,
      timeComplexity: analysis.timeComplexity,
      spaceComplexity: analysis.spaceComplexity,
      issues: analysis.issues,
      suggestions: analysis.suggestions,
      correctness: analysis.correctness,
    });

  } catch (error) {
    console.error('Error in analyze-solution:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze solution',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
