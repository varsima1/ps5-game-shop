// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PS</span>
              </div>
              <h3 className="text-xl font-bold text-white">PS5 {t('nav.games')}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.aboutText')}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-slate-700 transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-slate-700 transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-slate-700 transition">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition text-sm">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-gray-400 hover:text-blue-400 transition text-sm">
                  {t('products.allGames')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition text-sm">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition text-sm">
                  {t('footer.contactUs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-blue-400 transition text-sm">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition text-sm">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition text-sm">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-400 hover:text-blue-400 transition text-sm">
                  {t('footer.refund')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contactUs')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={16} className="text-blue-400" />
                <span>support@ps5games.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone size={16} className="text-blue-400" />
                <span>+995 XXX XXX XXX</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={16} className="text-blue-400" />
                <span>თბილისი, საქართველო</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 PS5 Game Accounts. {t('footer.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;