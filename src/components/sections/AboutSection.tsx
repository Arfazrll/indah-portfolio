import React from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedSection from '../ui/AnimatedSection';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { FaArrowRight, FaGraduationCap, FaBriefcase, FaTrophy } from 'react-icons/fa';

const AboutSection: React.FC = () => {
  const { t } = useTranslation('common');

  const highlights = [
    {
      icon: FaGraduationCap,
      title: t('about.highlights.education.title'),
      description: t('about.highlights.education.description'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-100/80 dark:bg-blue-900/30',
    },
    {
      icon: FaBriefcase,
      title: t('about.highlights.leadership.title'),
      description: t('about.highlights.leadership.description'),
      color: 'text-green-500',
      bgColor: 'bg-green-100/80 dark:bg-green-900/30',
    },
    {
      icon: FaTrophy,
      title: t('about.highlights.achievements.title'),
      description: t('about.highlights.achievements.description'),
      color: 'text-purple-500',
      bgColor: 'bg-purple-100/80 dark:bg-purple-900/30',
    },
  ];

  return (
    <section id="about" className="section-padding bg-section-secondary">
      <div className="container-custom relative z-10">
        <AnimatedSection animation="fadeIn" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('about.getToKnowMe')}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('about.studentDescription')}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedSection animation="slideRight">
            <div className="glass-effect-strong rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('about.introduction')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about.introText1')}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about.introText2')}
              </p>
              <Button
                href="/about"
                variant="primary"
                icon={<FaArrowRight />}
                iconPosition="right"
                className="shadow-lg hover:shadow-xl"
              >
                {t('about.learnMore')}
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideLeft">
            <div className="grid grid-cols-1 gap-6">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card variant="bordered" hover className="card-bg-enhanced">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${highlight.bgColor} backdrop-blur-sm`}>
                          <Icon className={`text-2xl ${highlight.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {highlight.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;