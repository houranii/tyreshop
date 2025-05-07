import { create } from 'zustand';
import { User } from '../types';
import { users } from '../data/users';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
};

type AuthStore = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,
  error: null,
  
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // This is a mock implementation - in a real app, we'd validate against an API
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user || password !== 'password') { // Using "password" as the universal password for this demo
        throw new Error('Invalid email or password');
      }
      
      set({ 
        user, 
        isAuthenticated: true, 
        isAdmin: user.isAdmin,
        isLoading: false,
        error: null
      });
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
      
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
    set({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      isLoading: false,
      error: null
    });
  },
  
  checkAuth: async () => {
    set({ isLoading: true });
    
    try {
      // Check localStorage for existing session
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        const user = JSON.parse(storedUser) as User;
        set({
          user,
          isAuthenticated: true,
          isAdmin: user.isAdmin,
          isLoading: false,
          error: null
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        isLoading: false,
        error: 'Session validation failed'
      });
    }
  }
}));

export default useAuthStore;