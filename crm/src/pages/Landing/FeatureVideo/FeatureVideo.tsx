/* eslint-disable prettier/prettier */
import React from 'react';

const FeatureVideo: React.FC = (): JSX.Element => {
  return (
    <div className="grid-template-areas-top-bottom grid-rows-[50%_50%] grid px-[var(--container-gutter)] w-full">
      <div className="grid-area-top"></div>
      <div className="row-start-[top] col-start-[bottom] row-end-[top] col-end-[bottom] h-[200vh]" id="feature-video-wrapper">
        <div className="rounded-[inherit] z-[1] relative grid lg:h-screen lg:top-0 lg:left-[var(--container-gutter)] lg:right-[var(--container-gutter)] lg:sticky progress-0" id="feature-video" style={{ borderRadius: 'calc(30px * (1 - var(--progress)))' }}>
          <div className="overflow-hidden grid relative origin-[50%_50%_0px] transform-none rounded-[inherit] offset-feature-video lg:left-[--offset] lg:right-[--offset] lg:h-full lg:absolute">
            <picture className="max-w-full leading-0 block rounded-[inherit] aspect-square row-start-1 col-start-1 row-end-auto col-end-auto object-cover w-full h-screen">
              <img className="block m-0 max-w-full object-cover h-full w-full left-0 top-0 absolute outline-offset-0 rounded-[inherit] border border-solid border-transparent transform transition-[outline_.4s]" src={`${import.meta.env.VITE_TROOPHUNTER_PUBLIC_URL}/images/placeholder/1080.png`} alt="" />
            </picture>
            <video className="rounded-inherit z-0 aspect-square row-start-1 col-start-1 row-end-auto col-end-auto object-cover w-full lg:object-center lg:object-contain lg:top-0 lg:left-0 lg:absolute lg:h-screen" src={`${import.meta.env.VITE_TROOPHUNTER_PUBLIC_URL}/videos/troophunter-lead-gen/light/1080.mp4`} preload="none" loop controls={false} autoPlay muted playsInline></video>
          </div>
        </div>
      </div>
      <div className="grid-area-bottom"></div>
    </div>
  );
};

export default FeatureVideo;
