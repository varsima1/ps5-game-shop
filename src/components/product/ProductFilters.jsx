// src/components/product/ProductFilters.jsx
import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProductFilters = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  showMobileFilters,
  onCloseMobileFilters
}) => {
  const { t } = useTranslation();

  const sortOptions = [
    { value: 'popular', label: t('filters.popular') },
    { value: 'price-low', label: t('filters.priceLowToHigh') },
    { value: 'price-high', label: t('filters.priceHighToLow') },
    { value: 'rating', label: t('filters.highestRated') },
    { value: 'newest', label: t('filters.newestFirst') }
  ];

  const getCategoryTranslation = (category) => {
    const categoryMap = {
      'All': t('categories.all'),
      'Action': t('categories.action'),
      'Adventure': t('categories.adventure'),
      'Racing': t('categories.racing'),
      'Sports': t('categories.sports'),
      'RPG': t('categories.rpg'),
      'Shooter': t('categories.shooter'),
      'Other': t('categories.other')
    };
    return categoryMap[category] || category;
  };

  const FilterContent = () => (
    <>
      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <SlidersHorizontal size={20} />
          {t('filters.categories')}
        </h3>
        <div className="space-y-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {getCategoryTranslation(category)}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3">{t('filters.priceRange')}</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange}
            onChange={(e) => onPriceChange(e.target.value)}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-gray-400 text-sm">
            <span>$0</span>
            <span className="text-blue-400 font-semibold">${priceRange}</span>
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3">{t('filters.sortBy')}</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700 p-6 sticky top-24">
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-slate-900 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">{t('filters.filters')}</h2>
              <button onClick={onCloseMobileFilters} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilters;