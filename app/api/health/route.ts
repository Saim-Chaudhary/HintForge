import { NextRequest, NextResponse } from 'next/server';
import { testOpenRouterConnection } from '@/lib/openrouter-client';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const results = {
      timestamp: new Date().toISOString(),
      openrouter: { status: 'testing', connected: false, error: null as string | null },
      supabase: { status: 'testing', connected: false, error: null as string | null },
    };

    // Test OpenRouter
    try {
      results.openrouter.connected = await testOpenRouterConnection();
      results.openrouter.status = results.openrouter.connected ? 'success' : 'failed';
    } catch (error) {
      results.openrouter.status = 'error';
      results.openrouter.error = error instanceof Error ? error.message : 'Unknown error';
    }

    // Test Supabase
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('problem_sessions')
        .select('id')
        .limit(1);
      
      if (error) {
        throw error;
      }

      results.supabase.connected = true;
      results.supabase.status = 'success';
    } catch (error) {
      results.supabase.status = 'error';
      results.supabase.error = error instanceof Error ? error.message : 'Unknown error';
    }

    const allConnected = results.openrouter.connected && results.supabase.connected;

    return NextResponse.json({
      success: allConnected,
      message: allConnected 
        ? 'All services connected successfully!' 
        : 'Some services failed to connect',
      results,
    }, { 
      status: allConnected ? 200 : 500 
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Health check failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { 
      status: 500 
    });
  }
}
