// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { ChevronRight, TrendingUp, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/product/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { productService } from '../services/productService';

const Home = ({ onAddToCart }) => {
  const { t } = useTranslation();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await productService.getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const features = [
    {
      icon: Zap,
      title: t('features.instantDelivery.title'),
      description: t('features.instantDelivery.description')
    },
    {
      icon: Shield,
      title: t('features.secureSafe.title'),
      description: t('features.secureSafe.description')
    },
    {
      icon: TrendingUp,
      title: t('features.bestPrices.title'),
      description: t('features.bestPrices.description')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('hero.title')}</h2>
          <p className="text-lg md:text-xl mb-6 text-blue-100">{t('hero.subtitle')}</p>
          <Link to="/games">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2">
              {t('hero.browseCollection')} <ChevronRight size={20} />
            </button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700 p-6 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">{t('products.featuredGames')}</h2>
          <Link to="/games" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
            {t('products.viewAll')} <ChevronRight size={20} />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product._id} 
                product={product} 
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.readyToStartGaming')}</h2>
          <p className="text-lg mb-6 text-blue-100">{t('cta.joinThousands')}</p>
          <Link to="/games">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              {t('cta.shopNow')}
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;