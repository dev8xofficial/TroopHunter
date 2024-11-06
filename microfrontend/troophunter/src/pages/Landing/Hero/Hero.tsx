/* eslint-disable prettier/prettier */
import React from 'react';

const Hero: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="min-h-[60vh] content-center items-center grid px-[var(--container-gutter)] w-full lg:h-[80vh]">
        <h1 className="font-medium max-w-[clamp(22.5rem,46.875vw,29.925rem)] m-0 text-[clamp(3.125rem,6.5104166667vw,4.15625rem)] leading-[.92] text-[var(--theme-secondary)] lg:max-w-[clamp(68.75rem,72.7513227513vw,91.4375rem)] lg:py-[clamp(3.125rem,3.3068783069vw,4.15625rem)] lg:m-0 lg:text-[clamp(8.125rem,8.5978835979vw,10.80625rem)]">
          <span className="block lg:inline-block">Find Your</span> <span className="block lg:inline-block"> Next Client.</span> <span className="block lg:inline-block text-[var(--default-primary,--theme-secondary)]">In Seconds.</span>
        </h1>
      </div>
    </>
  );
};

export default Hero;
