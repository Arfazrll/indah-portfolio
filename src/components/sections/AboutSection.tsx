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
      title: t('Education'),
      description: t('I am currently pursuing a degree in Insurance Administration and Actuarial Science at the University of Indonesia, where I have gained knowledge in risk assessment, actuarial methodologies, financial analysis, and more. This has shaped my understanding of both theoretical and practical aspects of the industry.'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-100/80 dark:bg-blue-900/30',
    },
    {
      icon: FaBriefcase,
      title: t('Leadership Experience'),
      description: t('As the Head of the Internal Department at HIMASIRA UI, I led initiatives that fostered collaboration, designed development programs, and created a thriving community within the department. My role has further developed my skills in human resource management, team leadership, and program execution.'),
      color: 'text-green-500',
      bgColor: 'bg-green-100/80 dark:bg-green-900/30',
    },
    {
      icon: FaTrophy,
      title: t('Achievements'),
      description: t('Throughout my academic and extracurricular endeavors, I have been recognized for my contributions to student organizations, including my involvement in organizing major events such as the Company Visit to the Indonesia Stock Exchange. Additionally, I have earned certifications in various fields like Digital Marketing and Microsoft Office, underscoring my dedication to continuous learning and growth.'),
      color: 'text-purple-500',
      bgColor: 'bg-purple-100/80 dark:bg-purple-900/30',
    },
  ];

  return (
    <section id="about" className="section-padding bg-section-secondary">
      <div className="container-custom relative z-10">
        <AnimatedSection animation="fadeIn" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('Get to Know Me')}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('Student at the University of Indonesia, specializing in Insurance and Actuarial Science, with a focus on risk management.')}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedSection animation="slideRight">
            <div className="glass-effect-strong rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('Introduction')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('I am a final-year student at the University of Indonesia, specializing in Insurance Administration and Actuarial Science. Throughout my academic journey, I have developed a strong foundation in key areas like claims management, accounting, underwriting, risk management, and actuarial science.')}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('Outside of academics, I have actively taken on leadership roles, such as serving as the Head of the Internal Department at HIMASIRA UI, where Ive been responsible for managing human resources and student-university relations. Ive also organized various programs, including mentoring initiatives, to further enhance my leadership skills.')}
              </p>
              <Button
                href="/about"
                variant="primary"
                icon={<FaArrowRight />}
                iconPosition="right"
                className="shadow-lg hover:shadow-xl"
              >
                {t('Learn More')}
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