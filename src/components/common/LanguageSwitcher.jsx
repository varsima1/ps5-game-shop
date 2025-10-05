// client/src/components/common/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ka', name: 'ქართული', flag: '🇬🇪' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 text-white hover:text-blue-400 transition">
        <Globe size={20} />
        <span className="text-sm hidden md:block">
          {languages.find(l => l.code === i18n.language)?.flag}
        </span>
      </button>

      <div className="absolute right-0 mt-2 w-40 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`w-full text-left px-4 py-2 flex items-center gap-2 transition ${
              i18n.language === lang.code
                ? 'bg-blue-500 text-white'
                : 'text-gray-300 hover:bg-slate-700'
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="text-sm">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;