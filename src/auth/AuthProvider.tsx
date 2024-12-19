import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"

interface User {
  id: string;
  email: string;
  [key: string]: any; // Add additional fields as needed
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  const getSession = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/session`, {
        credentials: 'include', // Include cookies for session management if applicable
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to fetch session:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //getSession();
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to login');
      }
  
      const { token, user } = await response.json();
  
      // Store the token in localStorage or cookies
      localStorage.setItem('jwt', token);
  
      // Set the user state
      setUser(user);
  
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
      });
  
      // Clear the JWT and user state
      localStorage.removeItem('jwt');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value: AuthContextType = { user, login, logout, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
