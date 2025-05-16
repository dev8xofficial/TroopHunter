'use client';
import React, { useRef } from 'react';
import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion';

interface MagnetProps {
  children: React.ReactNode;
  radius?: number;
  strength?: number;
}

export const Magnet: React.FC<MagnetProps> = ({ children, radius = 0.5, strength = 0.15 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 20 });

  const transformX = useTransform(springX, (val) => `${val}px`);
  const transformY = useTransform(springY, (val) => `${val}px`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;

    const mouseXRelative = e.clientX - bounds.left;
    const mouseYRelative = e.clientY - bounds.top;

    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    const distanceX = mouseXRelative - centerX;
    const distanceY = mouseYRelative - centerY;

    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const maxDistance = bounds.width * radius;

    if (distance < maxDistance) {
      mouseX.set(distanceX * strength);
      mouseY.set(distanceY * strength);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div ref={ref} style={{ x: transformX, y: transformY, display: 'inline-block' }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </motion.div>
  );
};
