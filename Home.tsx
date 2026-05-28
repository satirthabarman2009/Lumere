import { useEffect } from 'react';

export default function useSmoothScroll() {
  useEffect(() => {
    // Lenis smooth scroll disabled for better mobile performance
    // Native smooth scroll with CSS scroll-behavior: smooth is sufficient

    const handleSmoothScroll = () => {
      const html = document.documentElement;
      html.style.scrollBehavior = 'smooth';
    };

    handleSmoothScroll();

    // Optimize scroll performance
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Throttled scroll handling
          ticking = false;
        });
        ticking = true;
      }
    };

    // Passive scroll listener for better performance
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}
