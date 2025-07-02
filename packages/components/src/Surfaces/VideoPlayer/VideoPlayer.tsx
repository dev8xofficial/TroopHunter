import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  src: string; // URL to .m3u8 stream
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari (which supports HLS natively)
      video.src = src;
    }
  }, [src]);

  return <video ref={videoRef} controls autoPlay loop playsInline muted poster={poster} style={{ width: '100%', borderRadius: '8px' }} />;
};

export default VideoPlayer;
