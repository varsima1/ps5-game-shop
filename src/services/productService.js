// src/services/productService.js
import { api } from './api';

// Mock data for development (remove when backend is ready)
const mockProducts = [
  {
    _id: '1',
    title: "God of War Ragnarök",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop"
    ],
    category: "Action",
    rating: 4.9,
    reviewCount: 245,
    inStock: true,
    accountType: "Primary Account",
    description: "Experience the epic conclusion to the Norse saga. Kratos and Atreus must journey to each of the Nine Realms in search of answers.",
    discount: 15,
    createdAt: new Date()
  },
  {
    _id: '2',
    title: "Spider-Man 2",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop",
    category: "Action",
    rating: 4.8,
    reviewCount: 189,
    inStock: true,
    accountType: "Primary Account",
    description: "The incredible power of the symbiote forces Peter and Miles to face the ultimate test of strength.",
    createdAt: new Date()
  },
  {
    _id: '3',
    title: "Horizon Forbidden West",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop",
    category: "Adventure",
    rating: 4.7,
    reviewCount: 312,
    inStock: true,
    accountType: "Secondary Account",
    description: "Join Aloy as she braves the Forbidden West – a majestic but dangerous frontier.",
    discount: 20,
    createdAt: new Date()
  },
  {
    _id: '4',
    title: "Gran Turismo 7",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&h=400&fit=crop",
    category: "Racing",
    rating: 4.6,
    reviewCount: 156,
    inStock: false,
    accountType: "Primary Account",
    description: "Gran Turismo 7 builds on 25 years of experience to bring you the best features.",
    createdAt: new Date()
  },
  {
    _id: '5',
    title: "The Last of Us Part II",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=400&fit=crop",
    category: "Action",
    rating: 4.8,
    reviewCount: 428,
    inStock: true,
    accountType: "Primary Account",
    description: "Five years after their dangerous journey across the post-pandemic United States.",
    createdAt: new Date()
  },
  {
    _id: '6',
    title: "Ratchet & Clank",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop",
    category: "Adventure",
    rating: 4.7,
    reviewCount: 198,
    inStock: true,
    accountType: "Secondary Account",
    description: "Blast your way through an interdimensional adventure with Ratchet and Clank.",
    createdAt: new Date()
  }
];

class ProductService {
  async getAllProducts() {
    try {
      // When backend is ready, use: return await api.get('/products');
      return new Promise(resolve => setTimeout(() => resolve(mockProducts), 500));
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      // When backend is ready, use: return await api.get(`/products/${id}`);
      return new Promise(resolve => {
        setTimeout(() => {
          const product = mockProducts.find(p => p._id === id);
          resolve(product);
        }, 300);
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  async getFeaturedProducts(limit = 6) {
    try {
      // When backend is ready, use: return await api.get(`/products/featured?limit=${limit}`);
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockProducts.slice(0, limit));
        }, 400);
      });
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  }

  async searchProducts(query) {
    try {
      // When backend is ready, use: return await api.get(`/products/search?q=${query}`);
      return new Promise(resolve => {
        setTimeout(() => {
          const results = mockProducts.filter(p => 
            p.title.toLowerCase().includes(query.toLowerCase())
          );
          resolve(results);
        }, 300);
      });
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  async getProductsByCategory(category) {
    try {
      // When backend is ready, use: return await api.get(`/products/category/${category}`);
      return new Promise(resolve => {
        setTimeout(() => {
          const results = mockProducts.filter(p => p.category === category);
          resolve(results);
        }, 300);
      });
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }
}

export const productService = new ProductService();