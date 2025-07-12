import React, { useState, useEffect } from 'react';

const Notification = ({ 
  message, 
  type = "info", 
  duration = 5000, 
  onClose,
  position = "top-right"
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  const typeConfig = {
    success: {
      icon: "✅",
      bgColor: "bg-green-500",
      textColor: "text-green-800",
      borderColor: "border-green-200"
    },
    error: {
      icon: "❌",
      bgColor: "bg-red-500",
      textColor: "text-red-800",
      borderColor: "border-red-200"
    },
    warning: {
      icon: "⚠️",
      bgColor: "bg-yellow-500",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-200"
    },
    info: {
      icon: "ℹ️",
      bgColor: "bg-blue-500",
      textColor: "text-blue-800",
      borderColor: "border-blue-200"
    }
  };

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2"
  };

  const config = typeConfig[type];

  if (!isVisible) return null;

  return (
    <div className={`fixed z-50 ${positionClasses[position]}`}>
      <div
        className={`
          max-w-sm w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 
          ${config.borderColor} p-4 transform transition-all duration-300 ease-in-out
          ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
        `}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-xl">{config.icon}</span>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={handleClose}
              className="inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:text-gray-600 dark:focus:text-gray-300 transition-colors duration-200"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification; 