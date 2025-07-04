import React from 'react';

export function Button({ children, className = '', variant = 'default', ...props }) {
  const baseStyle = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    default: 'bg-yellow-500 text-black hover:bg-yellow-400 focus:ring-yellow-300',
    secondary: 'bg-white text-black hover:bg-gray-200 focus:ring-gray-300',
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
