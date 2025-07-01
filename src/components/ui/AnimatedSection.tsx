// src/components/ui/AnimatedSection.tsx - FIXED VERSION
import React from 'react';
import { motion, useInView, Variants, TargetAndTransition } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'custom';
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  customVariants?: Variants;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.1,
  customVariants,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  // Define animation variants with proper typing
  const animationVariants: Record<string, Variants> = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: 'easeOut',
        }
      },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration,
          delay,
          ease: 'easeOut',
        }
      },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration,
          delay,
          ease: 'easeOut',
        }
      },
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration,
          delay,
          ease: 'easeOut',
        }
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration,
          delay,
          ease: 'easeOut',
        }
      },
    },
  };

  const selectedVariants = customVariants || animationVariants[animation] || animationVariants.fadeIn;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={selectedVariants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;