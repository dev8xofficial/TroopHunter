/* eslint-disable prettier/prettier */
import React from 'react';

const FeatureVideo: React.FC = (): JSX.Element => {
  return (
    <div className="grid-template-areas-top-bottom grid w-full grid-rows-[50%_50%] px-[var(--container-gutter)]">
      <div className="grid-area-top"></div>
      <div className="col-start-[bottom] col-end-[bottom] row-start-[top] row-end-[top] h-[200vh]" id="feature-video-wrapper">
        <div className="progress-0 relative z-[1] grid rounded-[inherit] lg:sticky lg:left-[var(--container-gutter)] lg:right-[var(--container-gutter)] lg:top-0 lg:h-screen" id="feature-video" style={{ borderRadius: 'calc(30px * (1 - var(--progress)))' }}>
          <div className="offset-feature-video relative grid origin-[50%_50%_0px] transform-none overflow-hidden rounded-[inherit] lg:absolute lg:left-[--offset] lg:right-[--offset] lg:h-full">
            <picture className="leading-0 col-start-1 col-end-auto row-start-1 row-end-auto block aspect-square h-screen w-full max-w-full rounded-[inherit] object-cover">
              <img className="absolute left-0 top-0 m-0 block h-full w-full max-w-full transform rounded-[inherit] border border-solid border-transparent object-cover outline-offset-0 transition-[outline_.4s]" src={`${getTroopHunterPublicUrl()}/images/placeholder/1080.png`} alt="" />
            </picture>
            <video className="rounded-inherit z-0 col-start-1 col-end-auto row-start-1 row-end-auto aspect-square w-full object-cover lg:absolute lg:left-0 lg:top-0 lg:h-screen lg:object-contain lg:object-center" src={`${getTroopHunterPublicUrl()}/videos/troophunter-lead-gen/light/1080.mp4`} preload="none" loop controls={false} autoPlay muted playsInline></video>
          </div>
        </div>
      </div>
      <div className="grid-area-bottom"></div>
    </div>
  );
};

export default FeatureVideo;
