import React, { useEffect, useRef } from 'react';

export default function VideoModal({ open, setOpen, src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (open) {
      if (videoRef?.current?.currentTime) {
        videoRef.current.currentTime = 0; // set the playback time to 0
      }
      videoRef?.current?.play();
    } else {
      videoRef?.current?.pause();
    }
  }, [open]);

  return (
    <div className={`fixed left-0 top-0 z-50 min-h-screen w-full bg-black bg-opacity-70 transition duration-300 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
      <div className="absolute left-0 top-0 z-40 h-full w-full" onClick={() => setOpen(false)}></div>
      <div className={`absolute z-50 transform ${open ? 'top-1/2' : 'top-[60%]'} left-1/2 w-[95%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:max-w-5xl`}>
        <div>
          <video ref={videoRef} src={src} controls></video>
        </div>
      </div>
    </div>
  );
}
