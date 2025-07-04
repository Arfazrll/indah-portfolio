import React from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedSection from '../ui/AnimatedSection';
import SectionWrapper from '../ui/SectionWrapper';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import { skills } from '../../lib/constants';
import { FaCode, FaUsers, FaLanguage, FaArrowRight } from 'react-icons/fa';

const SkillsSection: React.FC = () => {
  const { t } = useTranslation('common');
  
  const topSkills = [
    ...skills.filter(s => s.category === 'technical').slice(0, 3),
    ...skills.filter(s => s.category === 'soft').slice(0, 2),
    ...skills.filter(s => s.category === 'language').slice(0, 1),
  ];

  const categoryIcons = {
    technical: FaCode,
    soft: FaUsers,
    language: FaLanguage,
  };

  const categoryColors = {
    technical: 'text-blue-500',
    soft: 'text-green-500',
    language: 'text-purple-500',
  };

  return (
    <SectionWrapper id="skills" variant="secondary">
      <AnimatedSection animation="fadeIn" className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">{t('skills.title')}</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('skills.description')}
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {topSkills.map((skill, index) => {
          const Icon = categoryIcons[skill.category];
          const colorClass = categoryColors[skill.category];
          
          return (
            <AnimatedSection
              key={skill.id}
              animation="scale"
              delay={index * 0.05}
            >
              <Card variant="bordered" hover className="card-bg-enhanced">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {skill.name}
                  </h4>
                  <div className="glass-effect p-2 rounded-lg">
                    <Icon className={`text-xl ${colorClass}`} />
                  </div>
                </div>
                <ProgressBar
                  percentage={skill.percentage}
                  showPercentage
                  color="primary"
                  height="sm"
                  animated
                  delay={index * 0.1}
                />
              </Card>
            </AnimatedSection>
          );
        })}
      </div>

      <AnimatedSection animation="fadeIn" className="text-center">
        <Button
          href="/skills"
          variant="outline"
          size="lg"
          icon={<FaArrowRight />}
          iconPosition="right"
          className="backdrop-blur-sm"
        >
          {t('skills.viewAll')}
        </Button>
      </AnimatedSection>
    </SectionWrapper>
  );
};

export default SkillsSection;