// src/components/sections/Hero.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaEnvelope } from 'react-icons/fa';
import Button from '../ui/Button';
import AnimatedSection from '../ui/AnimatedSection';

const Hero: React.FC = () => {
  const { t } = useTranslation('common');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of images for carousel
  const images = [
    '/images/profile1.jpg',
    '/images/profile2.jpg', 
    '/images/profile3.jpg'
  ];

  // Auto-switch images every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center section-padding bg-section-primary relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="glass-effect-strong rounded-2xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-600 dark:text-gray-400 mb-2"
              >
                {t('hero.greeting')}
              </motion.p>
              
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              >
                <span className="gradient-text">{t('hero.name')}</span>
              </motion.h1>
              
              <motion.h2
                variants={itemVariants}
                className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
              >
                {t('hero.title')}
              </motion.h2>
              
              <motion.p
                variants={itemVariants}
                className="text-base text-gray-600 dark:text-gray-400 mb-6"
              >
                {t('hero.subtitle')}
              </motion.p>
              
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
              >
                {t('hero.description')}
              </motion.p>
              
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<FaEnvelope />}
                  iconPosition="left"
                  className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {t('hero.cta.contact')}
                </Button>
                
                <Button
                  href="https://drive.google.com/file/d/1MAxqTNYILjVQpLcASWcwImvccQ1OeNrh/view?usp=sharing"
                  variant="outline"
                  size="lg"
                  icon={<FaDownload />}
                  iconPosition="right"
                  external
                  className="backdrop-blur-sm hover:backdrop-blur-lg transform hover:scale-105 transition-all duration-300"
                >
                  {t('hero.cta.resume')}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Image Carousel */}
          <motion.div
            variants={imageVariants}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-purple-600 rounded-full opacity-20 blur-3xl animate-pulse-slow scale-110" />
              
              {/* Profile Image Carousel Container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/50 dark:border-white/20 shadow-2xl glass-effect relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={images[currentImageIndex]}
                      alt="Profile Picture"
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    />
                  </AnimatePresence>
                  
                  {/* Carousel Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-full glass-effect shadow-lg"
                  animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary-400/30 to-purple-400/30 rounded-full" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full glass-effect shadow-lg"
                  animate={{
                    y: [0, 20, 0],
                    scale: [1, 1.2, 1],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;