import { useLayoutEffect, useState } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useLayoutEffect(() => {
    handleSize();

    window.addEventListener('resize', handleSize);

    return () => window.removeEventListener('resize', handleSize);
  }, []);

  return windowSize;
};

export const useWindowScroll = () => {
  const [windowScroll, setWindowScroll] = useState({ scrollX: 0, scrollY: 0 });
  const handleScroll = () => {
    setWindowScroll({
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    });
  };

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return windowScroll;
};
