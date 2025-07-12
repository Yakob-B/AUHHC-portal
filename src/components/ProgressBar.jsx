import React, { useState, useEffect, useRef } from 'react';

const ProgressBar = ({ 
  progress, 
  max = 100, 
  className = "",
  showLabel = true,
  variant = "default",
  animated = true 
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !animated) {
      setDisplayProgress(progress);
      return;
    }

    const duration = 1000;
    const startTime = Date.now();
    const startProgress = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutCubic = 1 - Math.pow(1 - progressRatio, 3);
      const currentProgress = startProgress + (progress - startProgress) * easeOutCubic;
      
      setDisplayProgress(currentProgress);

      if (progressRatio < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [progress, isVisible, animated]);

  const percentage = (displayProgress / max) * 100;

  const variantClasses = {
    default: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
    purple: "bg-purple-500"
  };

  const bgClasses = {
    default: "bg-blue-100 dark:bg-blue-900/30",
    success: "bg-green-100 dark:bg-green-900/30",
    warning: "bg-yellow-100 dark:bg-yellow-900/30",
    danger: "bg-red-100 dark:bg-red-900/30",
    purple: "bg-purple-100 dark:bg-purple-900/30"
  };

  return (
    <div ref={ref} className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div className={`w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${bgClasses[variant]}`}>
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${variantClasses[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 