import { title } from 'process';
import React from 'react';
type mainContent = {
  link: string;
  start: string;
  svgIcon: React.ReactNode;
  end: string;
};

type footerContent = {
  logo: {
    src: string;
    alt?: string;
  };
  privacy: {
    text: string;
    href: string;
  };
  button?: {
    text: string;
  };
};

type socialLinks = {
  title: string | React.ReactNode;
  href: string;
  icon?: React.ReactNode;
};

type FooterProps = {
  mainContent: mainContent;
  footerContent: footerContent;
  socialLinks: socialLinks[];
};

export const Footer: React.FC<FooterProps> = ({ mainContent, footerContent, socialLinks }): JSX.Element => {
  return (
    <>
      <footer className="bg-white z-0 max-h-[100svh] transform transition-[color_.4s] text-[var(--theme-secondary)] col-start-1 col-end-auto row-start-2 row-end-auto">
        <div className="z-0 relative pb-[6.25rem] pt-[3.875rem] gap-[3.75rem] grid-template-areas-heading-columns-bottom-face grid mx-auto max-w-[30rem] px-[var(--container-gutter)] w-full md:pb-[3.875rem] md:pt-[6.25rem] md:max-w-full lg:p-[3.875rem_clamp(5rem,5.291005291vw,6.65rem)_clamp(3.875rem,4.1005291005vw,5.15375rem)] lg:max-w-none lg:gap-0">
          <h2 className="font-medium m-0 row-start-[heading] col-start-[heading] row-end-[heading] col-end-[heading] mt-0 lg:w-min lg:mb-[clamp(6.25rem,6.6137566138vw,8.3125rem)]">
            <a className="transform transition-[color_.15s] text-[2.5rem] gap-x-[.3125rem] leading-[1] text-[inherit] self-start items-center flex-wrap flex list-none list-image-[initial] list-inside hover:text-[var(--theme-primary)] lg:p-[clamp(2.25rem,2.380952381vw,2.9925rem)_0] lg:text-[clamp(4.375rem,4.6296296296vw,5.81875rem)] lg:gap-x-[clamp(.3125rem,.3306878307vw,.415625rem)]" target="_tab" href={mainContent.link}>
              <span>{mainContent.start}</span>
              <br />
              {mainContent.svgIcon}
              <span className="w-full lg:whitespace-nowrap">
                {mainContent.end.split('client!')[0]}
                <span className="inline-grid">
                  <span className="row-start-1 -col-start-1 row-end-auto col-end-auto">client!</span>
                </span>
              </span>
            </a>
          </h2>
          <div className="pt-[3.75rem] text-[clamp(.8125rem,.8597883598vw,1.080625rem)] gap-[1.875rem] items-center flex-col flex transform transition-[border-color_.4s] border-t border-[var(--theme-primary)] mt-[clamp(.5rem,.5291005291vw,.665rem)] row-start-[bottom] col-start-[bottom] row-end-[bottom] col-end-[bottom] lg:gap-[clamp(2.875rem,3.0423280423vw,3.82375rem)] lg:p-[clamp(1.875rem,1.9841269841vw,2.49375rem)_0] lg:flex-row lg:mt-0">
            <div className="gap-[clamp(1rem,1.0582010582vw,1.33rem)] items-center flex">
              <img className="mx-auto h-5" src={footerContent.logo.src} alt={footerContent.logo.alt} />
              <span className="opacity-50 text-[var(--theme-secondary)]">
                © 2024{' '}
                <a href={footerContent.privacy.href} className="text-inherit underline">
                  {footerContent.privacy.text}
                </a>
              </span>
            </div>

            <div className="FooterSimpleContents_footer-acknowledgement__67wsz">
              <div>
                <button className="Button_button-wrapper__2Ps4h">
                  <span className="Button_button__lQZdm Button_button--bg-transparent__4_NCr">{footerContent.button.text}</span>
                </button>
              </div>
            </div>

            <ul className="gap-[clamp(.5rem,.5291005291vw,.665rem)] p-0 m-0 list-none list-image-[initial] list-inside flex text-[clamp(.8125rem,.8597883598vw,1.080625rem)] lg:ml-auto">
              {socialLinks.map((item, index) => (
                <li key={index} className="gap-[inherit] items-center flex">
                  <a className="bg-none appearance-none p-0 m-0 border-none text-[inherit] list-none list-image-[initial] list-inside inline-block" target="_blank" href={item.href}>
                    <span className="relative cursor-pointer transform transition-[color_.15s,background_.15s] whitespace-pre no-underline rounded-[6.25rem] text-[var(--text-color,#fff)] bg-[var(--background-color,--theme-secondary)] font-medium leading-[1] p-[.6666666667em_.8em] gap-[.5em] items-center flex var-text-icon-background-color">
                      <span>{item.title}</span>
                    </span>
                  </a>
                  {item.icon && item.icon}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

