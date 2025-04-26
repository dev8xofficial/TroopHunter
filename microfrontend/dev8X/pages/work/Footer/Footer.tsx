/* eslint-disable prettier/prettier */
import React from 'react';

const Footer: React.FC = (): JSX.Element => {
  return (
    <>
      <footer className="z-0 col-start-1 col-end-auto row-start-2 row-end-auto max-h-[100svh] transform bg-white text-[var(--theme-secondary)] transition-[color_.4s] dark:bg-charcoal-300">
        <div className="grid-template-areas-heading-columns-bottom-face relative z-0 mx-auto grid w-full max-w-[30rem] gap-[3.75rem] px-[var(--container-gutter)] pb-[6.25rem] pt-[3.875rem] md:max-w-full md:pb-[3.875rem] md:pt-[6.25rem] lg:max-w-none lg:gap-0 lg:p-[3.875rem_clamp(5rem,5.291005291vw,6.65rem)_clamp(3.875rem,4.1005291005vw,5.15375rem)]">
          <h2 className="col-start-[heading] col-end-[heading] row-start-[heading] row-end-[heading] m-0 mt-0 font-medium lg:mb-[clamp(6.25rem,6.6137566138vw,8.3125rem)] lg:w-min">
            <a className="flex transform list-inside list-none list-image-[initial] flex-wrap items-center gap-x-[.3125rem] self-start text-[2.5rem] leading-[1] text-[inherit] transition-[color_.15s] hover:text-[var(--theme-primary)] lg:gap-x-[clamp(.3125rem,.3306878307vw,.415625rem)] lg:p-[clamp(2.25rem,2.380952381vw,2.9925rem)_0] lg:text-[clamp(4.375rem,4.6296296296vw,5.81875rem)]" target="" href="/signin">
              <span>Let’s find </span>
              <br />
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" strokeWidth="0.5" viewBox="0 0 14 13" className="var-w-14 var-h-13 block h-[.65em] min-h-0 w-auto min-w-0 translate-y-[10%] transform stroke-1 text-[var(--theme-primary)] transition-[color_.4s,transform_.15s] lg:stroke-2 ">
                <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vectorEffect="non-scaling-stroke"></path>
              </svg>
              <span className="w-full lg:whitespace-nowrap">
                your next{' '}
                <span className="inline-grid">
                  <span className="-col-start-1 col-end-auto row-start-1 row-end-auto">client! </span>
                </span>
              </span>
            </a>
          </h2>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="289" height="311" fill="none" viewBox="0 0 289 311" className="block min-h-0 min-w-0 w-auto h-[3.87rem] justify-self-center self-center transform transition-[color_.4s] text-[var(--theme-primary)] row-start-[face] col-start-[face] row-end-[face] col-end-[face] var-w-289 var-h-311 lg:hidden">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M137.188 169.585c15.584 0 28.264-12.681 28.264-28.265V56.528C165.452 25.358 190.81 0 221.981 0c31.17 0 56.528 25.358 56.528 56.528h-28.264c0-15.584-12.681-28.264-28.264-28.264-15.584 0-28.264 12.68-28.264 28.264v84.792c0 31.171-25.358 56.529-56.529 56.529-31.17 0-56.528-25.358-56.528-56.529h28.264c0 15.584 12.681 28.265 28.264 28.265Zm122.764-.002h28.264c0 77.925-63.396 141.321-141.321 141.321V282.64c62.339 0 113.057-50.716 113.057-113.057ZM19.986 4.137 0 24.123l32.404 32.405L0 88.93l19.986 19.986 32.405-32.402 32.401 32.402 19.986-19.986-32.404-32.402 32.404-32.404L84.792 4.137 52.391 36.542 19.986 4.137Z"
              clipRule="evenodd"
            ></path>
          </svg> */}
          {/* <div className="grid-cols-[repeat(2,1fr)] justify-items-start gap-[3.125rem] leading-[1.5294117647] text-[1rem] pointer-events-none self-center mt-[clamp(1rem,1.0582010582vw,1.33rem)] grid row-start-[columns] col-start-[columns] row-end-[columns] col-end-[columns] lg:mb-[clamp(5.625rem,5.9523809524vw,7.48125rem)] xl:text-[clamp(1.0625rem,1.1243386243vw,1.413125rem)] xl:gap-[clamp(1.875rem,1.9841269841vw,2.49375rem)_clamp(4.375rem,4.6296296296vw,5.81875rem)] xl:justify-self-start xl:col-start-1 xl:col-end-2 xl:grid-cols-3 2xl:grid-cols-[repeat(4,auto)]">
            <div className="pointer-events-auto">
              <h3 className="text-[inherit] leading-[inherit] mb-[.125rem] mt-0">Speak to us</h3>
              <a className="bg-transparent transform transition-[text-decoration_.2s_ease-in-out,-webkit-text-decoration_.2s_ease-in-out] decoration-transparent text-[inherit] block" href="tel:1800%20486%20226">
                1800 486 226
              </a>
              <a className="bg-transparent transform transition-[text-decoration_.2s_ease-in-out,-webkit-text-decoration_.2s_ease-in-out] decoration-transparent text-[inherit] block" href="mailto:support@troophunter.com">
                support@troophunter.com
              </a>
            </div>
            <div className="pointer-events-auto xl:max-2xl:row-start-2 xl:max-2xl:row-end-2">
              <h3 className="text-[inherit] leading-[inherit] mb-[.125rem] mt-0">Perth</h3>
              <address className="opacity-50 not-italic whitespace-pre-line">470 William St, Perth, WA 6000</address>
            </div>
            <div className="pointer-events-auto xl:max-2xl:row-start-2 xl:max-2xl:row-end-2">
              <h3 className="text-[inherit] leading-[inherit] mb-[.125rem] mt-0">Melbourne</h3>
              <address className="opacity-50 not-italic whitespace-pre-line">23/10-20 Gwynne St, Cremorne, VIC 3121</address>
            </div>
            <div className="pointer-events-auto xl:max-2xl:row-start-2 xl:max-2xl:row-end-2">
              <h3 className="text-[inherit] leading-[inherit] mb-[.125rem] mt-0">Sydney</h3>
              <address className="opacity-50 not-italic whitespace-pre-line">35/285A Crown St, Surry Hills, NSW 2010</address>
            </div>
          </div> */}
          <div className="col-start-[bottom] col-end-[bottom] row-start-[bottom] row-end-[bottom] mt-[clamp(.5rem,.5291005291vw,.665rem)] flex transform flex-col items-center gap-[1.875rem] border-t border-[var(--theme-primary)] pt-[3.75rem] text-[clamp(.8125rem,.8597883598vw,1.080625rem)] transition-[border-color_.4s] lg:mt-0 lg:flex-row lg:gap-[clamp(2.875rem,3.0423280423vw,3.82375rem)] lg:p-[clamp(1.875rem,1.9841269841vw,2.49375rem)_0] dark:border-charcoal-100">
            <div className="flex items-center gap-[clamp(1rem,1.0582010582vw,1.33rem)]">
              <img className="mx-auto h-5" src={`${process.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo/logo.svg`} alt="TroopHunter" />
              <span className="text-[var(--theme-secondary)] opacity-50 dark:text-gray-300">
                © 2024{' '}
                <a href="" className="text-inherit underline  dark:text-gray-300">
                  Privacy
                </a>
              </span>
            </div>
            <div className="FooterSimpleContents_footer-acknowledgement__67wsz">
              <div>
                <button className="Button_button-wrapper__2Ps4h">
                  <span className="Button_button__lQZdm Button_button--bg-transparent__4_NCr dark:text-gray-300">Acknowledgement of Country</span>
                </button>
              </div>
            </div>
            <ul className="m-0 flex list-inside list-none list-image-[initial] gap-[clamp(.5rem,.5291005291vw,.665rem)] p-0 text-[clamp(.8125rem,.8597883598vw,1.080625rem)] lg:ml-auto">
              <li className="flex items-center gap-[inherit]">
                <a className="m-0 inline-block list-inside list-none list-image-[initial] appearance-none border-none bg-none p-0 text-[inherit]" target="_blank" href="">
                  <span className="var-text-icon-background-color relative flex transform cursor-pointer items-center gap-[.5em] whitespace-pre rounded-[6.25rem] bg-[var(--background-color,--theme-secondary)] p-[.6666666667em_.8em] font-medium leading-[1] text-[var(--text-color,#fff)] no-underline transition-[color_.15s,background_.15s]  dark:text-gray-400">
                    <span>
                      <s>Twitter</s> X
                    </span>
                  </span>
                </a>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" fill="none" viewBox="0 0 13 14" className="var-w-13 var-h-14  dark:text-gray-400">
                  <path fill="currentColor" fillRule="evenodd" d="M7.121.87H5.874v4.123L2.96 2.078l-.882.882 2.92 2.919H.864v1.247h4.133l-2.919 2.919.882.882 2.913-2.913v4.122h1.247V8.004l2.923 2.923.882-.882-2.919-2.919h4.125V5.88H8.009l2.919-2.919-.882-.882-2.925 2.925V.869Z" clipRule="evenodd"></path>
                </svg>
              </li>
              <li className="flex items-center gap-[inherit]">
                <a className="m-0 inline-block list-inside list-none list-image-[initial] appearance-none border-none bg-none p-0 text-[inherit]" target="_blank" href="">
                  <span className="var-text-icon-background-color relative flex transform cursor-pointer items-center gap-[.5em] whitespace-pre rounded-[6.25rem] bg-[var(--background-color,--theme-secondary)] p-[.6666666667em_.8em] font-medium leading-[1] text-[var(--text-color,#fff)] no-underline transition-[color_.15s,background_.15s] dark:text-gray-400">
                    <span>Instagram</span>
                  </span>
                </a>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" fill="none" viewBox="0 0 13 14" className="var-w-13 var-h-14 dark:text-gray-400">
                  <path fill="currentColor" fillRule="evenodd" d="M7.121.87H5.874v4.123L2.96 2.078l-.882.882 2.92 2.919H.864v1.247h4.133l-2.919 2.919.882.882 2.913-2.913v4.122h1.247V8.004l2.923 2.923.882-.882-2.919-2.919h4.125V5.88H8.009l2.919-2.919-.882-.882-2.925 2.925V.869Z" clipRule="evenodd"></path>
                </svg>
              </li>
              <li className="flex items-center gap-[inherit]">
                <a className="m-0 inline-block list-inside list-none list-image-[initial] appearance-none border-none bg-none p-0 text-[inherit]" target="_blank" href="">
                  <span className="var-text-icon-background-color relative flex transform cursor-pointer items-center gap-[.5em] whitespace-pre rounded-[6.25rem] bg-[var(--background-color,--theme-secondary)] p-[.6666666667em_.8em] font-medium leading-[1] text-[var(--text-color,#fff)] no-underline transition-[color_.15s,background_.15s] dark:text-gray-400">
                    <span>LinkedIn</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
