'use client';
import React, { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion';

interface MagnetProps {
  className: string;
  children: React.ReactNode;
  radius?: number;
  strength?: number;
  disabled?: boolean;
}

export const Magnet: React.FC<MagnetProps> = ({ className, children, radius = 10, strength = 0.05, disabled }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 20 });

  const transformX = useTransform(springX, (val) => `${val}px`);
  const transformY = useTransform(springY, (val) => `${val}px`);

  useEffect(() => {
    if (disabled) {
      mouseX.set(0);
      mouseY.set(0);
      return;
    }
  }, [radius, disabled, strength]);

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
    <motion.span ref={ref} className={className} style={{ x: transformX, y: transformY }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </motion.span>
  );
};
