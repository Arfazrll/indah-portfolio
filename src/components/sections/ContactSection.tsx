import React from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { contactInfo } from '../../lib/constants';
import { FaEnvelope, FaPhone, FaLinkedin, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import Card from '../ui/Card';
import Button from '../ui/Button';
import AnimatedSection from '../ui/AnimatedSection';

const ContactSection: React.FC = () => {
  const { t } = useTranslation('common');

  const contactMethods = [
    {
      icon: FaEnvelope,
      label: t('contact.info.email'),
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
    },
    {
      icon: FaPhone,
      label: t('contact.info.phone'),
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: FaLinkedin,
      label: t('contact.info.linkedin'),
      value: 'Indah Dwi Afifah',
      href: 'https://www.linkedin.com/in/indah-dwi-afifah/',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: FaMapMarkerAlt,
      label: t('contact.info.location'),
      value: 'Jakarta, Indonesia',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
  ];

  return (
    <section id="contact" className="section-padding bg-section-secondary">
      <div className="container-custom relative z-10">
        <Card variant="bordered" className="card-bg-enhanced">
          <AnimatedSection animation="fadeIn" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">{t('contact.title')}</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('contact.hereAreBestWays')}
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <AnimatedSection
                    key={method.label}
                    animation="scale"
                    delay={index * 0.1}
                  >
                    <Card variant="bordered" hover>
                      <div className="flex items-center space-x-4">
                        <div className={`p-4 rounded-full ${method.bgColor}`}>
                          <Icon className={`text-2xl ${method.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {method.label}
                          </p>
                          {method.href ? (
                            <a
                              href={method.href}
                              target={method.href.startsWith('http') ? '_blank' : undefined}
                              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                              {method.value}
                            </a>
                          ) : (
                            <p className="font-medium text-gray-900 dark:text-white">
                              {method.value}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection animation="fadeIn" className="text-center">
              <Card variant="gradient" className="inline-block">
                <h3 className="text-xl font-bold mb-4">{t('contact.sendMessage')}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md">
                  {t('contact.haveQuestions')}
                </p>
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<FaArrowRight />}
                  iconPosition="right"
                >
                  {t('contact.form.send')}
                </Button>
              </Card>
            </AnimatedSection>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;