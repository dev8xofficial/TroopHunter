import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Appear = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: 'easeOut', delay },
      });
      setHasAnimated(true);
    }
  }, [inView, controls, hasAnimated, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default Appear;
