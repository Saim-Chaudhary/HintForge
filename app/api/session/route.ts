import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: NextRequest) {
  try {
    // For now, just generate a session ID
    // In the future, this can check for authenticated users via Supabase Auth
    
    const sessionId = uuidv4();

    return NextResponse.json({
      sessionId,
      userId: undefined,
      isAuthenticated: false,
    });

  } catch (error) {
    console.error('Error in session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
