import React, { useEffect, useRef, useState } from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '', id = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Fallback: make visible after 400ms regardless of observer
    const fallback = setTimeout(() => setIsVisible(true), 400);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 md:py-32 transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-6'} ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
