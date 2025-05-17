import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type RotatingTextProps = {
  texts: string[];
  mainClassName?: string;
  staggerFrom?: 'first' | 'last';
  initial?: object;
  animate?: object;
  exit?: object;
  staggerDuration?: number;
  splitLevelClassName?: string;
  transition?: object;
  rotationInterval?: number;
};

export const RotatingText: React.FC<RotatingTextProps> = ({ texts, mainClassName = '', staggerFrom = 'first', initial = { y: '200%', opacity: 0 }, animate = { y: 0, opacity: 1 }, exit = { y: '-200%', opacity: 0 }, staggerDuration = 0.025, splitLevelClassName = '', transition = { type: 'spring', damping: 20, stiffness: 200 }, rotationInterval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const currentText = texts[currentIndex] || '';

  useEffect(() => {
    if (texts.length < 2) return;
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setVisible(true);
      }, 400); // delay before showing next text
    }, rotationInterval);
    return () => clearInterval(timer);
  }, [texts.length, rotationInterval]);

  // Treat the full text as one animation block
  const splitText = (text: string) => [text];

  const letterVariants = {
    initial: (i: number) => ({
      y: initial.y,
      opacity: initial.opacity,
      transition: {
        delay: i * staggerDuration,
        ...transition
      }
    }),
    animate: (i: number) => ({
      y: animate.y,
      opacity: animate.opacity,
      transition: {
        delay: i * staggerDuration,
        ...transition
      }
    }),
    exit: (i: number) => ({
      y: exit.y,
      opacity: exit.opacity,
      transition: {
        delay: i * staggerDuration,
        ...transition
      }
    })
  };

  return (
    <span className={mainClassName} aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.span
            key={currentText}
            className={splitLevelClassName}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom'
            }}
          >
            {splitText(currentText).map((text, i) => (
              <motion.span key={i} custom={i} variants={letterVariants} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                {text}
              </motion.span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};
