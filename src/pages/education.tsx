import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import AnimatedSection from '../components/ui/AnimatedSection';
import Card from '../components/ui/Card';
import { education } from '../lib/constants';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendar, FaBookOpen } from 'react-icons/fa';

const EducationPage: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <AnimatedSection animation="fadeIn" className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('education.title')}</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('education.subtitle')}
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <AnimatedSection
              key={edu.id}
              animation="slideUp"
              delay={index * 0.2}
              className="mb-8"
            >
              <Card variant="elevated" hover>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full">
                    <FaGraduationCap className="text-3xl text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {edu.institution}
                    </h3>
                    <p className="text-lg text-primary-600 dark:text-primary-400 font-medium mb-2">
                      {edu.degree} - {edu.field}
                    </p>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
                      <FaCalendar className="mr-2" />
                      <span>
                        {edu.startDate} - {edu.current ? t('education.present') : edu.endDate}
                      </span>
                    </div>

                    {edu.activities && edu.activities.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <FaBookOpen className="mr-2" />
                          {t('education.activities')}
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                          {edu.activities.map((activity, idx) => (
                            <li key={idx}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
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

export default EducationPage;