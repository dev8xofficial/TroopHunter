import React from 'react';

const Footer: React.FC = (): JSX.Element => {
  return (
    <>
      <footer className="bg-white z-0 max-h-[100svh] transform transition-[color_.4s] text-[var(--theme-secondary)] col-start-1 col-end-auto row-start-2 row-end-auto">
        <div className="z-0 relative pb-[6.25rem] pt-[3.875rem] gap-[3.75rem] grid-template-areas-heading-columns-bottom-face grid mx-auto max-w-[30rem] px-[var(--container-gutter)] w-full md:pb-[3.875rem] md:pt-[6.25rem] md:max-w-full lg:p-[3.875rem_clamp(5rem,5.291005291vw,6.65rem)_clamp(3.875rem,4.1005291005vw,5.15375rem)] lg:max-w-none lg:gap-0">
          <h2 className="font-medium m-0 row-start-[heading] col-start-[heading] row-end-[heading] col-end-[heading] mt-0 lg:w-min lg:mb-[clamp(6.25rem,6.6137566138vw,8.3125rem)]">
            <a className="transform transition-[color_.15s] text-[2.5rem] gap-x-[.3125rem] leading-[1] text-[inherit] self-start items-center flex-wrap flex list-none list-image-[initial] list-inside hover:text-[var(--theme-primary)] lg:p-[clamp(2.25rem,2.380952381vw,2.9925rem)_0] lg:text-[clamp(4.375rem,4.6296296296vw,5.81875rem)] lg:gap-x-[clamp(.3125rem,.3306878307vw,.415625rem)]" target="_tab" href="https://www.app.troophunter.com">
              <span>Let’s find </span>
              <br />
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" strokeWidth="0.5" viewBox="0 0 14 13" className="block min-h-0 min-w-0 stroke-1 transform translate-y-[10%] h-[.65em] transition-[color_.4s,transform_.15s] text-[var(--theme-primary)] w-auto var-w-14 var-h-13 lg:stroke-2 ">
                <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vectorEffect="non-scaling-stroke"></path>
              </svg>
              <span className="w-full lg:whitespace-nowrap">
                your next{' '}
                <span className="inline-grid">
                  <span className="row-start-1 -col-start-1 row-end-auto col-end-auto">client! </span>
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
          {/* <div className="grid-cols-[repeat(2,1fr)] justify-items-start gap-[3.125rem] leading-[1.5294117647] text-[1rem] pointer-events-none self-center mt-[clamp(1rem,1.0582010582vw,1.33rem)] grid row-start-[columns] col-start-[columns] row-end-[columns] col-end-[columns] lg:mb-[clamp(5.625rem,5.9523809524vw,7.48125rem)]">
            <div className="pointer-events-auto">
              <h3 className="text-[inherit] leading-[inherit] mb-[.125rem] mt-0">Speak to us</h3>
              <a className="bg-transparent transform transition-[text-decoration_.2s_ease-in-out,-webkit-text-decoration_.2s_ease-in-out] decoration-transparent text-[inherit] block" href="tel:1800%20486%20226">
                1800 486 226
              </a>
              <a className="bg-transparent transform transition-[text-decoration_.2s_ease-in-out,-webkit-text-decoration_.2s_ease-in-out] decoration-transparent text-[inherit] block" href="mailto:support@troophunter.com">
                support@troophunter.com
              </a>
            </div>
            <div className="pointer-events-auto">
              <h3 className="text-[inherit] leading-[inherit] mb-[.125rem] mt-0">Perth</h3>
              <address className="opacity-50 not-italic">470 William St, Perth, WA 6000</address>
            </div>
            <div className="pointer-events-auto">
              <h3 className="text-[inherit] leading-[inherit] mb-[.125rem] mt-0">Melbourne</h3>
              <address className="opacity-50 not-italic">23/10-20 Gwynne St, Cremorne, VIC 3121</address>
            </div>
            <div className="pointer-events-auto">
              <h3 className="text-[inherit] leading-[inherit] mb-[.125rem] mt-0">Sydney</h3>
              <address className="opacity-50 not-italic">35/285A Crown St, Surry Hills, NSW 2010</address>
            </div>
          </div> */}
          <div className="pt-[3.75rem] text-[clamp(.8125rem,.8597883598vw,1.080625rem)] gap-[1.875rem] items-center flex-col flex transform transition-[border-color_.4s] border-t border-[var(--theme-primary)] mt-[clamp(.5rem,.5291005291vw,.665rem)] row-start-[bottom] col-start-[bottom] row-end-[bottom] col-end-[bottom] lg:gap-[clamp(2.875rem,3.0423280423vw,3.82375rem)] lg:p-[clamp(1.875rem,1.9841269841vw,2.49375rem)_0] lg:flex-row lg:mt-0">
            <div className="gap-[clamp(1rem,1.0582010582vw,1.33rem)] items-center flex">
              <img className="mx-auto h-5" src="https://www.troophunter.com/troophunter.svg" alt="TroopHunter" />
              <span className="opacity-50 text-[var(--theme-secondary)]">
                © 2024{' '}
                <a href="" className="text-inherit underline">
                  Privacy
                </a>
              </span>
            </div>
            <div className="FooterSimpleContents_footer-acknowledgement__67wsz">
              <div>
                <button className="Button_button-wrapper__2Ps4h">
                  <span className="Button_button__lQZdm Button_button--bg-transparent__4_NCr">Acknowledgement of Country</span>
                </button>
              </div>
            </div>
            <ul className="gap-[clamp(.5rem,.5291005291vw,.665rem)] p-0 m-0 list-none list-image-[initial] list-inside flex text-[clamp(.8125rem,.8597883598vw,1.080625rem)] lg:ml-auto">
              <li className="gap-[inherit] items-center flex">
                <a className="bg-none appearance-none p-0 m-0 border-none text-[inherit] list-none list-image-[initial] list-inside inline-block" target="_blank" href="">
                  <span className="relative cursor-pointer transform transition-[color_.15s,background_.15s] whitespace-pre no-underline rounded-[6.25rem] text-[var(--text-color,#fff)] bg-[var(--background-color,--theme-secondary)] font-medium leading-[1] p-[.6666666667em_.8em] gap-[.5em] items-center flex var-text-icon-background-color">
                    <span>
                      <s>Twitter</s> X
                    </span>
                  </span>
                </a>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" fill="none" viewBox="0 0 13 14" className="var-w-13 var-h-14">
                  <path fill="currentColor" fillRule="evenodd" d="M7.121.87H5.874v4.123L2.96 2.078l-.882.882 2.92 2.919H.864v1.247h4.133l-2.919 2.919.882.882 2.913-2.913v4.122h1.247V8.004l2.923 2.923.882-.882-2.919-2.919h4.125V5.88H8.009l2.919-2.919-.882-.882-2.925 2.925V.869Z" clipRule="evenodd"></path>
                </svg>
              </li>
              <li className="gap-[inherit] items-center flex">
                <a className="bg-none appearance-none p-0 m-0 border-none text-[inherit] list-none list-image-[initial] list-inside inline-block" target="_blank" href="">
                  <span className="relative cursor-pointer transform transition-[color_.15s,background_.15s] whitespace-pre no-underline rounded-[6.25rem] text-[var(--text-color,#fff)] bg-[var(--background-color,--theme-secondary)] font-medium leading-[1] p-[.6666666667em_.8em] gap-[.5em] items-center flex var-text-icon-background-color">
                    <span>Instagram</span>
                  </span>
                </a>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" fill="none" viewBox="0 0 13 14" className="var-w-13 var-h-14">
                  <path fill="currentColor" fillRule="evenodd" d="M7.121.87H5.874v4.123L2.96 2.078l-.882.882 2.92 2.919H.864v1.247h4.133l-2.919 2.919.882.882 2.913-2.913v4.122h1.247V8.004l2.923 2.923.882-.882-2.919-2.919h4.125V5.88H8.009l2.919-2.919-.882-.882-2.925 2.925V.869Z" clipRule="evenodd"></path>
                </svg>
              </li>
              <li className="gap-[inherit] items-center flex">
                <a className="bg-none appearance-none p-0 m-0 border-none text-[inherit] list-none list-image-[initial] list-inside inline-block" target="_blank" href="">
                  <span className="relative cursor-pointer transform transition-[color_.15s,background_.15s] whitespace-pre no-underline rounded-[6.25rem] text-[var(--text-color,#fff)] bg-[var(--background-color,--theme-secondary)] font-medium leading-[1] p-[.6666666667em_.8em] gap-[.5em] items-center flex var-text-icon-background-color">
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
