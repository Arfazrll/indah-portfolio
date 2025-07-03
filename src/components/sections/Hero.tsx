import React from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { FaDownload, FaEnvelope } from 'react-icons/fa';
import Button from '../ui/Button';
import AnimatedSection from '../ui/AnimatedSection';

const Hero: React.FC = () => {
  const { t } = useTranslation('common');

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
    <section className="min-h-screen flex items-center justify-center section-padding bg-section-primary">
      <div className="container-custom relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content with enhanced glass effect */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="glass-effect-strong rounded-2xl p-8 lg:p-10">
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
                  className="shadow-lg hover:shadow-xl"
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
                  className="backdrop-blur-sm"
                >
                  {t('hero.cta.resume')}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Image/Visual Element */}
          <motion.div
            variants={imageVariants}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Background decoration with glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
              
              {/* Profile Image Container with glass border */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/50 dark:border-white/20 shadow-2xl glass-effect">
                  <img 
                    src="images/Bubub.jpg" 
                    alt="Profile Picture" 
                    className="w-full h-full object-cover" 
                  />
                </div>
  
                {/* Floating elements with glass effect */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-full glass-effect"
                  animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
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
                  className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full glass-effect"
                  animate={{
                    y: [0, 20, 0],
                    scale: [1, 1.2, 1],
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

        {/* Scroll Indicator with glass effect */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-6 h-10 border-2 border-gray-400/50 dark:border-gray-600/50 rounded-full flex justify-center glass-effect">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;