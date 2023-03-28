import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

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
    <div
      className={`w-full min-h-screen fixed top-0 left-0 z-50 bg-black bg-opacity-70 transition duration-300 ${
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className="w-full z-40 top-0 left-0 h-full absolute"
        onClick={() => setOpen(false)}
      ></div>
      <div
        className={`transform absolute z-50 ${
          open ? "top-1/2" : "top-[60%]"
        } left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all w-[95%] sm:max-w-5xl`}
      >
        <div>
          <video ref={videoRef} src={src} controls></video>
        </div>
      </div>
    </div>
  );
}
