// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = authService.getToken();
    const currentUser = authService.getCurrentUser();
    
    console.log('🔐 Auth Check on Mount:', { token, currentUser });
    
    if (token && currentUser) {
      setUser(currentUser);
      console.log('✅ User restored from localStorage:', currentUser);
    } else {
      console.log('❌ No user found in localStorage');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      console.log('🔓 Login Response in Context:', response);
      
      // response = { token, user }
      if (response && response.user) {
        setUser(response.user);
        console.log('✅ User set in context:', response.user);
      } else {
        console.error('❌ No user in response:', response);
      }
      
      return response;
    } catch (error) {
      console.error('❌ Login Error:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      console.log('📝 Register Response in Context:', response);
      
      // response = { token, user }
      if (response && response.user) {
        setUser(response.user);
        console.log('✅ User set in context:', response.user);
      }
      
      return response;
    } catch (error) {
      console.error('❌ Register Error:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('🚪 Logging out...');
    authService.logout();
    setUser(null);
    console.log('✅ User logged out');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading
  };

  console.log('🔄 AuthContext Current State:', { 
    user, 
    isAuthenticated: !!user, 
    loading,
    userName: user?.name 
  });

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};