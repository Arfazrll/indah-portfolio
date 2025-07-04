import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import AnimatedSection from '../components/ui/AnimatedSection';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import { skills, certifications } from '../lib/constants';
import { motion } from 'framer-motion';
import { FaCode, FaUsers, FaLanguage, FaCertificate } from 'react-icons/fa';

const SkillsPage: React.FC = () => {
  const { t } = useTranslation('common');
  const [activeCategory, setActiveCategory] = useState<'all' | 'technical' | 'soft' | 'language'>('all');

  const categories = [
    { id: 'all', label: t('skills.all'), icon: null },
    { id: 'technical', label: t('skills.categories.technical'), icon: FaCode },
    { id: 'soft', label: t('skills.categories.soft'), icon: FaUsers },
    { id: 'language', label: t('skills.categories.languages'), icon: FaLanguage },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <AnimatedSection animation="fadeIn" className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('skills.title')}</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as any)}
                  className={`px-6 py-3 rounded-full font-medium transition-all flex items-center space-x-2 ${
                    activeCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {Icon && <Icon className="text-lg" />}
                  <span>{category.label}</span>
                </motion.button>
              );
            })}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredSkills.map((skill, index) => (
            <AnimatedSection
              key={skill.id}
              animation="scale"
              delay={index * 0.05}
            >
              <Card variant="bordered">
                <ProgressBar
                  percentage={skill.percentage}
                  label={skill.name}
                  color="primary"
                  height="md"
                  animated
                  delay={index * 0.1}
                />
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fadeIn">
          <Card variant="gradient" className="text-center">
            <FaCertificate className="text-4xl text-primary-600 dark:text-primary-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-6">{t('skills.certifications')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-dark-card rounded-lg p-4 shadow-md"
                >
                  <p className="font-medium text-gray-800 dark:text-gray-200">{cert}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'id', ['common'])),
    },
  };
};

export default SkillsPage;