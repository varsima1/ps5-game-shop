// src/components/product/ProductCard.jsx
import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProductCard = ({ product, onAddToCart }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition group">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
          />
        </Link>
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              {t('products.outOfStock')}
            </span>
          </div>
        )}
        
        {product.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{product.discount}%
          </div>
        )}

        <Link 
          to={`/product/${product._id}`}
          className="absolute inset-0 bg-black/0 hover:bg-black/30 transition opacity-0 group-hover:opacity-100 flex items-center justify-center"
        >
          <div className="bg-white rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition">
            <Eye className="text-slate-900" size={20} />
          </div>
        </Link>
      </div>
      
      <div className="p-5">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-gray-300 text-sm">{product.rating || '4.5'}</span>
          </div>
          <span className="text-gray-500">•</span>
          <span className="text-sm text-gray-400">
            {product.accountType === 'Primary Account' ? t('products.primary') : t('products.secondary')}
          </span>
        </div>

        {product.description && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-400">${product.price}</span>
            {product.discount && (
              <span className="text-gray-500 line-through text-sm">
                ${(product.price / (1 - product.discount / 100)).toFixed(2)}
              </span>
            )}
          </div>
          
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            title={product.inStock ? t('products.addToCart') : t('products.outOfStock')}
            className={`p-3 rounded-lg font-semibold transition flex items-center justify-center ${
              product.inStock
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;