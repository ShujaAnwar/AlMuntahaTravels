import React, { createContext, useContext, useState, useEffect } from 'react';
import { AgentUser } from '../types';

type UserRole = 'admin' | 'partner' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  role: UserRole;
  user: AgentUser | { name: string; username: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>(() => {
    return localStorage.getItem('al_muntaha_role') as UserRole;
  });
  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem('al_muntaha_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!role);

  const login = async (username: string, password: string) => {
    // 1. Check Admin
    if (username === 'admin' && password === 'admin123') {
      const adminUser = { name: 'Super Admin', username: 'admin' };
      setRole('admin');
      setUser(adminUser);
      setIsAuthenticated(true);
      localStorage.setItem('al_muntaha_role', 'admin');
      localStorage.setItem('al_muntaha_auth', 'true');
      localStorage.setItem('al_muntaha_user', JSON.stringify(adminUser));
      return true;
    }

    // 2. Check Agents/Partners from localStorage (synced with SystemContext)
    const savedAgents = localStorage.getItem('almuntaha_agents');
    if (savedAgents) {
      const agents: AgentUser[] = JSON.parse(savedAgents);
      const agent = agents.find(a => a.username === username && a.password === password);
      
      if (agent) {
        if (agent.status === 'suspended') {
          throw new Error('Your account is suspended. Contact Admin.');
        }
        setRole('partner');
        setUser(agent);
        setIsAuthenticated(true);
        localStorage.setItem('al_muntaha_role', 'partner');
        localStorage.setItem('al_muntaha_auth', 'true');
        localStorage.setItem('al_muntaha_user', JSON.stringify(agent));
        return true;
      }
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    setUser(null);
    localStorage.removeItem('al_muntaha_auth');
    localStorage.removeItem('al_muntaha_role');
    localStorage.removeItem('al_muntaha_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
