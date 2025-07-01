import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="id" suppressHydrationWarning>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="author" content="Indah Dwi Afifah" />
        <meta name="keywords" content="Indah Dwi Afifah, Insurance Administration, Actuarial Science, University of Indonesia, Portfolio" />
      </Head>
      <body className="bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}