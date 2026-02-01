'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface SessionContextType {
  sessionId: string;
  userId?: string;
  isAuthenticated: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionContextType>({
    sessionId: '',
    isAuthenticated: false,
  });

  useEffect(() => {
    // Get or create session ID from sessionStorage
    let sessionId = sessionStorage.getItem('dsa-tutor-session-id');
    
    if (!sessionId) {
      sessionId = uuidv4();
      sessionStorage.setItem('dsa-tutor-session-id', sessionId);
    }

    setSession({
      sessionId,
      isAuthenticated: false,
      // TODO: Add Supabase auth check for userId
    });
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
