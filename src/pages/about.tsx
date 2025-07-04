import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import AnimatedSection from '../components/ui/AnimatedSection';
import Card from '../components/ui/Card';
import { motion } from 'framer-motion';
import { FaHeart, FaLightbulb, FaRocket, FaUsers } from 'react-icons/fa';

const AboutPage: React.FC = () => {
  const { t } = useTranslation('common');

  const values = [
    {
      icon: FaHeart,
      title: t('aboutPage.values.integrity.title'),
      description: t('aboutPage.values.integrity.description'),
      color: 'text-red-500',
    },
    {
      icon: FaLightbulb,
      title: t('aboutPage.values.innovation.title'),
      description: t('aboutPage.values.innovation.description'),
      color: 'text-yellow-500',
    },
    {
      icon: FaRocket,
      title: t('aboutPage.values.excellence.title'),
      description: t('aboutPage.values.excellence.description'),
      color: 'text-blue-500',
    },
    {
      icon: FaUsers,
      title: t('aboutPage.values.collaboration.title'),
      description: t('aboutPage.values.collaboration.description'),
      color: 'text-green-500',
    },
  ];

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <AnimatedSection animation="fadeIn" className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('about.title')}</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <AnimatedSection animation="slideRight">
            <Card variant="bordered" className="h-full">
              <h2 className="text-2xl font-bold mb-4">{t('aboutPage.myJourney')}</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>{t('aboutPage.journey1')}</p>
                <p>{t('aboutPage.journey2')}</p>
                <p>{t('aboutPage.journey3')}</p>
              </div>
            </Card>
          </AnimatedSection>

          <AnimatedSection animation="slideLeft">
            <Card variant="gradient" className="h-full">
              <h2 className="text-2xl font-bold mb-4">{t('aboutPage.whatDrivesMe')}</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>{t('aboutPage.drives1')}</p>
                <p>{t('aboutPage.drives2')}</p>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">{t('aboutPage.futureGoals')}</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>{t('aboutPage.goal1')}</li>
                    <li>{t('aboutPage.goal2')}</li>
                    <li>{t('aboutPage.goal3')}</li>
                  </ul>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>

        <AnimatedSection animation="fadeIn">
          <h2 className="text-3xl font-bold text-center mb-12">{t('aboutPage.coreValues')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="elevated" hover className="text-center h-full">
                    <Icon className={`text-4xl mb-4 mx-auto ${value.color}`} />
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
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

export default AboutPage;