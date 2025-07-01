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
      title: t('about.highlights.education'),
      description: t('about.highlights.educationDesc'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: FaBriefcase,
      title: t('about.highlights.leadership'),
      description: t('about.highlights.leadershipDesc'),
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: FaTrophy,
      title: t('about.highlights.achievements'),
      description: t('about.highlights.achievementsDesc'),
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
  ];

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <AnimatedSection animation="fadeIn" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('about.sectionTitle')}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('about.sectionSubtitle')}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedSection animation="slideRight">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('about.introTitle')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about.introParagraph1')}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about.introParagraph2')}
              </p>
              <Button
                href="/about"
                variant="primary"
                icon={<FaArrowRight />}
                iconPosition="right"
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
                    <Card variant="bordered" hover>
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${highlight.bgColor}`}>
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