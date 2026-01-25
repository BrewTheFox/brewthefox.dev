import { useState, useEffect } from 'react';

export const useTotalPageVh = () => {
  const [totalVh, setTotalVh] = useState(0);

  useEffect(() => {
    const calculateVh = () => {
      const docHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      if (viewportHeight === 0) return;
      const vh = (docHeight / viewportHeight) * 100;
      setTotalVh(vh);
    };
    calculateVh();
    window.addEventListener('resize', calculateVh);

    const resizeObserver = new ResizeObserver(() => {
      calculateVh();
    });
    
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('resize', calculateVh);
      resizeObserver.disconnect();
    };
  }, []);

  return totalVh;
};