// src/pages/Cart.jsx
import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Cart = ({ cart, onUpdateQuantity, onRemoveItem }) => {
  const { t } = useTranslation();
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="text-center py-16">
          <ShoppingBag size={64} className="mx-auto text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">{t('cart.emptyCart')}</h2>
          <p className="text-gray-400 mb-6">{t('cart.emptyCartMessage')}</p>
          <Link to="/games">
            <Button variant="primary" size="lg">
              {t('cart.browseProducts')}
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">{t('cart.shoppingCart')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <Card key={item._id} padding={false}>
              <div className="flex gap-4 p-4">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {item.accountType === 'Primary Account' ? t('products.primary') : t('products.secondary')}
                  </p>
                  <p className="text-xl font-bold text-blue-400">${item.price}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => onRemoveItem(item._id)}
                    className="text-red-400 hover:text-red-300 transition"
                    title={t('cart.remove')}
                  >
                    <Trash2 size={20} />
                  </button>

                  <div className="flex items-center gap-2 bg-slate-700 rounded-lg">
                    <button
                      onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                      className="p-2 hover:bg-slate-600 rounded-l-lg transition"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} className="text-white" />
                    </button>
                    <span className="text-white px-3">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                      className="p-2 hover:bg-slate-600 rounded-r-lg transition"
                    >
                      <Plus size={16} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <h2 className="text-xl font-bold text-white mb-6">{t('orders.orderSummary')}</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>{t('cart.subtotal')}</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>{t('cart.tax')} (10%)</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-700 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">{t('cart.total')}</span>
                  <span className="text-blue-400">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link to="/checkout">
              <Button variant="primary" size="lg" icon={ArrowRight} className="w-full">
                {t('cart.proceedToCheckout')}
              </Button>
            </Link>

            <Link to="/games">
              <button className="w-full mt-3 text-blue-400 hover:text-blue-300 transition text-sm">
                {t('cart.continueShopping')}
              </button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;