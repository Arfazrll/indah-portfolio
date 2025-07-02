import React from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedSection from '../ui/AnimatedSection';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { education } from '../../lib/constants';
import { FaGraduationCap, FaCalendar, FaArrowRight } from 'react-icons/fa';

const EducationSection: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <section id="education" className="section-padding">
      <div className="container-custom">
        <AnimatedSection animation="fadeIn" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('Education')}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('A summary of my academic background, where I am currently enhancing my knowledge in actuarial science and building a foundation in accounting.')}
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {education.map((edu, index) => (
            <AnimatedSection
              key={edu.id}
              animation="scale"
              delay={index * 0.2}
            >
              <Card variant="elevated" hover className="h-full">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full flex-shrink-0">
                    <FaGraduationCap className="text-2xl text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {edu.institution}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium text-sm mb-2">
                      {edu.field}
                    </p>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs">
                      <FaCalendar className="mr-1" />
                      <span>
                        {edu.startDate} - {edu.current ? t('education.present') : edu.endDate}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fadeIn" className="text-center">
          <Button
            href="/education"
            variant="outline"
            size="lg"
            icon={<FaArrowRight />}
            iconPosition="right"
          >
            {t('View Details')}
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default EducationSection;