import React, { useState, useRef } from 'react';

const CollapsibleSection = ({ 
  title, 
  children, 
  defaultOpen = false,
  className = "",
  icon = "📋"
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState(defaultOpen ? 'auto' : '0px');
  const contentRef = useRef(null);

  const toggleSection = () => {
    if (isOpen) {
      setHeight('0px');
      setIsOpen(false);
    } else {
      setHeight(`${contentRef.current.scrollHeight}px`);
      setIsOpen(true);
    }
  };

  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${className}`}>
      <button
        onClick={toggleSection}
        className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between text-left"
      >
        <div className="flex items-center space-x-3">
          <span className="text-xl">{icon}</span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height }}
      >
        <div ref={contentRef} className="px-6 py-4 bg-white dark:bg-gray-900">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection; 