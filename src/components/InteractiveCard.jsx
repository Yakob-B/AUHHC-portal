import React, { useState } from 'react';

const InteractiveCard = ({ 
  title, 
  description, 
  icon, 
  onClick, 
  className = "",
  variant = "default",
  children 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    if (onClick) onClick();
  };

  const baseClasses = `
    relative overflow-hidden rounded-lg p-6 cursor-pointer transition-all duration-300
    transform hover:scale-105 active:scale-95
    border border-gray-200 dark:border-gray-700
    bg-white dark:bg-gray-800
    hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20
    ${isClicked ? 'scale-95' : ''}
    ${className}
  `;

  const variantClasses = {
    default: "hover:bg-blue-50 dark:hover:bg-gray-700",
    success: "hover:bg-green-50 dark:hover:bg-green-900/20",
    warning: "hover:bg-yellow-50 dark:hover:bg-yellow-900/20",
    danger: "hover:bg-red-50 dark:hover:bg-red-900/20"
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Animated background gradient */}
      <div className={`
        absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5
        transition-opacity duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `} />
      
      {/* Icon with animation */}
      <div className="relative z-10 mb-4">
        <div className={`
          w-12 h-12 rounded-lg flex items-center justify-center
          bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400
          transition-all duration-300
          ${isHovered ? 'scale-110 rotate-3' : ''}
        `}>
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {description}
        </p>
        {children}
      </div>

      {/* Hover indicator */}
      <div className={`
        absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500
        transition-all duration-300
        ${isHovered ? 'w-full' : 'w-0'}
      `} />
    </div>
  );
};

export default InteractiveCard; 