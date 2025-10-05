// client/src/components/layout/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, User, Search, Menu, X, LogOut, Settings, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useAuth } from '../../context/AuthContext';

const Header = ({ cartItemsCount = 0 }) => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Navigate to products page with search query
    if (value.trim()) {
      navigate(`/games?search=${encodeURIComponent(value)}`);
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-slate-900/50 backdrop-blur-md border-b border-blue-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">PS</span>
            </div>
            <h1 className="text-2xl font-bold text-white hidden sm:block">PS5 {t('nav.games')}</h1>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder={t('common.search') + '...'}
                value={searchTerm}
                onChange={handleSearch}
                className="bg-slate-800 text-white pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-white hover:text-blue-400 transition"
                >
                  <User size={24} />
                  <span className="text-sm">{user.name}</span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2">
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 px-4 py-2 text-white hover:bg-slate-700 transition"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings size={18} />
                      <span>{t('nav.profile')}</span>
                    </Link>
                    <Link 
                      to="/orders" 
                      className="flex items-center gap-2 px-4 py-2 text-white hover:bg-slate-700 transition"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Package size={18} />
                      <span>{t('nav.myOrders')}</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-slate-700 transition w-full text-left"
                    >
                      <LogOut size={18} />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-white hover:text-blue-400 transition">
                <User size={24} />
              </Link>
            )}
            
            {/* Cart */}
            <Link to="/cart" className="relative text-white hover:text-blue-400 transition">
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 p-4 border-t border-blue-500/20">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder={t('common.search') + '...'}
              value={searchTerm}
              onChange={handleSearch}
              className="bg-slate-800 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="pb-2 border-b border-slate-700">
              <LanguageSwitcher />
            </div>
            
            {isAuthenticated && user ? (
              <>
                <Link 
                  to="/profile" 
                  className="text-white py-2 hover:text-blue-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.profile')}
                </Link>
                <Link 
                  to="/orders" 
                  className="text-white py-2 hover:text-blue-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.myOrders')}
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-red-400 py-2 text-left hover:text-red-300"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="text-white py-2 hover:text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.login')}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;