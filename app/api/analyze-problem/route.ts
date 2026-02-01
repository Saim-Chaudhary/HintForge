import { NextRequest, NextResponse } from 'next/server';
import { analyzeProblem } from '@/lib/ai-service';
import { validate, analyzeProblemSchema, checkRateLimit } from '@/lib/validation';
import { createClient } from '@/lib/supabase/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input
    const validation = validate(analyzeProblemSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error, details: validation.details },
        { status: 400 }
      );
    }

    const { problemStatement, sessionId, userId } = validation.data;

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

    // Analyze problem with AI
    const analysis = await analyzeProblem(problemStatement);

    // Store in database
    const supabase = await createClient();
    const problemSessionId = uuidv4();

    const { error: dbError } = await supabase
      .from('problem_sessions')
      .insert({
        id: problemSessionId,
        user_id: userId || null,
        session_id: sessionId,
        problem_statement: problemStatement,
        patterns: analysis.patterns,
        constraints: analysis.constraints,
        examples: analysis.examples,
        difficulty: analysis.difficulty,
        current_hint_level: 0,
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to store problem session' },
        { status: 500 }
      );
    }

    // Return analysis with session ID
    return NextResponse.json({
      sessionId: problemSessionId,
      patterns: analysis.patterns,
      constraints: analysis.constraints,
      examples: analysis.examples,
      difficulty: analysis.difficulty,
    });

  } catch (error) {
    console.error('Error in analyze-problem:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze problem',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
