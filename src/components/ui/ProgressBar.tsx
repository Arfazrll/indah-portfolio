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
    primary: 'bg-primary-500 dark:bg-primary-400',
    secondary: 'bg-gray-500 dark:bg-gray-400',
    success: 'bg-green-500 dark:bg-green-400',
    warning: 'bg-yellow-500 dark:bg-yellow-400',
    danger: 'bg-red-500 dark:bg-red-400',
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
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {percentage}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${heights[height]}`}>
        <motion.div
          className={`h-full ${colors[color]} rounded-full relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={controls}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;