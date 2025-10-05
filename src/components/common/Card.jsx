// src/components/common/Card.jsx
import React from 'react';

const Card = ({ children, className = '', hover = false, padding = true }) => {
  return (
    <div 
      className={`
        bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700 
        ${hover ? 'hover:border-blue-500 transition duration-300' : ''}
        ${padding ? 'p-6' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;