import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { HiGlobeAlt } from 'react-icons/hi';

const LanguageToggle: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  const handleLanguageChange = () => {
    const nextLocale = locale === 'id' ? 'en' : 'id';
    router.push(router.pathname, router.asPath, { locale: nextLocale });
  };

  return (
    <motion.button
      onClick={handleLanguageChange}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${locale === 'id' ? 'English' : 'Indonesian'}`}
    >
      <HiGlobeAlt className="w-5 h-5" />
      <span className="text-sm font-medium uppercase">{locale}</span>
    </motion.button>
  );
};

export default LanguageToggle;