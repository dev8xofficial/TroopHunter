"use client";

import { motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function Spotlight({
  children,
  className,
  strength = 0.5,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
} & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  // motion values for mouse position (normalized 0 to 1)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // motion value for spotlight opacity (0 = hidden, 1 = fully visible)
  const spotlightOpacity = useMotionValue(0);

  // update mouse position on mousemove inside ref element
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleMouseMove(e: MouseEvent) {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      mouseX.set(x);
      mouseY.set(y);
    }

    function handleMouseEnter() {
      // fade spotlight in
      spotlightOpacity.set(1);
    }

    function handleMouseLeave() {
      // fade spotlight out
      spotlightOpacity.set(0);
    }

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, spotlightOpacity]);

  // convert mouseX/Y to percentage strings
  const xPercent = useTransform(mouseX, (v) => `${v * 100}%`);
  const yPercent = useTransform(mouseY, (v) => `${v * 100}%`);

  // size of spotlight circle based on strength prop
  const size = `${strength * 100}%`;

  // create radial gradient with dynamic opacity
  const maskImage = useMotionTemplate`radial-gradient(circle ${size} at ${xPercent} ${yPercent}, rgba(255 255 255 / ${spotlightOpacity.get()}), transparent 80%)`;

  // Animate the mask opacity smoothly by linking spotlightOpacity to gradient opacity
  const animatedMaskImage = useTransform(
    [mouseX, mouseY, spotlightOpacity],
    ([x, y, o]) =>
      `radial-gradient(circle ${size} at ${x * 100}% ${y * 100}%, rgba(255 255 255 / ${o}), transparent 80%)`
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        WebkitMaskImage: animatedMaskImage,
        maskImage: animatedMaskImage,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        transition: "background-color 0.3s ease",
        willChange: "mask-image, -webkit-mask-image",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
