import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaHeart } from 'react-icons/fa';
import { SocialLink } from '../../types';

const Footer: React.FC = () => {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/indah-dwiafifah',
      icon: FaLinkedin,
    },
    {
      name: 'Email',
      href: 'mailto:indah300604@gmail.com',
      icon: FaEnvelope,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/indahdwiafifah',
      icon: FaGithub,
    },
  ];

  const quickLinks = [
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.experience'), href: '/experience' },
    { name: t('nav.skills'), href: '/skills' },
    { name: t('nav.education'), href: '/education' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-dark-card border-t border-gray-200 dark:border-dark-border">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">Indah Dwi Afifah</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('hero.title')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-500 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('contact.title')}
            </h4>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p>Jakarta Metropolitan Area</p>
              <p>indah300604@gmail.com</p>
              <p>+62 812-8200-3199</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-border">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              © {currentYear} Indah Dwi Afifah. {t('footer.rights')}.
            </p>
            <p className="mt-2 flex items-center justify-center space-x-1">
              <span>{t('footer.madeWith')}</span>
              <FaHeart className="text-red-500 animate-pulse-slow" />
              <span>{t('footer.by')} Indah</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;