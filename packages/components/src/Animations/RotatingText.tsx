import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type MotionValues = {
  y?: string | number;
  opacity?: number;
  [key: string]: any;
};

type RotatingTextProps = {
  texts: string[];
  mainClassName?: string;
  staggerFrom?: 'first' | 'last';
  initial?: MotionValues;
  animate?: MotionValues;
  exit?: MotionValues;
  staggerDuration?: number;
  splitLevelClassName?: string;
  transition?: object;
  rotationInterval?: number;
};

export const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  mainClassName = '',
  staggerFrom = 'first',
  initial = { y: '120%', opacity: 0 },           // ✅ smoother entry from bottom
  animate = { y: '0%', opacity: 1 },             // ✅ center position
  exit = { y: '-120%', opacity: 0 },             // ✅ smoother exit to top
  staggerDuration = 0.025,
  splitLevelClassName = '',
  transition = { duration: 0.6, ease: 'easeInOut' }, // ✅ smooth transition
  rotationInterval = 2000                          // ✅ faster like humaan
}) => {
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
      }, 400);
    }, rotationInterval);
    return () => clearInterval(timer);
  }, [texts.length, rotationInterval]);

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
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
              >
                {text}
              </motion.span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};
export default RotatingText;