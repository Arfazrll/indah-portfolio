// src/components/ui/ProgressBar.tsx
import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  height?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  delay?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  showPercentage = true,
  color = 'primary',
  height = 'md',
  animated = true,
  delay = 0,
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const colors = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500',
    secondary: 'bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-400 dark:to-gray-500',
    success: 'bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 dark:from-red-400 dark:to-red-500',
  };

  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  useEffect(() => {
    if (isInView && animated && !hasAnimated) {
      controls.start({
        width: `${percentage}%`,
        transition: {
          duration: 1.5,
          delay: delay,
          ease: 'easeOut',
        },
      });
      setHasAnimated(true);
    } else if (!animated) {
      controls.set({ width: `${percentage}%` });
    }
  }, [isInView, percentage, animated, controls, hasAnimated, delay]);

  return (
    <div ref={ref} className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          {showPercentage && (
            <motion.span 
              className="text-sm font-semibold text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.5 }}
            >
              {percentage}%
            </motion.span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${heights[height]} shadow-inner`}>
        <motion.div
          className={`h-full ${colors[color]} rounded-full relative overflow-hidden shadow-sm`}
          initial={{ width: 0 }}
          animate={controls}
        >
          {/* Enhanced shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;