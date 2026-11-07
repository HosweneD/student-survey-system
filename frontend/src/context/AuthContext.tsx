import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (studentId: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Демонстрационная авторизация.
  // В реальном приложении здесь должен быть запрос к API.
  const login = (studentId: string, password: string): boolean => {
    if (!studentId.trim() || !password.trim()) return false;
    setUser({
      id: 1,
      fullName: 'Журавлев Роман',
      studentId: studentId,
    });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Чтобы не писать в каждом компоненте useContext.
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};