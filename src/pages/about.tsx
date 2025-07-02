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
      title: t('Integrity'),
      description: t('I believe in upholding the highest standards of honesty and transparency in all aspects of my personal and professional life. Integrity is key to building trust and maintaining strong, lasting relationships, which are essential for both personal growth and organizational success.'),
      color: 'text-red-500',
    },
    {
      icon: FaLightbulb,
      title: t('Innovation'),
      description: t('I value creativity and problem-solving, always striving to find innovative solutions to challenges. I am constantly seeking new ways to improve processes and enhance efficiency, believing that innovation drives both individual and organizational progress.'),
      color: 'text-yellow-500',
    },
    {
      icon: FaRocket,
      title: t('Excellence'),
      description: t('Striving for excellence is at the core of my approach. I am committed to delivering high-quality results in everything I do, whether in academic achievements, leadership roles, or professional endeavors. Excellence drives me to continually improve and exceed expectations.'),
      color: 'text-blue-500',
    },
    {
      icon: FaUsers,
      title: t('Collaboration'),
      description: t('I understand that teamwork is essential for success. I value collaboration and believe that working together with others, sharing knowledge, and supporting each other leads to the best outcomes. Building strong, cooperative relationships is something I prioritize in both academic and professional environments.'),
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
              <h2 className="text-2xl font-bold mb-4">{t('My Journey')}</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>{t(' I am currently a final-year student at the University of Indonesia, majoring in Insurance Administration and Actuarial Science. Throughout my academic journey, I have gained a strong academic exposure to subjects like claim, accounting, underwriting, risk management, and actuarial science.')}</p>
                <p>{t('During my time at university, I have also taken on leadership roles, such as being the Head of the Internal Department at HIMASIRA UI, where I was responsible for human resource management and fostering student-university relations. I have organized multiple events and mentoring programs that further sharpened my leadership and organizational skills.')}</p>
                <p>{t('My journey in leadership and academic excellence has prepared me for challenges in the insurance and financial services industry. I am now looking forward to applying my skills in a professional internship to contribute to the growth of the organization and advance my career.')}</p>
              </div>
            </Card>
          </AnimatedSection>

          <AnimatedSection animation="slideLeft">
            <Card variant="gradient" className="h-full">
              <h2 className="text-2xl font-bold mb-4">{t('What Drives Me')}</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>{t('My mission is to develop a deep understanding of the insurance and financial services sectors while contributing to the growth and success of any organization I work with. I aim to continuously improve my skills in actuarial science, risk management, and organizational')}</p>
                <p>{t('I am passionate about creating environments where teams can thrive and enhance their soft and hard skills, similar to the work I did at HIMASIRA UI with the Internal Department. I seek opportunities that provide both personal and professional growth.')}</p>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">{t('Goals for the Future')}</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>{t('To secure an internship in the insurance and financial services industry where I can utilize my skills in analytical thinking and leadership.')}</li>
                    <li>{t('To develop a strong network within the industry, building relationships with professionals and peers who can provide guidance and mentorship.')}</li>
                    <li>{t('To continue building leadership and project management skills, particularly in areas like mentoring, program design, and human resource management.')}</li>
                  </ul>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>

        <AnimatedSection animation="fadeIn">
          <h2 className="text-3xl font-bold text-center mb-12">{t('My Core Values')}</h2>
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