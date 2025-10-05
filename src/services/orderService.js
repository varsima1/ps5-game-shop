// src/services/orderService.js
import { api } from './api';

class OrderService {
  async createOrder(orderData) {
    try {
      const response = await api.post('/orders', orderData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getMyOrders() {
    try {
      const response = await api.get('/orders/my-orders');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getOrderById(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateOrderStatus(orderId, status) {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const orderService = new OrderService();