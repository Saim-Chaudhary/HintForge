import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const userId = searchParams.get('userId');

    if (!sessionId && !userId) {
      return NextResponse.json(
        { error: 'sessionId or userId is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    // Get user stats
    let statsQuery = supabase
      .from('user_stats')
      .select('pattern_name, attempt_count, success_count');

    if (userId) {
      statsQuery = statsQuery.eq('user_id', userId);
    } else if (sessionId) {
      statsQuery = statsQuery.eq('session_id', sessionId);
    }

    const { data: stats, error } = await statsQuery;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch pattern stats' },
        { status: 500 }
      );
    }

    // Calculate success rates and identify weaknesses
    const patterns = (stats || []).map(stat => ({
      name: stat.pattern_name,
      count: stat.attempt_count,
      successRate: stat.attempt_count > 0 
        ? Math.round((stat.success_count / stat.attempt_count) * 100)
        : 0,
    }));

    // Identify weak patterns (success rate < 50% and attempted at least once)
    const weaknesses = patterns
      .filter(p => p.count > 0 && p.successRate < 50)
      .map(p => p.name);

    return NextResponse.json({
      patterns,
      weaknesses,
    });

  } catch (error) {
    console.error('Error in pattern stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pattern stats' },
      { status: 500 }
    );
  }
}
