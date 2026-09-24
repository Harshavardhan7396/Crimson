import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types/logistics';

export type AuthStatePhase = 'splash' | 'auth_login' | 'auth_signup' | 'transitioning' | 'authenticated';

interface AuthContextType {
  user: UserProfile | null;
  authPhase: AuthStatePhase;
  setAuthPhase: (phase: AuthStatePhase) => void;
  login: (email: string, pass: string, rememberMe: boolean) => Promise<boolean>;
  signup: (formData: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    preferredService: any;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
  toggleAdminRole: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'USR-9021',
  fullName: 'Vikramaditya Singhania',
  email: 'v.singhania@apexlogistics.io',
  phone: '+91 98450 88219',
  country: 'India',
  role: 'customer',
  preferredService: 'import',
  preferredVehicle: 'air',
  avatarUrl: '/src/assets/images/avatar_executive_user_1790266147034.jpg',
  rewardPoints: 2450,
  rewardTier: 'Gold',
  savedAddresses: [
    {
      id: 'addr-1',
      label: 'Corporate HQ & R&D Hub',
      address: 'Plot 42, EPIP Industrial Area, Phase 2, Whitefield',
      city: 'Bangalore',
      country: 'India',
      isDefault: true
    },
    {
      id: 'addr-2',
      label: 'Regional Distribution Center',
      address: 'Tower 4, Bandra Kurla Complex (BKC)',
      city: 'Mumbai',
      country: 'India',
      isDefault: false
    },
    {
      id: 'addr-3',
      label: 'Singapore Liaison Office',
      address: 'Marina Bay Financial Centre Tower 2, #28-01',
      city: 'Singapore',
      country: 'Singapore',
      isDefault: false
    }
  ]
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authPhase, setAuthPhase] = useState<AuthStatePhase>('splash');
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);

  useEffect(() => {
    const savedUser = localStorage.getItem('aether_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
  }, []);

  const login = async (email: string, _pass: string, _rememberMe: boolean): Promise<boolean> => {
    // Begin liquid portal expansion transition
    setAuthPhase('transitioning');
    
    // Simulate server response and cinematic expansion
    await new Promise(res => setTimeout(res, 2200));

    const loggedInUser: UserProfile = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
      fullName: email.includes('@') ? email.split('@')[0].replace('.', ' ').replace(/^\w/, c => c.toUpperCase()) : DEFAULT_USER.fullName
    };
    
    setUser(loggedInUser);
    localStorage.setItem('aether_user', JSON.stringify(loggedInUser));
    setAuthPhase('authenticated');
    return true;
  };

  const signup = async (formData: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    preferredService: any;
    password: string;
  }): Promise<boolean> => {
    setAuthPhase('transitioning');
    await new Promise(res => setTimeout(res, 2200));

    const newUser: UserProfile = {
      ...DEFAULT_USER,
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: formData.fullName || 'New Partner',
      email: formData.email || 'user@aetherlogistics.io',
      phone: formData.phone || '+91 99000 00000',
      country: formData.country || 'India',
      preferredService: formData.preferredService || 'import',
      rewardPoints: 500, // Welcome bonus
      rewardTier: 'Bronze'
    };

    setUser(newUser);
    localStorage.setItem('aether_user', JSON.stringify(newUser));
    setAuthPhase('authenticated');
    return true;
  };

  const logout = () => {
    setAuthPhase('auth_login');
  };

  const toggleAdminRole = () => {
    if (!user) return;
    const newRole = user.role === 'admin' ? 'customer' : 'admin';
    const updated = { ...user, role: newRole as 'admin' | 'customer' };
    setUser(updated);
    localStorage.setItem('aether_user', JSON.stringify(updated));
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const next = { ...user, ...updated };
    setUser(next);
    localStorage.setItem('aether_user', JSON.stringify(next));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authPhase,
        setAuthPhase,
        login,
        signup,
        logout,
        toggleAdminRole,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
