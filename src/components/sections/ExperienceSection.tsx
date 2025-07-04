import React from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedSection from '../ui/AnimatedSection';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { experiences } from '../../lib/constants';
import { FaCalendar, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation('common');
  const displayExperiences = experiences.slice(0, 3);

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        <AnimatedSection animation="fadeIn" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('experience.title')}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('experience.description')}
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {displayExperiences.map((exp, index) => (
            <AnimatedSection
              key={exp.id}
              animation="slideUp"
              delay={index * 0.1}
              className="mb-6"
            >
              <Card variant="bordered" hover>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {exp.title}
                    </h3>
                    <p className="text-lg text-primary-600 dark:text-primary-400 font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 flex flex-col md:items-end space-y-1">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                      <FaCalendar className="mr-2" />
                      <span>
                        {exp.startDate} - {exp.current ? t('common.present') : exp.endDate}
                      </span>
                    </div>
                    {exp.location && (
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {exp.description}
                </p>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fadeIn" className="text-center mt-8">
          <Button
            href="/experience"
            variant="outline"
            size="lg"
            icon={<FaArrowRight />}
            iconPosition="right"
          >
            {t('experience.viewAll')}
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ExperienceSection;