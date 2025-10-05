// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Check, Package, Shield, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { productService } from '../services/productService';

const ProductDetail = ({ onAddToCart }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl text-white mb-4">{t('products.noProducts')}</h2>
        <Button onClick={() => navigate('/games')}>{t('common.back')}</Button>
      </div>
    );
  }

  const features = [
    { icon: Package, text: t('features.instantDelivery.title') },
    { icon: Shield, text: t('features.secureSafe.title') },
    { icon: Clock, text: '24/7 ' + t('footer.support') }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="bg-slate-800/50 rounded-xl overflow-hidden mb-4">
            <img 
              src={product.images?.[selectedImage] || product.image} 
              alt={product.title}
              className="w-full h-96 object-cover"
            />
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === index ? 'border-blue-500' : 'border-slate-700'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star size={20} className="fill-yellow-400 text-yellow-400" />
              <span className="text-white font-semibold">{product.rating || '4.5'}</span>
              <span className="text-gray-400 text-sm ml-1">
                ({product.reviewCount || '124'} {t('product.reviews')})
              </span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              product.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {product.inStock ? t('products.inStock') : t('products.outOfStock')}
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-bold text-blue-400">${product.price}</span>
              {product.discount && (
                <span className="text-xl text-gray-500 line-through">
                  ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-gray-400">
              {t('product.accountType')}: <span className="text-white">{product.accountType}</span>
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
            <h3 className="text-white font-semibold mb-3">{t('product.whatsIncluded')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-300">
                <Check size={18} className="text-green-400" />
                {t('product.fullGameAccess')}
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check size={18} className="text-green-400" />
                {t('product.accountCredentials')}
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check size={18} className="text-green-400" />
                {t('product.downloadInstructions')}
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check size={18} className="text-green-400" />
                {t('product.lifetimeSupport')}
              </li>
            </ul>
          </div>

          <div className="flex gap-4 mb-6">
            <Button 
              variant="primary" 
              size="lg" 
              icon={ShoppingCart}
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className="flex-1"
            >
              {t('products.addToCart')}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              disabled={!product.inStock}
              className="flex-1"
            >
              {t('products.buyNow')}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center gap-2 text-gray-400 text-sm">
                  <Icon size={16} className="text-blue-400" />
                  <span>{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-white font-semibold text-xl mb-3">{t('product.description')}</h3>
            <p className="text-gray-400 leading-relaxed">
              {product.description || t('hero.subtitle')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;