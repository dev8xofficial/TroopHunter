import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import React from 'react';

const TestimonialsLarge: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="m-[clamp(7.5rem,15.625vw,9.975rem)_auto] w-auto box-content pb-[50vh] content-center items-center grid-template-areas-heading-columns grid text-white px-[var(--container-gutter)] max-w-[calc(clamp(89.5rem,94.708994709vw,119.035rem)+var(--container-gutter)*2)] lg:my-[clamp(17.5rem,18.5185185185vw,23.275rem)] lg:h-auto">
        <h2 className="font-medium mt-0 mb-[clamp(5rem,10.4166666667vw,6.65rem)] text-[clamp(2.1875rem,4.5572916667vw,2.909375rem)] leading-[1] mx-auto max-w-[clamp(78.75rem,83.3333333333vw,104.7375rem)] text-center text-white lg:mb-[clamp(7.5rem,7.9365079365vw,9.975rem)] lg:text-[clamp(6.25rem,6.6137566138vw,8.3125rem)]">We create, enhance, and deliver top-notch lead generation solutions for innovative businesses.</h2>

        <div className="w-full grid-cols-[repeat(1,1fr)] justify-items-center gap-[3.125rem] leading-[1.5294117647] text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] pointer-events-none self-center mt-[clamp(1rem,1.0582010582vw,1.33rem)] grid row-start-[columns] col-start-[columns] row-end-[columns] col-end-[columns] sm:grid-cols-[repeat(2,1fr)] lg:mb-[clamp(5.625rem,5.9523809524vw,7.48125rem)] xl:gap-[clamp(1.875rem,1.9841269841vw,2.49375rem)_clamp(4.375rem,4.6296296296vw,5.81875rem)] xl:col-start-1 xl:col-end-2 xl:grid-cols-3 2xl:grid-cols-[repeat(4,auto)]">
          <div className="pointer-events-auto xl:max-2xl:row-start-2 xl:max-2xl:row-end-2">
            <h3 className="text-[inherit] leading-[inherit] mb-[.125rem] mt-0 flex items-center">
              <CheckBadgeIcon className="w-8 mr-3 lg:w-10 lg:mr-5" /> Zero Manual Research Needed
            </h3>
          </div>
          <div className="pointer-events-auto xl:max-2xl:row-start-2 xl:max-2xl:row-end-2">
            <h3 className="text-[inherit] leading-[inherit] mb-[.125rem] mt-0 flex items-center">
              <CheckBadgeIcon className="w-8 mr-3 lg:w-10 lg:mr-5" /> Complete Version with All Features
            </h3>
          </div>
          <div className="pointer-events-auto xl:max-2xl:row-start-2 xl:max-2xl:row-end-2">
            <h3 className="text-[inherit] leading-[inherit] mb-[.125rem] mt-0 flex items-center">
              <CheckBadgeIcon className="w-8 mr-3 lg:w-10 lg:mr-5" /> No Marketing Expertise Required
            </h3>
          </div>
          <div className="pointer-events-auto xl:max-2xl:row-start-2 xl:max-2xl:row-end-2">
            <h3 className="text-[inherit] leading-[inherit] mb-[.125rem] mt-0 flex items-center">
              <CheckBadgeIcon className="w-8 mr-3 lg:w-10 lg:mr-5" /> No Tech Skills Required
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialsLarge;
