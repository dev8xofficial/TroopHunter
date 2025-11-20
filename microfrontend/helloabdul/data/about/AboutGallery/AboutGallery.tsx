import React, { useEffect, useRef, useState, forwardRef, MouseEvent, TouchEvent } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import clsx from 'clsx';
import styles from './AboutGallery.module.css'; // Your CSS Module
import { Picture } from './Picture'; // Assuming you have this
import { useBreakpoint } from './useBreakpoint'; // Custom hook
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export interface GalleryItem {
  image: {
    filename: string;
    alt: string;
  };
  type: 'short' | 'tall';
}

interface AboutGalleryProps {
  className?: string;
  gallery: GalleryItem[];
}

export const AboutGallery: React.FC<AboutGalleryProps> = ({ className, gallery }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const loopLeftRef = useRef<HTMLDivElement>(null);
  const loopRightRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef<HTMLDivElement>(null);

  const [isInteracting, setInteracting] = useState(false);
  const [dragging, setDragging] = useState(false);
  const isMobile = useBreakpoint(992); // adjust breakpoint as needed

  const x = useMotionValue(0);
  const dragVelocity = useRef<number[]>(Array(10).fill(0));
  const touchStartX = useRef<number>();
  const animationFrame = useRef<number>();

  const tripledGallery = [...gallery, ...gallery, ...gallery];

  const calculateLoopLimits = () => {
    if (!wrapperRef.current || !loopLeftRef.current || !loopRightRef.current || !firstRef.current || !lastRef.current) return;

    const wrapperWidth = wrapperRef.current.offsetWidth;

    const loopLeft = loopLeftRef.current.offsetLeft + loopLeftRef.current.offsetWidth - wrapperWidth;
    const loopRight = loopRightRef.current.offsetLeft;
    const first = firstRef.current.offsetLeft;
    const last = lastRef.current.offsetLeft + lastRef.current.offsetWidth - wrapperWidth;

    loopLeftRef.current.dataset.limit = (-loopLeft).toString();
    loopRightRef.current.dataset.limit = (-loopRight).toString();
    firstRef.current.dataset.limit = (-first).toString();
    lastRef.current.dataset.limit = (-last).toString();
  };

  const animateMomentum = () => {
    let momentum = dragVelocity.current.reduce((a, b) => a + b, 0) / dragVelocity.current.length;

    const step = (timestamp: number) => {
      momentum *= 0.95; // decay factor
      x.set(x.get() + momentum);

      if (Math.abs(momentum) > 0.1) {
        animationFrame.current = requestAnimationFrame(step);
      }
    };

    cancelAnimationFrame(animationFrame.current ?? 0);
    animationFrame.current = requestAnimationFrame(step);
  };

  const handleMouseMove = (e: MouseEvent) => {
    dragVelocity.current.unshift(e.movementX);
    dragVelocity.current.pop();
    x.set(x.get() + e.movementX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (touchStartX.current === undefined) {
      touchStartX.current = e.touches[0].clientX;
      return;
    }

    const delta = (e.touches[0].clientX - touchStartX.current) * 1.5;
    touchStartX.current = e.touches[0].clientX;

    dragVelocity.current.unshift(delta);
    dragVelocity.current.pop();
    x.set(x.get() + delta);
  };

  const handleMouseUp = () => {
    setDragging(false);
    animateMomentum();
    window.removeEventListener('mousemove', handleMouseMove as any);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchEnd = () => {
    setDragging(false);
    animateMomentum();
    window.removeEventListener('touchmove', handleTouchMove as any);
    window.removeEventListener('touchend', handleTouchEnd);
  };

  const onDragStart = (e: MouseEvent | TouchEvent) => {
    setDragging(true);
    dragVelocity.current.fill(0);

    if ('touches' in e) {
      touchStartX.current = e.touches[0].clientX;
      window.addEventListener('touchmove', handleTouchMove as any);
      window.addEventListener('touchend', handleTouchEnd);
    } else {
      window.addEventListener('mousemove', handleMouseMove as any);
      window.addEventListener('mouseup', handleMouseUp);
    }
  };

  useEffect(() => {
    calculateLoopLimits();
    window.addEventListener('resize', calculateLoopLimits);
    return () => {
      window.removeEventListener('resize', calculateLoopLimits);
      cancelAnimationFrame(animationFrame.current ?? 0);
    };
  }, []);

  return (
    <motion.div ref={wrapperRef} className={clsx(styles['gallery-wrapper'], className)} onMouseDown={onDragStart} onTouchStart={onDragStart}>
      <motion.div ref={innerRef} className={styles.gallery} style={{ x }}>
        {tripledGallery.map((item, index) => {
          const listIndex = index % gallery.length;
          const segment = Math.floor(index / gallery.length);
          let itemRef: React.RefObject<HTMLDivElement> | null = null;

          if (segment === 0 && listIndex === gallery.length - 1) itemRef = loopLeftRef;
          else if (segment === 2 && listIndex === 0) itemRef = loopRightRef;
          else if (segment === 1 && listIndex === 0) itemRef = firstRef;
          else if (segment === 1 && listIndex === gallery.length - 1) itemRef = lastRef;

          return (
            <div key={index} className={clsx(styles['gallery__shrink-drag'], dragging && styles['gallery__shrink-drag--dragging'])}>
              <GalleryItemComponent ref={itemRef} item={item} index={listIndex} />
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

const GalleryItemComponent = forwardRef<HTMLDivElement, { item: GalleryItem; index: number }>(({ item, index }, ref) => {
  return (
    <motion.div ref={ref} className={styles.gallery__item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
      <Picture className={clsx(styles.gallery__image, styles[`gallery__image--${item.type}`])} src={item.image.filename} alt={item.image.alt} height={item.type === 'short' ? 347 : 495} width={0} eager />
    </motion.div>
  );
});

GalleryItemComponent.displayName = 'GalleryItemComponent';
