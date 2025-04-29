/* eslint-disable prettier/prettier */
import React from 'react';

type WorkVideo = {
  title: string;
  bgColor: string;
  video: any;
};

type WorkProps = {
  headVideo: WorkVideo[];
};

const WorkWithVideos: React.FC<WorkProps> = ({ headVideo }): JSX.Element => {
  return (
    <>
      <div className="m-[2.5rem_0] mt-0 gap-[3.125rem] grid w-full mx-auto px-[var(--container-gutter)] max-w-[calc(clamp(89.5rem,94.708994709vw,119.035rem)+var(--container-gutter)*2)] md:gap-[clamp(1.875rem,1.9841269841vw,2.49375rem)] lg:m-[clamp(4.375rem,4.6296296296vw,5.81875rem)_0] lg:mt-0">
        {headVideo.map((item, index) => (
          <div className="auto-cols-fr gap-[inherit] grid grid-template-areas-a" key={index}>
            <div className="w-full aspect-x-1452 aspect-y-890">
              <a className="bg-transparent rounded-[clamp(1.25rem,1.3227513228vw,1.6625rem)] text-[inherit] no-underline relative w-full block lg:rounded-[clamp(1.875rem,1.9841269841vw,2.49375rem)]">
                <div className="relative overflow-hidden grid rounded-[inherit] pt-[calc(var(--aspect-y)/var(--aspect-x)*100%)]">
                  <div className="w-full h-full left-0 top-2/4 absolute transform -translate-y-2/4">
                    <div className={`w-full h-full leading-[0] block rounded-2xl bg-[${item.bgColor}]`}></div>
                  </div>

                  <div className="h-auto grid transform -translate-y-2/4 -translate-x-2/4 left-2/4 top-2/4 absolute w-[69.4214876033%] items-center">{item.video}</div>
                </div>
                <div className="grid content-end md:h-full md:w-full md:left-0 md:bottom-0 md:absolute">
                  <div className="grid p-[clamp(.75rem,.7936507937vw,.9975rem)_0_0] md:bottom-0 md:sticky md:p-[clamp(1.5rem,1.5873015873vw,1.995rem)_clamp(1.875rem,1.9841269841vw,2.49375rem)]">
                    <h3 className="text-[clamp(1rem,2.0833333333vw,1.33rem)] font-medium leading-[1.5] m-0 order-1 md:text-[inherit] md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] md:mt-0 md:mb-0">{item.title}</h3>
                  </div>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkWithVideos;
