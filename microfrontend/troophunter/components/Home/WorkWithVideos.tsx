import React from 'react';

const WorkWithVideos: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="text-[var(--theme-secondary)] m-[2.5rem_0] gap-[3.125rem] grid w-full mx-auto px-[var(--container-gutter)] max-w-[calc(clamp(89.5rem,94.708994709vw,119.035rem)+var(--container-gutter)*2)] !-mt-[50vh] md:gap-[clamp(1.875rem,1.9841269841vw,2.49375rem)] lg:m-[clamp(4.375rem,4.6296296296vw,5.81875rem)_auto]">
        <div className="auto-cols-fr gap-[inherit] grid grid-template-areas-a">
          <div className="w-full aspect-x-710 aspect-y-1250 sm:aspect-x-1452 sm:aspect-y-890">
            <div className="bg-transparent rounded-[clamp(1.25rem,1.3227513228vw,1.6625rem)] text-[inherit] no-underline relative w-full block lg:rounded-[clamp(1.875rem,1.9841269841vw,2.49375rem)]">
              <div className="relative overflow-hidden grid rounded-[inherit] pt-[calc(var(--aspect-y)/var(--aspect-x)*100%)]">
                <div className="w-full h-full left-0 top-2/4 absolute transform -translate-y-2/4">
                  <div className="w-full h-full leading-[0] block rounded-2xl bg-[#dcf5f2]"></div>
                </div>

                <div className="h-auto grid transform -translate-y-2/4 -translate-x-2/4 left-2/4 top-2/4 absolute w-[38.0281690141%] sm:w-[69.4214876033%] sm:items-center">
                  <picture className="max-w-full leading-[0] block rounded-2xl row-start-1 -col-start-1 row-end-auto col-end-auto px-1 sm:absolute">
                    <img className="max-w-full m-0 object-cover w-full h-full rounded-[inherit] hidden sm:block" src="/images/placeholder/1080.png" alt="Product Overview" />
                    <img className="max-w-full m-0 object-cover w-full h-full rounded-[inherit] sm:hidden" src="/images/placeholder/3040.png" alt="Product Overview" />
                  </picture>
                  <video className="rounded-inherit z-0 aspect-square row-start-1 col-start-1 row-end-auto col-end-auto w-auto object-center object-contain hidden sm:block sm:dark:hidden" src="/videos/troophunter/light/search.mp4" preload="none" loop controls={false} autoPlay muted playsInline></video>
                  <video className="rounded-inherit z-0 aspect-square row-start-1 col-start-1 row-end-auto col-end-auto w-auto object-center object-contain hidden sm:dark:block" src="/videos/troophunter/dark/search.mp4" preload="none" loop controls={false} autoPlay muted playsInline></video>
                  <video className="rounded-inherit z-0 aspect-square row-start-1 col-start-1 row-end-auto col-end-auto h-full scale-[1.75] sm:h-auto sm:scale-[1] object-center object-contain dark:hidden sm:!hidden" src="/videos/troophunter/light/search-mobile.mp4" preload="none" loop controls={false} autoPlay muted playsInline></video>
                  <video className="rounded-inherit z-0 aspect-square row-start-1 col-start-1 row-end-auto col-end-auto h-full scale-[1.75] sm:h-auto sm:scale-[1] object-center object-contain hidden dark:block sm:!hidden" src="/videos/troophunter/dark/search-mobile.mp4" preload="none" loop controls={false} autoPlay muted playsInline></video>
                </div>
              </div>
              <div className="grid content-end md:h-full md:w-full md:left-0 md:bottom-0 md:absolute">
                <div className="grid p-[clamp(.75rem,.7936507937vw,.9975rem)_0_0] md:bottom-0 md:sticky md:p-[clamp(1.5rem,1.5873015873vw,1.995rem)_clamp(1.875rem,1.9841269841vw,2.49375rem)]">
                  <h3 className="text-[clamp(1rem,2.0833333333vw,1.33rem)] font-medium leading-[1.5] m-0 order-1 md:text-[inherit] md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] md:mt-0 md:mb-0">Find Businesses Quickly</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="auto-cols-fr gap-[inherit] grid grid-template-areas-a-b">
          <div className="w-full aspect-x-710 aspect-y-1250 sm:aspect-y-890">
            <div className="bg-transparent rounded-[clamp(1.25rem,1.3227513228vw,1.6625rem)] text-[inherit] no-underline relative w-full block lg:rounded-[clamp(1.875rem,1.9841269841vw,2.49375rem)]">
              <div className="relative overflow-hidden grid rounded-[inherit] pt-[calc(var(--aspect-y)/var(--aspect-x)*100%)]">
                <div className="w-full h-full left-0 top-2/4 absolute transform -translate-y-2/4">
                  <div className="w-full h-full leading-[0] block rounded-2xl bg-[#efe3ff]"></div>
                </div>
                <div className="h-auto grid transform -translate-y-2/4 -translate-x-2/4 left-2/4 top-2/4 absolute w-[38.0281690141%]">
                  <picture className="max-w-full leading-[0] block rounded-[20px] row-start-1 -col-start-1 row-end-auto col-end-auto">
                    <img className="max-w-full m-0 object-cover w-full h-full scale-[1.75] rounded-[inherit]" src="/images/placeholder/3040.png" alt="Placeholder" />
                  </picture>
                  <video className="rounded-inherit z-0 aspect-square row-start-1 col-start-1 row-end-auto col-end-auto h-full scale-[1.75] sm:h-full sm:scale-[1.15] object-center object-contain dark:hidden" src="/videos/troophunter/light/sort-mobile.mp4" preload="none" loop controls={false} autoPlay muted playsInline></video>
                  <video className="rounded-inherit z-0 aspect-square row-start-1 col-start-1 row-end-auto col-end-auto h-full scale-[1.75] sm:h-full sm:scale-[1.15] object-center object-contain hidden dark:block" src="/videos/troophunter/dark/sort-mobile.mp4" preload="none" loop controls={false} autoPlay muted playsInline></video>
                </div>
              </div>
              <div className="grid content-end md:h-full md:w-full md:left-0 md:bottom-0 md:absolute">
                <div className="grid p-[clamp(.75rem,.7936507937vw,.9975rem)_0_0] md:bottom-0 md:sticky md:p-[clamp(1.5rem,1.5873015873vw,1.995rem)_clamp(1.875rem,1.9841269841vw,2.49375rem)]">
                  <h3 className="text-[clamp(1rem,2.0833333333vw,1.33rem)] font-medium leading-[1.5] m-0 order-1 md:text-[inherit] md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] md:mt-0 md:mb-0">Sort and Refine Your Leads</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full aspect-x-710 aspect-y-1250 sm:aspect-y-890">
            <div className="bg-transparent rounded-[clamp(1.25rem,1.3227513228vw,1.6625rem)] text-[inherit] no-underline relative w-full block lg:rounded-[clamp(1.875rem,1.9841269841vw,2.49375rem)]">
              <div className="relative overflow-hidden grid rounded-[inherit] pt-[calc(var(--aspect-y)/var(--aspect-x)*100%)]">
                <div className="w-full h-full left-0 top-2/4 absolute transform -translate-y-2/4">
                  <div className="w-full h-full leading-[0] block rounded-2xl bg-[#d8e7ee]"></div>
                </div>
                <div className="h-auto grid transform -translate-y-2/4 -translate-x-2/4 left-2/4 top-2/4 absolute w-[38.0281690141%]">
                  <picture className="max-w-full leading-[0] block rounded-[20px] row-start-1 -col-start-1 row-end-auto col-end-auto">
                    <img className="max-w-full m-0 object-cover w-full h-full scale-[1.75] rounded-[inherit]" src="/images/placeholder/3040.png" alt="Placeholder" />
                  </picture>
                  <video className="rounded-inherit z-0 aspect-square row-start-1 col-start-1 row-end-auto col-end-auto h-full scale-[1.75] sm:h-full sm:scale-[1.15] object-center object-contain dark:hidden" src="/videos/troophunter/light/call-mobile.mp4" preload="none" loop controls={false} autoPlay muted playsInline></video>
                  <video className="rounded-inherit z-0 aspect-square row-start-1 col-start-1 row-end-auto col-end-auto h-full scale-[1.75] sm:h-full sm:scale-[1.15] object-center object-contain hidden dark:block" src="/videos/troophunter/dark/call-mobile.mp4" preload="none" loop controls={false} autoPlay muted playsInline></video>
                </div>
              </div>
              <div className="grid content-end md:h-full md:w-full md:left-0 md:bottom-0 md:absolute">
                <div className="grid p-[clamp(.75rem,.7936507937vw,.9975rem)_0_0] md:bottom-0 md:sticky md:p-[clamp(1.5rem,1.5873015873vw,1.995rem)_clamp(1.875rem,1.9841269841vw,2.49375rem)]">
                  <h3 className="text-[clamp(1rem,2.0833333333vw,1.33rem)] font-medium leading-[1.5] m-0 order-1 md:text-[inherit] md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] md:mt-0 md:mb-0">Engage and Win Deals</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkWithVideos;
