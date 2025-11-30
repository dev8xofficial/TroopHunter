import React from 'react';
import Image from 'next/image';

interface PictureProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  eager?: boolean;
}

export const Picture: React.FC<PictureProps> = ({ src, alt, className, width = 0, height = 0, eager = false }) => {
  return <Image src={src} alt={alt} className={className} width={width} height={height} loading={eager ? 'eager' : 'lazy'} style={{ height: 'auto' }} />;
};
