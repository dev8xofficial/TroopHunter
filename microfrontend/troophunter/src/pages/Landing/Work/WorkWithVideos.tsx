/* eslint-disable prettier/prettier */
import React from 'react';

import { getTroopHunterPublicUrl } from '../../../utils/helpers';

const WorkWithVideos: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="m-[2.5rem_0] mx-auto !-mt-[50vh] grid w-full max-w-[calc(clamp(89.5rem,94.708994709vw,119.035rem)+var(--container-gutter)*2)] gap-[3.125rem] px-[var(--container-gutter)] text-[var(--theme-secondary)] md:gap-[clamp(1.875rem,1.9841269841vw,2.49375rem)] lg:m-[clamp(4.375rem,4.6296296296vw,5.81875rem)_auto]">
        <div className="grid-template-areas-a grid auto-cols-fr gap-[inherit]">
          <div className="aspect-x-710 aspect-y-1250 w-full sm:aspect-x-1452 sm:aspect-y-890">
            <a className="relative block w-full rounded-[clamp(1.25rem,1.3227513228vw,1.6625rem)] bg-transparent text-[inherit] no-underline lg:rounded-[clamp(1.875rem,1.9841269841vw,2.49375rem)]">
              <div className="relative grid overflow-hidden rounded-[inherit] pt-[calc(var(--aspect-y)/var(--aspect-x)*100%)]">
                <div className="absolute left-0 top-2/4 h-full w-full -translate-y-2/4 transform">
                  <div className="block h-full w-full rounded-2xl bg-[#dcf5f2] leading-[0]"></div>
                </div>

                <div className="absolute left-2/4 top-2/4 grid h-auto w-[38.0281690141%] -translate-x-2/4 -translate-y-2/4 transform sm:w-[69.4214876033%] sm:items-center">
                  <picture className="-col-start-1 col-end-auto row-start-1 row-end-auto block max-w-full rounded-2xl px-1 leading-[0] sm:absolute">
                    <img className="m-0 hidden h-full w-full max-w-full rounded-[inherit] object-cover sm:block" src={`${getTroopHunterPublicUrl()}/images/placeholder/1080.png`} alt="Product Overview"></img>
                    <img className="m-0 h-full w-full max-w-full rounded-[inherit] object-cover sm:hidden" src={`${getTroopHunterPublicUrl()}/images/placeholder/3040.png`} alt="Product Overview"></img>
                  </picture>
                  <video className="rounded-inherit z-0 col-start-1 col-end-auto row-start-1 row-end-auto hidden aspect-square w-auto object-contain object-center sm:block sm:dark:hidden" src={`${getTroopHunterPublicUrl()}/videos/troophunter/light/search.mp4`} preload="none" loop controls={false} autoPlay muted playsInline></video>
                  <video className="rounded-inherit z-0 col-start-1 col-end-auto row-start-1 row-end-auto hidden aspect-square w-auto object-contain object-center sm:dark:block" src={`${getTroopHunterPublicUrl()}/videos/troophunter/dark/search.mp4`} preload="none" loop controls={false} autoPlay muted playsInline></video>
                  <video className="rounded-inherit z-0 col-start-1 col-end-auto row-start-1 row-end-auto aspect-square h-full scale-[1.75] object-contain object-center sm:!hidden sm:h-auto sm:scale-[1] dark:hidden" src={`${getTroopHunterPublicUrl()}/videos/troophunter/light/search-mobile.mp4`} preload="none" loop controls={false} autoPlay muted playsInline></video>
                  <video className="rounded-inherit z-0 col-start-1 col-end-auto row-start-1 row-end-auto hidden aspect-square h-full scale-[1.75] object-contain object-center sm:!hidden sm:h-auto sm:scale-[1] dark:block" src={`${getTroopHunterPublicUrl()}/videos/troophunter/dark/search-mobile.mp4`} preload="none" loop controls={false} autoPlay muted playsInline></video>
                </div>
              </div>
              <div className="grid content-end md:absolute md:bottom-0 md:left-0 md:h-full md:w-full">
                <div className="grid p-[clamp(.75rem,.7936507937vw,.9975rem)_0_0] md:sticky md:bottom-0 md:p-[clamp(1.5rem,1.5873015873vw,1.995rem)_clamp(1.875rem,1.9841269841vw,2.49375rem)]">
                  <h3 className="order-1 m-0 text-[clamp(1rem,2.0833333333vw,1.33rem)] font-medium leading-[1.5] md:mb-0 md:mt-0 md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] md:text-[inherit]">Find Businesses Quickly</h3>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="grid-template-areas-a-b grid auto-cols-fr gap-[inherit]">
          <div className="aspect-x-710 aspect-y-1250 w-full sm:aspect-y-890">
            <a className="relative block w-full rounded-[clamp(1.25rem,1.3227513228vw,1.6625rem)] bg-transparent text-[inherit] no-underline lg:rounded-[clamp(1.875rem,1.9841269841vw,2.49375rem)]">
              <div className="relative grid overflow-hidden rounded-[inherit] pt-[calc(var(--aspect-y)/var(--aspect-x)*100%)]">
                <div className="absolute left-0 top-2/4 h-full w-full -translate-y-2/4 transform">
                  <div className="block h-full w-full rounded-2xl bg-[#efe3ff] leading-[0]"></div>
                </div>
                <div className="absolute left-2/4 top-2/4 grid h-auto w-[38.0281690141%] -translate-x-2/4 -translate-y-2/4 transform">
                  <picture className="-col-start-1 col-end-auto row-start-1 row-end-auto block max-w-full rounded-[20px] leading-[0]">
                    <img className="m-0 h-full w-full max-w-full scale-[1.75] rounded-[inherit] object-cover" src={`${getTroopHunterPublicUrl()}/images/placeholder/3040.png`}></img>
                  </picture>
                  <video className="rounded-inherit z-0 col-start-1 col-end-auto row-start-1 row-end-auto aspect-square h-full scale-[1.75] object-contain object-center sm:h-full sm:scale-[1.15] dark:hidden" src={`${getTroopHunterPublicUrl()}/videos/troophunter/light/sort-mobile.mp4`} preload="none" loop controls={false} autoPlay muted playsInline></video>
                  <video className="rounded-inherit z-0 col-start-1 col-end-auto row-start-1 row-end-auto hidden aspect-square h-full scale-[1.75] object-contain object-center sm:h-full sm:scale-[1.15] dark:block" src={`${getTroopHunterPublicUrl()}/videos/troophunter/dark/sort-mobile.mp4`} preload="none" loop controls={false} autoPlay muted playsInline></video>
                </div>
              </div>
              <div className="grid content-end md:absolute md:bottom-0 md:left-0 md:h-full md:w-full">
                <div className="grid p-[clamp(.75rem,.7936507937vw,.9975rem)_0_0] md:sticky md:bottom-0 md:p-[clamp(1.5rem,1.5873015873vw,1.995rem)_clamp(1.875rem,1.9841269841vw,2.49375rem)]">
                  <h3 className="order-1 m-0 text-[clamp(1rem,2.0833333333vw,1.33rem)] font-medium leading-[1.5] md:mb-0 md:mt-0 md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] md:text-[inherit]">Sort and Refine Your Leads</h3>
                </div>
              </div>
            </a>
          </div>
          <div className="aspect-x-710 aspect-y-1250 w-full sm:aspect-y-890">
            <a className="relative block w-full rounded-[clamp(1.25rem,1.3227513228vw,1.6625rem)] bg-transparent text-[inherit] no-underline lg:rounded-[clamp(1.875rem,1.9841269841vw,2.49375rem)]">
              <div className="relative grid overflow-hidden rounded-[inherit] pt-[calc(var(--aspect-y)/var(--aspect-x)*100%)]">
                <div className="absolute left-0 top-2/4 h-full w-full -translate-y-2/4 transform">
                  <div className="block h-full w-full rounded-2xl bg-[#d8e7ee] leading-[0]"></div>
                </div>
                <div className="absolute left-2/4 top-2/4 grid h-auto w-[38.0281690141%] -translate-x-2/4 -translate-y-2/4 transform">
                  <picture className="-col-start-1 col-end-auto row-start-1 row-end-auto block max-w-full rounded-[20px] leading-[0]">
                    <img className="m-0 h-full w-full max-w-full scale-[1.75] rounded-[inherit] object-cover" src={`${getTroopHunterPublicUrl()}/images/placeholder/3040.png`}></img>
                  </picture>
                  <video className="rounded-inherit z-0 col-start-1 col-end-auto row-start-1 row-end-auto aspect-square h-full scale-[1.75] object-contain object-center sm:h-full sm:scale-[1.15] dark:hidden" src={`${getTroopHunterPublicUrl()}/videos/troophunter/light/call-mobile.mp4`} preload="none" loop controls={false} autoPlay muted playsInline></video>
                  <video className="rounded-inherit z-0 col-start-1 col-end-auto row-start-1 row-end-auto hidden aspect-square h-full scale-[1.75] object-contain object-center sm:h-full sm:scale-[1.15] dark:block" src={`${getTroopHunterPublicUrl()}/videos/troophunter/dark/call-mobile.mp4`} preload="none" loop controls={false} autoPlay muted playsInline></video>
                </div>
              </div>
              <div className="grid content-end md:absolute md:bottom-0 md:left-0 md:h-full md:w-full">
                <div className="grid p-[clamp(.75rem,.7936507937vw,.9975rem)_0_0] md:sticky md:bottom-0 md:p-[clamp(1.5rem,1.5873015873vw,1.995rem)_clamp(1.875rem,1.9841269841vw,2.49375rem)]">
                  <h3 className="order-1 m-0 text-[clamp(1rem,2.0833333333vw,1.33rem)] font-medium leading-[1.5] md:mb-0 md:mt-0 md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] md:text-[inherit]">Engage and Win Deals</h3>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkWithVideos;
