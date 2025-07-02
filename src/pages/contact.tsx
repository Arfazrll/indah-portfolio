import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import AnimatedSection from '../components/ui/AnimatedSection';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ContactFormData } from '../types';
import { contactInfo } from '../lib/constants';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const ContactPage: React.FC = () => {
  const { t } = useTranslation('common');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Initialize EmailJS with your public key
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
      
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        }
      );

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    {
      icon: FaEnvelope,
      label: t('Email'),
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: FaPhone,
      label: t('Phone'),
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'Indah Dwi Afifah',
      href: 'https://www.linkedin.com/in/indah-dwi-afifah/',
    },
    {
      icon: FaMapMarkerAlt,
      label: t('Location'),
      value: contactInfo.location,
    },
  ];

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <AnimatedSection animation="fadeIn" className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('contact.title')}</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <AnimatedSection animation="slideRight">
            <Card variant="bordered" className="h-full">
              <h2 className="text-2xl font-bold mb-6">{t('Personal Info')}</h2>
              <div className="space-y-6">
                {contactDetails.map((detail, index) => {
                  const Icon = detail.icon;
                  return (
                    <motion.div
                      key={detail.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full">
                        <Icon className="text-xl text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{detail.label}</p>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            target={detail.href.startsWith('http') ? '_blank' : undefined}
                            rel={detail.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400">{detail.value}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </AnimatedSection>

          <AnimatedSection animation="slideLeft">
            <Card variant="gradient" className="h-full">
              <h2 className="text-2xl font-bold mb-6">{t('Send Message')}</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input
                    {...register('name', { required: t('contact.form.nameRequired') })}
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                    {...register('email', {
                      required: t('contact.form.emailRequired'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('contact.form.emailInvalid'),
                      },
                    })}
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    {...register('subject', { required: t('contact.form.subjectRequired') })}
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    {...register('message', { required: t('contact.form.messageRequired') })}
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                  />
                                    {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  icon={<FaPaperPlane />}
                  iconPosition="right"
                >
                  {t('contact.form.send')}
                </Button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-lg text-center"
                  >
                    {t('contact.form.success')}
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded-lg text-center"
                  >
                    {t('contact.form.error')}
                  </motion.div>
                )}
              </form>
            </Card>
          </AnimatedSection>
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

export default ContactPage;