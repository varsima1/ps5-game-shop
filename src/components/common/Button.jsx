// src/components/common/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon
}) => {
  const baseStyles = 'font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed',
    secondary: 'bg-slate-700 text-white hover:bg-slate-600 disabled:bg-gray-700 disabled:cursor-not-allowed',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white disabled:border-gray-600 disabled:text-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed',
    success: 'bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg'
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
      {children}
    </button>
  );
};

export default Button;