import React, { useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type RevealTextProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blurAmount?: number;
  once?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

const revealVariants: Variants = {
  hidden: (custom: { yOffset: number; blurAmount: number }) => ({
    opacity: 0,
    y: custom.yOffset,
    filter: `blur(${custom.blurAmount}px)`,
  }),
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const AppearOnScroll: React.FC<RevealTextProps> = ({
  children,
  delay = 0,
  duration = 1.2,
  yOffset = 30,
  blurAmount = 10,
  once = true,
  className = '',
  as = 'div',
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: once });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start('visible');
      setHasAnimated(true);
    }
  }, [inView, hasAnimated, controls]);

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      ref={ref}
      className={className}
      custom={{ yOffset, blurAmount }}
      variants={revealVariants}
      initial="hidden"
      animate={controls}
      transition={{ delay, duration }}
    >
      {children}
    </Tag>
  );
};
