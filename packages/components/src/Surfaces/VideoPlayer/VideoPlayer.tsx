import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

import ButtonStyles from '../Button/index.module.css';
import HomepageShowreelStyles from '../HomepageShowreel/index.module.css';

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

interface QualityLevel {
  height: number;
  width: number;
  bitrate: number;
  index: number;
  label: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [qualityLevels, setQualityLevels] = useState<QualityLevel[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(0);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [dataSubmenuOpen, setDataSubmenuOpen] = useState(false);
  const [height, setHeight] = useState(45);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen();
      } else if ((video as any).msRequestFullscreen) {
        (video as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullscreenElement;

      setIsFullscreen(!!fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (!isClient) return;

    if (isMobile && dataSubmenuOpen) {
      setHeight(160);
    } else if (!isMobile && dataSubmenuOpen) {
      setHeight(200);
    } else if (isMobile && !dataSubmenuOpen) {
      setHeight(34);
    } else {
      setHeight(45);
    }
  }, [isMobile, dataSubmenuOpen, isClient]);

  useEffect(() => {
    const video = videoRef.current;

    if (video && Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const targetResolutions = [1080, 720, 480];
        const levels = hls.levels
          .map((level, index) => ({
            height: level.height,
            width: level.width,
            bitrate: level.bitrate,
            index,
            label: `${level.height}p`
          }))
          .filter((level) => targetResolutions.includes(level.height))
          .sort((a, b) => b.height - a.height);

        setQualityLevels(levels);

        const default1080 = levels.find((level) => level.height === 1080);
        if (default1080) {
          hls.currentLevel = default1080.index;
          setCurrentQuality(default1080.index);
        }

        video
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.warn('Autoplay failed:', err));
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        setCurrentQuality(data.level);
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error('HLS error:', data);
      });

      return () => {
        hls.destroy();
        hlsRef.current = null;
      };
    } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Autoplay failed:', err));
    }
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
    }
  }, [isMuted]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteUnmute = () => {
    setIsMuted(!isMuted);
  };

  const handleShowreelClick = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch((err) => console.warn('Manual play failed:', err));
    }
  };

  const handleQualityChange = (levelIndex: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = levelIndex;
      setCurrentQuality(levelIndex);
      setShowQualityMenu(false);
      setHeight(isMobile ? 34 : 45);
      setDataSubmenuOpen(false);
    }
  };

  const handleResolutionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowQualityMenu((prev) => !prev);
    setDataSubmenuOpen((prev) => !prev);

    if (!dataSubmenuOpen) {
      setHeight(isMobile ? 170 : 200);
    } else {
      setHeight(isMobile ? 34 : 45);
    }
  };

  const getCurrentQualityLabel = () => {
    const level = qualityLevels.find((q) => q.index === currentQuality);
    return level ? level.label : '1080p';
  };

  const renderPlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26">
      <path fill="currentColor" d="m10.834 17.875 6.5-4.875-6.5-4.875v9.75ZM13 2.166C7.02 2.166 2.167 7.02 2.167 13c0 5.98 4.853 10.833 10.833 10.833S23.834 18.98 23.834 13 18.98 2.166 13 2.166Zm0 19.5c-4.777 0-8.666-3.889-8.666-8.666 0-4.778 3.889-8.667 8.666-8.667 4.778 0 8.667 3.89 8.667 8.667 0 4.777-3.89 8.666-8.667 8.666Z"></path>
    </svg>
  );

  const renderPauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26">
      <path fill="currentColor" d="M9.75 17.333h2.167V8.667H9.75v8.666ZM13 2.167C7.02 2.166 2.167 7.02 2.167 13S7.02 23.833 13 23.833 23.834 18.98 23.834 13 18.98 2.166 13 2.166Zm0 19.5c-4.777 0-8.666-3.89-8.666-8.667 0-4.778 3.889-8.667 8.666-8.667 4.778 0 8.667 3.89 8.667 8.667 0 4.777-3.89 8.666-8.667 8.666Zm1.084-4.334h2.166V8.667h-2.166v8.666Z"></path>
    </svg>
  );

  const renderResolutionIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
      style={{
        width: isMobile ? '20px' : '26px',
        height: isMobile ? '20px' : '20px',
        color: 'white',
        cursor: 'pointer'
      }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
    </svg>
  );

  const renderMuteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26">
      <path fill="currentColor" d="M3.25 9.75v6.5h4.333L13 21.666V4.334L7.583 9.75H3.25Zm7.583-.184v6.868l-2.35-2.35H5.417v-2.168h3.066l2.35-2.35ZM17.875 13a4.875 4.875 0 0 0-2.708-4.366v8.72A4.847 4.847 0 0 0 17.875 13Zm-2.708-9.501v2.232A7.589 7.589 0 0 1 20.583 13a7.589 7.589 0 0 1-5.416 7.269v2.232c4.344-.986 7.583-4.864 7.583-9.501s-3.24-8.515-7.583-9.501Z"></path>
    </svg>
  );

  const renderUnmuteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26">
      <path fill="currentColor" d="M4.701 3.174 3.174 4.702l4.723 4.723-.314.325H3.25v6.5h4.333L13 21.667v-7.14l4.528 4.529a7.272 7.272 0 0 1-2.362 1.203v2.231a9.685 9.685 0 0 0 3.911-1.896l2.221 2.221 1.528-1.527L4.7 3.174Zm6.132 13.26-2.35-2.35H5.415v-2.167h3.066l.953-.954 1.398 1.398v4.073ZM20.583 13c0 .889-.162 1.744-.444 2.535l1.657 1.658A9.68 9.68 0 0 0 22.75 13c0-4.637-3.24-8.515-7.584-9.5V5.73a7.589 7.589 0 0 1 5.417 7.27ZM13 4.333 10.963 6.37 13 8.407V4.333ZM17.875 13a4.875 4.875 0 0 0-2.709-4.366v1.94l2.687 2.686c.01-.086.022-.173.022-.26Z"></path>
    </svg>
  );

  const renderFullScreenIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      style={{
        width: isMobile ? '20px' : '26px',
        height: isMobile ? '20px' : '20px',
        color: 'white',
        cursor: 'pointer'
      }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"></path>
    </svg>
  );

  const renderExitFullscreenIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      style={{
        width: '26px',
        height: '26px',
        color: 'white',
        cursor: 'pointer'
      }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"></path>
    </svg>
  );

  const renderCheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={isMobile ? '14' : '16'}
      height={isMobile ? '14' : '16'}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      style={{
        color: 'white',
        marginLeft: isMobile ? '6px' : '8px',
        flexShrink: 0
      }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );

  if (!isClient) {
    return <video ref={videoRef} controls={false} loop playsInline muted={true} poster={poster} style={{ width: '100%', borderRadius: '8px' }} />;
  }

  return (
    <>
      <video ref={videoRef} controls={false} loop playsInline muted={true} poster={poster} style={{ width: '100%', borderRadius: '8px' }} />
      <div className={`${HomepageShowreelStyles['showreel__controls']} ${isPlaying ? HomepageShowreelStyles['showreel__controls--playing'] : HomepageShowreelStyles['showreel__controls--paused']} ${dataSubmenuOpen ? `${HomepageShowreelStyles['showreel__controls-submenu-transition']}` : ''} ${dataSubmenuOpen ? `${HomepageShowreelStyles['showreel__controls-submenu-open']}` : ''}`} data-submenu-open={`${dataSubmenuOpen}`} style={{ '--height': height } as React.CSSProperties}>
        <div className={HomepageShowreelStyles['showreel__controls-menu']}>
          {qualityLevels.map((level) => (
            <button key={level.index} onClick={() => handleQualityChange(level.index)} className={HomepageShowreelStyles['showreel__controls-resolution-button']}>
              {level.label}
              {currentQuality === level.index && renderCheckIcon()}
            </button>
          ))}
        </div>

        <div className={HomepageShowreelStyles['showreel__icons']}>
          <button onClick={handleResolutionClick}>
            <div style={{ position: 'relative' }}>{renderResolutionIcon()}</div>
          </button>
          {!isMobile && <button onClick={handlePlayPause}>{isPlaying ? renderPauseIcon() : renderPlayIcon()}</button>}
          {!isMobile && <button onClick={handleMuteUnmute}>{isMuted ? renderUnmuteIcon() : renderMuteIcon()}</button>}
          <button onClick={handleFullscreen}>{isFullscreen ? renderExitFullscreenIcon() : renderFullScreenIcon()}</button>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
