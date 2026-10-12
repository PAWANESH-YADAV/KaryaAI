import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { storageService } from '../services/storageService';
import { useToast } from './ToastContext';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  quickLogin: (role: UserRole) => void;
  logout: () => void;
  updateCurrentUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    // Check local storage for session
    const saved = storageService.getCurrentUser();
    if (saved) {
      setCurrentUser(saved);
    }
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    const users = storageService.getUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const found = users.find(u => u.email.toLowerCase() === normalizedEmail);

    if (!found) {
      // For demo flexibility, if user types anything valid, we can allow or check
      showToast('No account found with this email. Please sign up or try demo accounts.', 'error');
      return false;
    }

    if (!found.isActive) {
      showToast('This account has been deactivated. Please contact support.', 'error');
      return false;
    }

    setCurrentUser(found);
    storageService.setCurrentUser(found);
    showToast(`Welcome back, ${found.name}!`, 'success');
    return true;
  };

  const signup = async (name: string, email: string, _password: string): Promise<boolean> => {
    const users = storageService.getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
      showToast('An account with this email already exists. Please sign in.', 'error');
      return false;
    }

    // SECURITY: Public signups ALWAYS get 'user' role
    const newUser: User = {
      id: 'user-' + Date.now().toString(36),
      name: name.trim(),
      email: normalizedEmail,
      role: 'user', // Forced to 'user'
      headline: 'New KaryaAI Explorer',
      education: '',
      qualification: '',
      experience: '',
      interests: ['Software Development', 'Artificial Intelligence'],
      skills: ['Problem Solving', 'Basics of Programming'],
      careerGoals: 'Discover optimal career roadmap and acquire top in-demand skills.',
      preferredIndustries: ['Information Technology'],
      preferredLocations: ['Remote'],
      profileCompletion: 25,
      careerReadinessScore: 40,
      createdAt: new Date().toISOString().split('T')[0],
      isActive: true,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=f97316`
    };

    storageService.saveUser(newUser);
    setCurrentUser(newUser);
    storageService.setCurrentUser(newUser);
    showToast(`Account created successfully! Welcome to KaryaAI, ${newUser.name}.`, 'success');
    return true;
  };

  const quickLogin = (role: UserRole) => {
    const users = storageService.getUsers();
    const target = users.find(u => u.role === role && u.isActive) || (role === 'admin' ? users.find(u => u.role === 'admin') : users[0]);
    if (target) {
      setCurrentUser(target);
      storageService.setCurrentUser(target);
      showToast(`Logged in as demo ${role === 'admin' ? 'Administrator (Priya Nair)' : 'General User (Rahul Sharma)'}`, 'info');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    storageService.setCurrentUser(null);
    showToast('You have been logged out successfully.', 'info');
  };

  const updateCurrentUser = (userData: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...userData };
    setCurrentUser(updated);
    storageService.saveUser(updated);
    showToast('Your profile has been updated.', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin',
        login,
        signup,
        quickLogin,
        logout,
        updateCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
