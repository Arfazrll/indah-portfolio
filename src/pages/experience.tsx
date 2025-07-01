import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import AnimatedSection from '../components/ui/AnimatedSection';
import Card from '../components/ui/Card';
import { experiences } from '../lib/constants';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

const ExperiencePage: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <AnimatedSection animation="fadeIn" className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('experience.title')}</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <AnimatedSection
              key={exp.id}
              animation="slideUp"
              delay={index * 0.1}
              className="mb-8"
            >
              <Card variant="bordered" hover>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
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
                        {exp.startDate} - {exp.current ? t('experience.present') : exp.endDate}
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

                <p className="text-gray-700 dark:text-gray-300 mb-4">{exp.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t('experience.responsibilities')}
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>

                {exp.achievements && exp.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {t('experience.achievements')}
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            </AnimatedSection>
          ))}
        </div>
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

export default ExperiencePage;