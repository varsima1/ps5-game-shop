// src/services/authService.js
import { api } from './api';

class AuthService {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      console.log('📥 Full API Response:', response);
      
      // Backend returns: { success: true, data: { token, user } }
      // Extract data from response
      const { data } = response;
      
      if (data && data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('💾 Saved to localStorage:', {
          token: data.token.substring(0, 20) + '...',
          user: data.user
        });
        
        // Return the data object { token, user }
        return data;
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('❌ Login Error:', error);
      throw error;
    }
  }

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      
      console.log('📥 Full API Response:', response);
      
      // Backend returns: { success: true, data: { token, user } }
      const { data } = response;
      
      if (data && data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('💾 Saved to localStorage:', {
          token: data.token.substring(0, 20) + '...',
          user: data.user
        });
        
        // Return the data object { token, user }
        return data;
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('❌ Register Error:', error);
      throw error;
    }
  }

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('🗑️ Cleared localStorage');
  }

  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      console.log('👤 getCurrentUser:', user);
      return user;
    } catch (error) {
      console.error('❌ Error getting user:', error);
      return null;
    }
  }

  getToken() {
    const token = localStorage.getItem('token');
    console.log('🔑 getToken:', token ? 'Token exists' : 'No token');
    return token;
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export const authService = new AuthService();