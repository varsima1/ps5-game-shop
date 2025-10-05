// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, SearchX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <SearchX size={120} className="mx-auto text-blue-500 opacity-50" />
        </div>
        
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
          404
        </h1>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="primary" size="lg" icon={Home}>
              {t('nav.home')}
            </Button>
          </Link>
          
          <Link to="/games">
            <Button variant="outline" size="lg">
              {t('products.allGames')}
            </Button>
          </Link>
        </div>

        <div className="mt-12">
          <Link to="/" className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-2">
            <ArrowLeft size={20} />
            {t('common.back')} to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;