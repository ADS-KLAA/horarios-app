import { useQueryClient } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {Aula} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"

interface Session {
  token: string;
  email: string;
  name?: string;
  aulas?: Aula[]
}

type Role = "professor" | "aluno";

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string, role : Role) => Promise<void>;
  register: (username:string, email: string, password: string, role : Role) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setLoading] = useState(true);

  const queryClient = useQueryClient();

  const saveToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const clearToken = () => {
    localStorage.removeItem("authToken");
  };

  const initializeSession = async (token?:string) => {
      if (token) {
       //Validate token
        try {
          const response = await fetch(`${API_BASE_URL}/professor/session/info`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          });

          if (response.ok) {
            const data = await response.json();
            setSession({ token, email: data.email,name:data.name, aulas:data.aulas });
          } else {
            clearToken(); // Token invalid, clear it
            queryClient.clear();
          }
        } catch {
          clearToken(); // Clear token on error
          queryClient.clear();
        }
      }
      setLoading(false);
    };

  useEffect(() => {
    const token = localStorage.getItem("authToken") || undefined;
    initializeSession(token);
  }, [queryClient]);

  const login = async (email: string, password: string, role: Role): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/${role}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      await initializeSession(data.token);
      //setSession({ token: data.token, email });
      saveToken(data.token);

    } finally {
      setLoading(false);
    }
  };

  const register = async (username:string, email: string, password: string, role: Role) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register/${role}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      await initializeSession(data.token);
      saveToken(data.token);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setSession(null);
    clearToken();
    queryClient.clear();
  };

  const value: AuthContextType = { session, isLoading, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
