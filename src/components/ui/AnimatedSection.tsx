import React from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimationConfig } from '../../types';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'custom';
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  customAnimation?: AnimationConfig;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.1,
  customAnimation,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const animations: Record<string, AnimationConfig> = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
    },
    slideLeft: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
  };

  const selectedAnimation = customAnimation || animations[animation] || animations.fadeIn;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={selectedAnimation.initial}
      animate={isInView ? selectedAnimation.animate : selectedAnimation.initial}
      exit={selectedAnimation.exit}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
        ...selectedAnimation.transition,
      }}
      whileHover={selectedAnimation.whileHover}
      whileTap={selectedAnimation.whileTap}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;