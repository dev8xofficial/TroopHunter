'use client';

import React, { CSSProperties, ReactNode, useState, useRef, useEffect } from 'react';
import { prefixed } from '../../../utils/helpers';

import PictureStyles from '../Picture/index.module.css';
import styles from './index.module.css';

type HomepageShowreelProps = {
  children?: ReactNode;
  homepageShowreelCSSClass: string;
  src: string;
  isMobile: boolean;
  poster?: string;
};

export const HomepageShowreel: React.FC<HomepageShowreelProps> = ({ children, homepageShowreelCSSClass, src, isMobile, poster }: HomepageShowreelProps): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [height, setHeight] = useState(45);

  useEffect(() => {
    const video = videoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When visible → play
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch((err) => console.warn('Autoplay failed:', err));
          } else {
            // When out of view → pause only
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 } // 25% visibility triggers play/pause
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  // Keep mute state synced
  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = isMuted;
  }, [isMuted]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleMuteUnmute = () => setIsMuted((prev) => !prev);

  const renderPlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26" className="" style={{ '--width': '26', '--height': '26' } as React.CSSProperties as any}>
      <path fill="currentColor" d="m10.834 17.875 6.5-4.875-6.5-4.875v9.75ZM13 2.166C7.02 2.166 2.167 7.02 2.167 13c0 5.98 4.853 10.833 10.833 10.833S23.834 18.98 23.834 13 18.98 2.166 13 2.166Zm0 19.5c-4.777 0-8.666-3.889-8.666-8.666 0-4.778 3.889-8.667 8.666-8.667 4.778 0 8.667 3.89 8.667 8.667 0 4.777-3.89 8.666-8.667 8.666Z"></path>
    </svg>
  );

  const renderPauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26" className="" style={{ '--width': '26', '--height': '26' } as React.CSSProperties as any}>
      <path fill="currentColor" d="M9.75 17.333h2.167V8.667H9.75v8.666ZM13 2.167C7.02 2.166 2.167 7.02 2.167 13S7.02 23.833 13 23.833 23.834 18.98 23.834 13 18.98 2.166 13 2.166Zm0 19.5c-4.777 0-8.666-3.89-8.666-8.667 0-4.778 3.889-8.667 8.666-8.667 4.778 0 8.667 3.89 8.667 8.667 0 4.777-3.89 8.666-8.667 8.666Zm1.084-4.334h2.166V8.667h-2.166v8.666Z"></path>
    </svg>
  );

  const renderMuteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26" className="" style={{ '--width': '26', '--height': '26' } as React.CSSProperties as any}>
      <path fill="currentColor" d="M3.25 9.75v6.5h4.333L13 21.666V4.334L7.583 9.75H3.25Zm7.583-.184v6.868l-2.35-2.35H5.417v-2.168h3.066l2.35-2.35ZM17.875 13a4.875 4.875 0 0 0-2.708-4.366v8.72A4.847 4.847 0 0 0 17.875 13Zm-2.708-9.501v2.232A7.589 7.589 0 0 1 20.583 13a7.589 7.589 0 0 1-5.416 7.269v2.232c4.344-.986 7.583-4.864 7.583-9.501s-3.24-8.515-7.583-9.501Z"></path>
    </svg>
  );

  const renderUnmuteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26" className="" style={{ '--width': '26', '--height': '26' } as React.CSSProperties as any}>
      <path fill="currentColor" d="M4.701 3.174 3.174 4.702l4.723 4.723-.314.325H3.25v6.5h4.333L13 21.667v-7.14l4.528 4.529a7.272 7.272 0 0 1-2.362 1.203v2.231a9.685 9.685 0 0 0 3.911-1.896l2.221 2.221 1.528-1.527L4.7 3.174Zm6.132 13.26-2.35-2.35H5.415v-2.167h3.066l.953-.954 1.398 1.398v4.073ZM20.583 13c0 .889-.162 1.744-.444 2.535l1.657 1.658A9.68 9.68 0 0 0 22.75 13c0-4.637-3.24-8.515-7.584-9.5V5.73a7.589 7.589 0 0 1 5.417 7.27ZM13 4.333 10.963 6.37 13 8.407V4.333ZM17.875 13a4.875 4.875 0 0 0-2.709-4.366v1.94l2.687 2.686c.01-.086.022-.173.022-.26Z"></path>
    </svg>
  );

  return (
    <>
      <div></div>
      <div className={`${styles['showreel-wrapper']} ${homepageShowreelCSSClass}`}>
        <div id="showreel" className={styles['showreel']} style={{ '--progress': 0, transform: 'translateY(0vh) translateZ(0px)' } as CSSProperties}>
          <div id="showreel-inner" className={styles['showreel__inner']} style={{ borderRadius: '30px', transform: 'none', transformOrigin: '50% 50% 0px' }}>
            {children ? (
              children
            ) : (
              <>
                 <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['showreel__image']}`}>
                  <source className={styles['picture']} srcSet={`${prefixed('/images/header/1080.png')} 1x, ${prefixed('/images/header/1080.png')} 2x`} media="(min-width: 0px) and (max-width: 479px)" />
                  <source className={styles['picture']} srcSet={`${prefixed('/images/header/1080.png')} 1x, ${prefixed('/images/header/1080.png')} 2x`} media="(min-width: 480px)" />
                  <img src={prefixed('/images/header/1080.png')} loading="eager" width="450" height="364" alt="" className="" draggable="false" />
                </picture>

                <video ref={videoRef} className={`${styles['showreel__video']} ${isMobile ? styles['showreel__video--mobile'] : styles['showreel__video--desktop']}`} src={src} poster={poster} preload="metadata" loop controls={false} muted={isMuted} playsInline />

                <div className={`${styles['showreel__controls']} ${isPlaying ? styles['showreel__controls--playing'] : styles['showreel__controls--paused']}`} style={{ '--height': height } as React.CSSProperties}>
                  <div className={styles['showreel__icons']}>
                    <button aria-label={isPlaying ? 'Pause Showreel Video' : 'Play Showreel Video'} data-faitracker-form-bind="true" onClick={handlePlayPause}>
                      {isPlaying ? renderPauseIcon() : renderPlayIcon()}
                    </button>

                    <button aria-label={isMuted ? 'Unmute Showreel Video' : 'Mute Showreel Video'} data-faitracker-form-bind="true" onClick={handleMuteUnmute}>
                      {isMuted ? renderUnmuteIcon() : renderMuteIcon()}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};
