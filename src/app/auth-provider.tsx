"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Session, User } from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ session: null, user: null, loading: true });

// Mock 모드 체크
const isMockMode = !process.env.NEXT_PUBLIC_SUPABASE_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isMockMode) {
      // Mock 모드: 익명 사용자 생성
      const mockUser: User = {
        id: 'mock-user-id',
        email: undefined,
        phone: undefined,
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        role: 'authenticated',
        email_confirmed_at: undefined,
        phone_confirmed_at: undefined,
        last_sign_in_at: undefined,
        confirmation_sent_at: undefined,
        recovery_sent_at: undefined,
        email_change_sent_at: undefined,
        new_email: undefined,
        invited_at: undefined,
        action_link: undefined,
        factors: undefined,
        identities: [],
        is_anonymous: true,
      };
      
      const mockSession: Session = {
        access_token: 'mock-token',
        refresh_token: 'mock-refresh-token',
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        token_type: 'bearer',
        user: mockUser,
      };
      
      setUser(mockUser);
      setSession(mockSession);
      setLoading(false);
    } else {
      // 실제 Supabase 모드
      const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });
      supabase.auth.getSession().then(({ data }) => {
        setSession(data.session);
        setUser(data.session?.user ?? null);
        setLoading(false);
      });
      return () => {
        listener.subscription.unsubscribe();
      };
    }
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 