import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedBackground from '../ui/AnimatedBackground';
import { SEOProps } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  seo?: SEOProps;
}

const Layout: React.FC<LayoutProps> = ({ children, seo = {} }) => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://indahdwiafifah.com';
  
  const defaultSEO: SEOProps = {
    title: 'Indah Dwi Afifah - Insurance & Actuarial Administration',
    description: 'Final-year student majoring in Insurance Administration and Actuarial Science at University of Indonesia. Head of Internal Department at HIMASIRA UI.',
    image: `${baseUrl}/images/og-image.jpg`,
    url: `${baseUrl}${router.pathname}`,
  };

  const mergedSEO = { ...defaultSEO, ...seo };

  return (
    <>
      <Head>
        <title>{mergedSEO.title}</title>
        <meta name="description" content={mergedSEO.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={mergedSEO.title} />
        <meta property="og:description" content={mergedSEO.description} />
        <meta property="og:image" content={mergedSEO.image} />
        <meta property="og:url" content={mergedSEO.url} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={mergedSEO.title} />
        <meta name="twitter:description" content={mergedSEO.description} />
        <meta name="twitter:image" content={mergedSEO.image} />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={mergedSEO.url} />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Indah Dwi Afifah',
              jobTitle: 'Insurance & Actuarial Administration Student',
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'University of Indonesia'
              },
              email: 'indah300604@gmail.com',
              telephone: '+62-812-8200-3199',
              url: baseUrl,
              sameAs: [
                'https://www.linkedin.com/in/indah-dwiafifah',
              ]
            })
          }}
        />
      </Head>

      <div className="min-h-screen flex flex-col bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 relative">
        {/* Animated Background */}
        <AnimatedBackground />
        
        <Navbar />
        
        <AnimatePresence mode="wait">
          <motion.main
            key={router.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow pt-16 sm:pt-20 relative z-10"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        
        <Footer />
      </div>
    </>
  );
};

export default Layout;