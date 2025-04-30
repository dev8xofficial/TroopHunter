/* eslint-disable prettier/prettier */
import React from 'react';

const Hero: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="fixed inset-0 z-[100] h-[160vh] w-full  lg:h-[200vh]">
        <div className=" py-[1.875rem] h-full w-full mx-auto px-[var(--container-gutter)] max-w-[calc(clamp(60.625rem,64.1534391534vw,80.63125rem)+var(--container-gutter)*2)] flex-col flex md:pt-0 md:pb-[clamp(3.75rem,3.9682539683vw,4.9875rem)]">
          <h1 className="text-[clamp(2.5rem,5.2083333333vw,3.325rem)] leading-[.9] text-[#b488f1] m-[0_0_clamp(3.25rem,3.4391534392vw,4.3225rem)] mt-0 font-medium lg:text-[clamp(6.25rem,6.6137566138vw,8.3125rem)] lg:pt-56">Let's get started.</h1>

          <form className="grid-template-columns-repeat-2-auto-1fr text-[clamp(1rem,1.0582010582vw,1.33rem)] gap-[clamp(3.125rem,3.3068783069vw,4.15625rem)_clamp(1.25rem,1.3227513228vw,1.6625rem)] items-start grid">
            <div className="col-span-full">
              <p className="m-0 text-[#12032a] text-inherit font-bold">Fill in the blanks and we'll respond in one business day.</p>
              <p className="m-0 opacity-50 block mt-[.5em]">Just want to chat? Call or email, we're a nice bunch.</p>
            </div>

            <div className="md:col-span-1 col-span-full items-start grid">
              <div>
                <label className="text-[#12032a] text-inherit font-semibold">
                  What's your name?
                  <span className="text-[#f05644]">*</span>
                </label>
              </div>
              <div className="relative">
                <input className="rounded-none appearance-none text-[rgba(18,3,42,.7)] border-b-[1px] py-[1em] px-0 w-full transition-all duration-300 focus:border-[#b488f1]  focus:outline-none" type="text" name="name" placeholder="Your name here" />
              </div>
            </div>

            <div className="md:col-span-1 col-span-full items-start grid">
              <div>
                <label className="text-[#12032a] text-inherit font-bold">
                  Name of your company / organisation? <span className="text-[#f05644]">*</span>
                </label>
              </div>
              <div className="relative">
                <input className="rounded-none appearance-none text-[rgba(18,3,42,.7)] border-b-[1px] py-[1em] px-0 w-full  duration-300 focus:border-[#b488f1]  focus:outline-none" type="text" name="company" placeholder="Widgets, Inc" />
              </div>
            </div>

            <div className="md:col-span-1 col-span-full items-start grid">
              <div>
                <span className="text-[#12032a] text-inherit font-bold">
                  How shall we contact you?
                  <span className="text-[#f05644]">*</span>
                </span>
              </div>
              <div className="grid-cols-2 text-[clamp(1rem,1.0582010582vw,1.33rem)] gap-[clamp(3.125rem,3.3068783069vw,4.15625rem)_clamp(1.25rem,1.3227513228vw,1.6625rem)] grid items-start">
                <div className="md:col-span-1 col-span-full items-start grid">
                  <div>
                    <label className="text-[#12032a] text-inherit font-bold w-[1px] absolute p-0 overflow-hidden my-[-1px] mx-[-1px] h-[1px] border-0">
                      Phone Number
                      <span className="text-[#f05644]">*</span>
                    </label>
                  </div>
                  <div className="relative">
                    <input className="rounded-none appearance-none text-[rgba(18,3,42,.7)] border-b-[1px] py-[1em] px-0 w-full  duration-300 focus:border-[#b488f1]  focus:outline-none" type="tel" name="phone" placeholder="Phone Number" />
                  </div>
                </div>

                <div className="md:col-span-1 col-span-full items-start grid">
                  <label className="text-[#12032a] text-inherit font-bold w-[1px] absolute p-0 overflow-hidden my-[-1px] mx-[-1px] h-[1px] border-0">
                    Email Address
                    <span className="text-[#f05644]">*</span>
                  </label>
                  <div className="relative">
                    <input className="rounded-none appearance-none text-[rgba(18,3,42,.7)] border-b-[1px] py-[1em] px-0 w-full duration-300 focus:border-[#b488f1] focus:outline-none" type="email" name="email" placeholder="Email Address" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-full grid items-start">
              <div>
                <label className="text-[#12032a] text-inherit font-medium">Tell us about the project</label>
                <span className="mt-[1em] opacity-50 block">Need a new Website? An App? Let us know how we can help.</span>
              </div>
              <textarea className="mt-[1em] resize-none rounded-[clamp(.625rem,.6613756614vw,.83125rem)] appearance-none text-[rgba(18,3,42,.7)] p-[0.8rem] w-full border border-gray-300 border-solid  duration-300 focus:border-[#b488f1] focus:outline-none"></textarea>
            </div>

            <div className="col-span-full grid items-start">
              <div>
                <label htmlFor="referral" className="text-[#12032a] text-inherit font-bold">
                  How did you hear about us?
                </label>
              </div>
              <div className="relative">
                <input id="referral" className="rounded-none appearance-none text-[rgba(18,3,42,.7) border-b-[1px] py-[1em] px-0 w-full duration-300 focus:border-[#b488f1] focus:outline-none  " type="text" name="referral" placeholder="From a friend? From Google?" />
              </div>
            </div>

            <div className="col-span-full grid">
              <button className="bg-none appearance-none p-0 border-none text-inherit bg-inherit no-underline inline-block">
                <span className="relative cursor-pointer rounded-full text-white bg-[#b488f1] font-bold gap-[.5em] flex px-[1.1em] py-[1.1em] text-[clamp(.9375rem,.9920634921vw,1.246875rem)] justify-center text-center">Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Hero;
