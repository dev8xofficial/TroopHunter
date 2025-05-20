import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type AppearOnScrollProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

export const AppearOnScroll: React.FC<AppearOnScrollProps> = ({
  children,
  delay = 0.2,
  duration = 1.5,  // Duration increased to 2 seconds
  yOffset = 30,
  once = true,
  className = '',
  as = 'div',
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: once });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration, delay, ease: 'easeOut' },
      });
    }
  }, [inView, controls, delay, duration]);

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={controls}
      className={className}
    >
      {children}
    </Tag>
  );
};
