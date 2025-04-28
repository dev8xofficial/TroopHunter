/* eslint-disable prettier/prettier */
import React from 'react';
import Carousel from '../Carousel/Carousel';

const Hero: React.FC = (): JSX.Element => {
  return (
    <>
      <div>
        <div>
          <div className="relative grid">
            <h1 className="pt-[6vw] row-start-1 -col-start-1 row-end-auto col-end-auto z-[1] relative leading-[.82] text-[14.5502645503vw] max-w-[80.0925925926vw] text-blac m-0 px-[var(--container-gutter)] w-full mt-0 md:hidden">
              <span className="leading-[.82] text-[14.5502645503vw] text-black [transform:translate3d(0px,0%,0px)] whitespace-pre inline-block md:[clip-path:inset(0_0_100%)]">Digital</span>
              <span className="leading-[.82] text-[14.5502645503vw] text-black [transform:translate3d(0px,0%,0px)] whitespace-pre inline-block md:[clip-path:inset(0_0_100%)]">Products.</span>
              <span className="leading-[.82] text-[14.5502645503vw] text-black [transform:translate3d(0px,0%,0px)] whitespace-pre inline-block md:[clip-path:inset(0_0_100%)]">Human</span>
              <span className="leading-[.82] text-[14.5502645503vw] text-black [transform:translate3d(0px,0%,0px)] whitespace-pre inline-block md:[clip-path:inset(0_0_100%)]">Experiences.</span>
            </h1>

            {/* Desktop View */}
            <h1 className="pt-[6vw] row-start-1 -col-start-1 row-end-auto col-end-auto z-[1] relative leading-[.82] text-[14.5502645503vw] max-w-[80.0925925926vw] text-black m-0 box-content px-[var(--container-gutter)] w-full hidden mb-0 md:block">
              <span className="pt-[6vw] row-start-1 -col-start-1 row-end-auto col-end-auto z-[1] relative leading-[.82] text-[14.5502645503vw] max-w-[80.0925925926vw] text-black m-0 box-content px-[var(--container-gutter)] w-full">
                <span className="row-start-1 -col-start-1 row-end-auto col-end-auto z-[1] relative leading-[.82] text-[14.5502645503vw] max-w-[80.0925925926vw] text-black m-0 box-content w-full block">Digital</span>
                <span className="row-start-1 -col-start-1 row-end-auto col-end-auto z-[1] relative leading-[.82] text-[14.5502645503vw] max-w-[80.0925925926vw] text-black m-0 box-content w-full block">Products.</span>
                <span className="row-start-1 -col-start-1 row-end-auto col-end-auto z-[1] relative leading-[.82] text-[14.5502645503vw] max-w-[80.0925925926vw] text-black m-0 box-content w-full block">Human</span>
                <span className="row-start-1 -col-start-1 row-end-auto col-end-auto z-[1] relative leading-[.82] text-[14.5502645503vw] max-w-[80.0925925926vw] text-black m-0 box-content w-full block">Experiences.</span>
              </span>
            </h1>
          </div>

          <div className="w-full mx-auto px-[clamp(2.5rem,2.6455vw,3.325rem)] max-w-[calc(clamp(89.5rem,94.709vw,119.035rem)+var(--container-gutter)*2)]">
            <p className="mt-[10vw] mb-[5vw] text-[clamp(1.875rem,3.90625vw,2.49375rem)] z-[1] leading-[1] relative will-change-transform text-[#070035] w-full box-content md:mt-[10vw] md:mb-[5vw] lg:translate-custom lg:text-[clamp(2.5rem,5.2083333333vw,3.325rem)] 2xl:text-[clamp(3.75rem,3.9682539683vw,4.9875rem)]">
              <span className="text-[#8d7bf1]">Human experiences</span> are the foundation of everything we do - client relationships, team collaboration, and an unwavering focus on the end user. This philosophy is in our name, our core values, and underpins our approach to every engagement.
            </p>
          </div>

          <div>
            <div className="m-[clamp(6.25rem,13.0208333333vw,8.3125rem)_0] overflow-hidden lg:m-[clamp(15rem,15.873015873vw,19.95rem)_0]">
              <div className="rounded-[10px] gap-[clamp(.625rem,.6613756614vw,.83125rem)] max-w-fit relative flex lg:gap-[clamp(1.875rem,1.9841269841vw,2.49375rem)] lg:rounded-[30px]"></div>
              <Carousel />
            </div>
          </div>
        </div>

        <div>
          <div className="mt-[clamp(4rem,10vw,6rem)] lg:mt-[clamp(6rem,7vw,8rem)] gap-[5rem] lg:gap-[clamp(7.9375rem,8.3994708995vw,10.556875rem)] w-full px-[clamp(2.5rem,2.6455026455vw,3.325rem)] max-w-[calc(clamp(87.5rem,92.5925925926vw,116.375rem)+var(--container-gutter)*2)] text-[#070035] grid font-[500]">
            <h2 className="ml-2 text-[clamp(1.875rem,3.90625vw,2.49375rem)] lg:text-[clamp(2.5rem,5.2083333333vw,3.325rem)] 2xl:text-[clamp(3.75rem,3.9682539683vw,4.9875rem)] leading-[1] m-0">
              Our <span className="text-[#7360e4]">capabilities</span> are centred around our ability to deliver world-class websites and apps. We're 100% in-house and work end-to-end, ensuring each project is delivered to the highest standard.
            </h2>
            <div className="mx-auto text-[#070035] grid gap-[3.125rem] max-w-[clamp(68.125rem,72.0899470899vw,90.60625rem)] sm:grid-cols-2 sm:gap-[2rem_1.5rem] lg:grid-cols-3 lg:gap-[7rem] lg:justify-between mt-[-110px] ml-2">
              <section className="content-start gap-[2.125rem] grid opacity-100 translate-x-0">
                <h3 className="text-[clamp(1.5rem,1.5873015873vw,1.995rem)] m-0 mt-0 md:text-[clamp(1.875rem,1.9841269841vw,2.49375rem)] font-bold">Strategy & UX</h3>
                <ul className="text-[clamp(1.125rem,1.1904761905vw,1.49625rem)] gap-[.8em] grid list-none opacity-[.7] p-0 m-0 md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] font-bold">
                  <li>Digital Strategy</li>
                  <li>User Research</li>
                  <li>User Journey Mapping</li>
                  <li>Information Architecture</li>
                  <li>Wireframing</li>
                </ul>
              </section>

              <section className="content-start gap-[2.125rem] grid opacity-100 translate-x-0">
                <h3 className="text-[clamp(1.5rem,1.5873015873vw,1.995rem)] m-0 mt-0 md:text-[clamp(1.875rem,1.9841269841vw,2.49375rem)] font-bold">Design</h3>
                <ul className="text-[clamp(1.125rem,1.1904761905vw,1.49625rem)] gap-[.8em] grid list-none opacity-[.7] p-0 m-0 md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] font-bold">
                  <li>Interaction Design</li>
                  <li>User Interface Design</li>
                  <li>Design Systems</li>
                  <li>Prototyping & Animation</li>
                  <li>Accessibility</li>
                </ul>
              </section>

              <section className="content-start gap-[2.125rem] grid opacity-100 translate-x-0">
                <h3 className="text-[clamp(1.5rem,1.5873015873vw,1.995rem)] m-0 mt-0 md:text-[clamp(1.875rem,1.9841269841vw,2.49375rem)] font-bold">Development</h3>
                <ul className="text-[clamp(1.125rem,1.1904761905vw,1.49625rem)] gap-[.8em] grid list-none opacity-[.7] p-0 m-0 md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] font-bold">
                  <li>Websites</li>
                  <li>eCommerce</li>
                  <li>Web Applications</li>
                  <li>Mobile Apps (iOS & Android)</li>
                  <li>Platform Integrations</li>
                </ul>
              </section>

              <section className="content-start gap-[2.125rem] grid opacity-100 translate-x-0">
                <h3 className="text-[clamp(1.5rem,1.5873015873vw,1.995rem)] m-0 mt-0 md:text-[clamp(1.875rem,1.9841269841vw,2.49375rem)] font-bold">Technology</h3>
                <ul className="text-[clamp(1.125rem,1.1904761905vw,1.49625rem)] gap-[.8em] grid list-none opacity-[.7] p-0 m-0 md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] font-bold">
                  <li>Vue & React.js</li>
                  <li>Headless CMS</li>
                  <li>WordPress & WooCommerce</li>
                  <li>Laravel</li>
                  <li>Shopify</li>
                </ul>
              </section>

              <section className="content-start gap-[2.125rem] grid opacity-100 translate-x-0">
                <h3 className="text-[clamp(1.5rem,1.5873015873vw,1.995rem)] m-0 mt-0 md:text-[clamp(1.875rem,1.9841269841vw,2.49375rem)] font-bold">Optimisation</h3>
                <ul className="text-[clamp(1.125rem,1.1904761905vw,1.49625rem)] gap-[.8em] grid list-none opacity-[.7] p-0 m-0 md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] font-bold">
                  <li>Website Review</li>
                  <li>Performance Optimisation</li>
                  <li>Conversion Optimisation</li>
                  <li>A/B Testing</li>
                  <li>Ongoing Enhancements</li>
                </ul>
              </section>

              <section className="content-start gap-[2.125rem] grid opacity-100 translate-x-0">
                <h3 className="text-[clamp(1.5rem,1.5873015873vw,1.995rem)] m-0 mt-0 md:text-[clamp(1.875rem,1.9841269841vw,2.49375rem)] font-bold">Support</h3>
                <ul className="text-[clamp(1.125rem,1.1904761905vw,1.49625rem)] gap-[.8em] grid list-none opacity-[.7] p-0 m-0 md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] font-bold">
                  <li>Project Management</li>
                  <li>Website Hosting</li>
                  <li>Website Maintenance</li>
                  <li>Performance & Security</li>
                  <li>3rd Party Integrations</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
        <div className="w-full px-[clamp(2.5rem,2.6455vw,3.325rem)] max-w-[calc(clamp(87.5rem,92.5926vw,116.375rem)+var(--container-gutter)*2)] text-[#070035] grid mt-[clamp(8rem,9vw,10rem)] mb-[clamp(9.375rem,9.92vw,12.46875rem)] ml-1">
          <h2 className="text-[clamp(1.875rem,3.90625vw,2.49375rem)] leading-[1] max-w-[clamp(71.25rem,75.3968vw,94.7625rem)] lg:text-[clamp(2.5rem,5.2083vw,3.325rem)] 2xl:text-[clamp(3.75rem,3.9682vw,4.9875rem)] font-extrabold">
            <span className="inline-block whitespace-pre font-extrabold">
              <span className="inline-block">Above</span>
              <span className="inline-block"> </span>
            </span>
            <span className="inline-block whitespace-pre">
              <span className="inline-block">all,</span>
              <span className="inline-block"> </span>
            </span>
            <span className="inline-block whitespace-pre">
              <span className="inline-block">we</span>
              <span className="inline-block"> </span>
            </span>
            <span className="inline-block whitespace-pre">
              <span className="inline-block">believe</span>
              <span className="inline-block"> </span>
            </span>
            <span className="inline-block whitespace-pre">
              <span className="inline-block">in</span>
              <span className="inline-block"> </span>
            </span>
            <span className="inline-block whitespace-pre">
              <span className="inline-block">human</span>
              <span className="inline-block"> </span>
            </span>
            <span className="inline-block whitespace-pre">
              <span className="inline-block">relationships,</span>
              <span className="inline-block"> </span>
            </span>
            <span className="inline-block whitespace-pre">
              <span className="inline-block">exceptional</span>
              <span className="inline-block"> </span>
            </span>
            <span className="inline-block whitespace-pre">
              <span className="inline-block">outcomes,</span>
              <span className="inline-block"> </span>
            </span>
            <span className="inline-block whitespace-pre">
              <span className="inline-block">and</span>
              <span className="inline-block"> </span>
            </span>
            <span className="inline-block whitespace-pre">
              <span className="inline-block">having</span>
              <span className="inline-block"> </span>
            </span>
            <span className="inline-block whitespace-pre">
              <span className="inline-block">fun</span>
              <span className="inline-block"> </span>
            </span>
            <span className="inline-block whitespace-pre">
              <span className="inline-block">along</span>
              <span className="inline-block"> </span>
            </span>
            <span className="inline-block whitespace-pre">
              <span className="inline-block">the</span>
              <span className="inline-block"> </span>
            </span>
            <span className="inline-block whitespace-pre">
              <span className="inline-block">way.</span>
              <span className="inline-block"> </span>
            </span>
          </h2>
          <div className="text-[#070035] m-[clamp(6.25rem,6.6137566138vw,8.3125rem)_auto_clamp(9.375rem,9.9206349206vw,12.46875rem)] gap-[clamp(5rem,5.291005291vw,6.65rem)] max-w-[clamp(71.25rem,75.3968253968vw,94.7625rem)] mt-[110px] grid xl:gap-[clamp(11.25rem,11.9047619048vw,14.9625rem)] xl:grid-cols-[repeat(2,1fr)] xl:justify-between ml-2">
            <section className="text-[#070035] content-start gap-[clamp(2.125rem,2.2486772487vw,2.82625rem)] grid translate-x-0 opacity-100  mt-[-100px] ">
              <h3 className="text-[clamp(1.5rem,1.5873015873vw,1.995rem)] ml-0col-span-full md:text-[clamp(1.5rem,1.5873015873vw,1.995rem)] font-semibold">What we do</h3>
              <ul className="text-[#070035] text-[clamp(1.125rem,1.1904761905vw,1.49625rem)] gap-[.8em] grid list-none opacity-[.7] p-0 m-0 gap-x-[clamp(2.5rem, 2.6455026455vw, 3.325rem)] grid-cols-[1fr_1fr] justify-between sm:gap-x-[clamp(2.5rem,2.6455026455vw,3.325rem)] md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] lg:gap-x-[clamp(5rem,5.291005291vw,6.65rem)] lg:grid-cols-[1fr_1fr_1fr] xl:gap-x-[clamp(6.25rem,6.6137566138vw,8.3125rem)] xl:grid-cols-[auto_auto]">
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">World-class digital</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Expect creativity</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Celebrate success</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Obsess over detail</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Pub lunch Fridays</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Embrace change</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Unlock potential</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">High-five</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Outstanding service</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Value relationships</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Exceed expectations</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Party</li>
              </ul>
            </section>
            <section className="text-[#070035] content-start gap-[clamp(2.125rem,2.2486772487vw,2.82625rem)] grid translate-x-0 opacity-100  mt-[-100px]">
              <h3 className="text-[clamp(1.5rem,1.5873015873vw,1.995rem)] m-0 mt-0 col-span-full md:text-[clamp(1.5rem,1.5873015873vw,1.995rem)] font-semibold line-through">What we don't</h3>
              <ul className="text-[#070035] text-[clamp(1.125rem,1.1904761905vw,1.49625rem)] gap-[.8em] grid list-none opacity-[.7] p-0 m-0 gap-x-[clamp(2.5rem, 2.6455026455vw, 3.325rem)] grid-cols-[1fr_1fr] justify-between sm:gap-x-[clamp(2.5rem,2.6455026455vw,3.325rem)] md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] lg:gap-x-[clamp(5rem,5.291005291vw,6.65rem)] lg:grid-cols-[1fr_1fr_1fr] xl:gap-x-[clamp(6.25rem,6.6137566138vw,8.3125rem)] xl:grid-cols-[auto_auto]">
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] text-[#070035] font-medium">Work weekends</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Outsource</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Resist cake</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Lose at Mario Kart</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">‘Make it pop’</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Free pitches</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Sacrifice quality</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Egose</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Overpromise</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Cut corners</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Accept mediocrity</li>
                <li className="md:text-[clamp(1.25rem,1.3227513228vw,1.6625rem)]">Decaf</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
