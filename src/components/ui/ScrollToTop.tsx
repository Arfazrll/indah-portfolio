// src/components/ui/ScrollToTop.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const ScrollToTop: React.FC = () => {
  const { pathname } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;