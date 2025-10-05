// src/components/common/Input.jsx
import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  name,
  placeholder, 
  value, 
  onChange, 
  error, 
  icon: Icon,
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-gray-300 mb-2 text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={20} />
          </div>
        )}
        
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full bg-slate-800 text-white rounded-lg py-2.5 px-4 
            ${Icon ? 'pl-11' : ''} 
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            disabled:bg-slate-700 disabled:cursor-not-allowed
            ${error ? 'border-2 border-red-500' : 'border border-slate-700'}`}
        />
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;