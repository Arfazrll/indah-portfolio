import React from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  animated?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  variant = 'primary',
  className = '',
  animated = true,
}) => {
  const baseClasses = 'section-padding relative overflow-hidden';
  const variantClasses = {
    primary: 'bg-section-primary',
    secondary: 'bg-section-secondary',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (animated) {
    return (
      <motion.section
        id={id}
        className={combinedClasses}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-custom relative z-10">
          {children}
        </div>
      </motion.section>
    );
  }

  return (
    <section id={id} className={combinedClasses}>
      <div className="container-custom relative z-10">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;