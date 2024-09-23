import React from 'react';

const FeatureVideoResponsive: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="m-[2.5rem_0] mt-0 gap-[3.125rem] grid w-full mx-auto px-[var(--container-gutter)] max-w-[calc(clamp(89.5rem,94.708994709vw,119.035rem)+var(--container-gutter)*2)] md:gap-[clamp(1.875rem,1.9841269841vw,2.49375rem)] lg:m-[clamp(4.375rem,4.6296296296vw,5.81875rem)_0] lg:mt-0">
        <div className="auto-cols-fr gap-[inherit] grid grid-template-areas-a">
          <div className="w-full aspect-x-1452 aspect-y-890">
            <a className="bg-transparent rounded-[clamp(1.25rem,1.3227513228vw,1.6625rem)] text-[inherit] no-underline relative w-full block lg:rounded-[clamp(1.875rem,1.9841269841vw,2.49375rem)]">
              <div className="relative overflow-hidden grid rounded-[inherit] pt-[calc(var(--aspect-y)/var(--aspect-x)*100%)]">
                <div className="w-full h-full left-0 top-2/4 absolute transform -translate-y-2/4 z-1">
                  <div className="w-full h-full leading-[0] block rounded-2xl bg-[#d8e7ee]"></div>
                </div>

                <div className="h-auto grid transform -translate-y-2/4 -translate-x-2/4 left-2/4 top-2/4 absolute w-[69.4214876033%] items-center">
                  <picture className="max-w-full leading-[0] block rounded-2xl row-start-1 -col-start-1 row-end-auto col-end-auto absolute">
                    <img className="max-w-full m-0 object-cover w-full h-full rounded-[inherit]" src={`${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/images/placeholder/1080.png`}></img>
                  </picture>
                  <video className="rounded-inherit z-0 aspect-square row-start-1 col-start-1 row-end-auto col-end-auto w-auto object-center object-contain" src={`${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/videos/troophunter-lead-gen/1080.mp4`} preload="none" loop controls={false} autoPlay muted playsInline></video>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureVideoResponsive;
