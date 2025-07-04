// src/components/ui/Card.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
  className?: string;
  animate?: boolean;
  delay?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = true,
  onClick,
  className = '',
  animate = true,
  delay = 0,
}) => {
  const baseStyles = 'rounded-xl transition-all duration-300 relative overflow-hidden';
  
  const variants = {
    default: 'bg-white dark:bg-dark-card',
    bordered: 'bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border',
    elevated: 'bg-white dark:bg-dark-card shadow-lg hover:shadow-2xl',
    gradient: 'gradient-card border border-gray-100 dark:border-gray-700',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hover
    ? 'hover:shadow-xl cursor-pointer transform-gpu'
    : '';

  const combinedClassName = `
    ${baseStyles}
    ${variants[variant]}
    ${paddings[padding]}
    ${hoverStyles}
    ${className}
  `.trim();

  const cardContent = (
    <motion.div
      className={combinedClassName}
      onClick={onClick}
      whileHover={hover ? {
        scale: 1.02,
        rotateX: -5,
        rotateY: 5,
        transition: { duration: 0.3 }
      } : {}}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {/* Inner shadow for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-black/20 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: delay,
          ease: 'easeOut',
        }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default Card;