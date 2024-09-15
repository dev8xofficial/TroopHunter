import { EnvelopeIcon, PlayIcon } from '@heroicons/react/20/solid';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import Header from '../components/header/header';
import VideoModal from '../components/Modals/VideoModal';
import va from '@vercel/analytics';

export default function Home() {
  const [modalInfo, setModalInfo] = useState({ open: false, video: '' });
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <title>Abdul Rehman | Frontend Developer</title>
      </Head>
      <main className="relative min-h-screen overflow-x-hidden leading-relaxed">
        <VideoModal open={modalInfo.open} src={modalInfo.video} setOpen={setModalInfo} />
        <Header />
        <section className="flex min-h-[85vh] items-center sm:min-h-[70vh]">
          <div className="mx-auto w-full max-w-5xl grid-cols-7 px-8 sm:-mb-[6%] md:grid lg:px-6 2xl:max-w-6xl">
            <div className="col-span-2 mb-5 md:mb-0">
              <Image width={350} height={350} src="/abdul-rehman.jpg" alt="Abdul Rehman" className="w-40 rounded-full border-4 bg-gray-50 p-1 shadow sm:w-44 md:w-48 md:border-[6px] md:p-1.5 lg:w-[90%]" />
            </div>
            <div className="col-span-5 flex flex-col justify-center pl-2 lg:pl-2">
              <h1 className="mb-3 text-3xl font-bold md:text-4xl lg:mb-4 lg:text-5xl">
                I am Abdul Rehman <br /> Frontend Developer
              </h1>
              <p className="text-lg text-zinc-600 sm:pr-5">I build innovative and secure web applications using various programming languages and technologies such as HTML, CSS, JavaScript, React, and Next.js.</p>
            </div>
            {/* <div className="lg:w-[80%] sm:-mb-[15%]">
              <h1 className="text-3xl sm:text-[35px] text-zinc-800 leading-[1.1] font-semibold mb-4">
                I am Abdul Rehman, <br className="block sm:hidden" /> Full Stack
                Developer based in Pakistan
              </h1>
              <p className="text-zinc-600 text-lg mb-4">
                I build innovative and secure web applications using various
                programming languages and technologies such as HTML, CSS,
                JavaScript, React, Node.js, and MongoDB.
              </p>

              <button
                type="button"
                className="rounded-md bg-teal-600 py-2 px-4 text-sm transition font-semibold text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Projects
              </button>
            </div> */}
          </div>
        </section>
        <section className="-mx-16 hidden translate-y-[45%] transform justify-between space-x-8 lg:flex">
          <div className="rotate-[4deg] transform">
            <Image width={370} height={230} src="/project-0.png" className="h-full rounded-lg border object-cover object-center shadow-xl shadow-gray-200" alt="Project" />
          </div>

          <div className="-rotate-[4deg] transform">
            <Image width={370} height={230} src="/project-1.png" className="h-full rounded-lg border object-cover object-center shadow-xl shadow-gray-200" alt="Project" />
          </div>
          <div className="rotate-[4deg] transform">
            <Image width={370} height={230} src="/project-2.png" className="h-full rounded-lg border object-cover object-center shadow-xl shadow-gray-200" alt="Project" />
          </div>
          <div className="-rotate-[4deg] transform">
            <Image width={370} height={230} src="/project-3.png" className="h-full rounded-lg border object-cover object-center shadow-xl shadow-gray-200" alt="Project" />
          </div>
        </section>
        <section id="about" className="scroll-mt-8 bg-[#fafafa] pb-14 pt-14 sm:pb-20 sm:pt-20 md:pb-24 md:pt-24 lg:pt-44">
          <div className="mx-auto max-w-5xl px-8 2xl:max-w-6xl">
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">About Me</h2>
            <p className="mb-4 text-lg text-zinc-600 lg:text-[22px]" style={{ lineHeight: '1.5' }}>
              {"I'm"} a Frontend Developer with a passion for creating innovative web apps using modern tech like React, Next.js, TailwindCSS, Material UI. I collaborate with clients to bring their ideas to life and achieve their business goals.
            </p>
            <p className="text-lg text-zinc-600 lg:text-[22px]" style={{ lineHeight: '1.5' }}>
              {' '}
              I deliver high-quality work that exceeds expectations. {"Let's"} create a cutting-edge app that sets your business apart.
            </p>
          </div>
        </section>
        <section id="projects" className="scroll-mt-8 py-12 md:py-16 lg:py-20">
          <div className="mb-12 text-center md:mb-16">
            <div className="mb-2 inline-block h-1 w-16 rounded bg-teal-500"></div>
            <h2 className="text-3xl font-semibold md:text-4xl">Projects</h2>
          </div>
          <ParallaxProvider>
            <div className="mx-auto max-w-5xl space-y-20 px-8 sm:space-y-28 2xl:max-w-6xl">
              <Project title="THDC CRM" image="/project-0.png" video="/videos/crm.mp4" subtitle="React | TailwindCSS" description="I built the Total Health Dental Care personal CRM website for doctors, a customer relationship management system to manage patient data and appointments." />
              <Project reverse title="Honeydu" video="/videos/honeydu.mp4" image="/project-1.png" subtitle="HTML5 | TailwindCSS" description="I built the Honeydue web app UI, a powerful money management tool with an intuitive design and advanced features to help users send and receive money, generate invoices, and track their finances." />
              <Project title="Coral" image="/project-2.png" video="/videos/coral.mp4" subtitle="HTML5 | CSS3 | Sass | jQuery" description="I built the website for Coral, a consulting and development studio based in Los Angeles that specializes in building advanced internal systems, scalable consumer products, and robust fintech platforms for startups and industry veterans." />
              <Project
                reverse
                title="GoldenDao"
                video="/videos/golden-dao.mp4"
                image="/project-3.png"
                subtitle="React | TailwindCSS"
                description="I built the website for this project, which aimed to advance
                AAPI solidarity and empowerment through a collaborative
                community and DAO. My contribution included designing the
                layout, creating content, and overcoming challenges to
                ensure the website's functionality."
              />
            </div>
          </ParallaxProvider>
        </section>
        <section id="contact" className="scroll-mt-8 bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-8 2xl:max-w-6xl">
            <h2 className="flex items-center space-x-3 text-3xl font-semibold md:text-4xl">
              <span>Contact</span> <EnvelopeIcon className="w-7 md:w-8"></EnvelopeIcon>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Contact me via{' '}
              <Link href="https://www.linkedin.com/in/helloabdul" className="text-blue-500 hover:text-blue-600 hover:underline">
                LinkedIn
              </Link>{' '}
              or{' '}
              <Link className="text-blue-500 hover:text-blue-600 hover:underline" href="mailto:contact@helloabdul.com">
                email
              </Link>{' '}
              for any inquiries or project opportunities. I am eager to collaborate and help achieve our goals.
            </p>
          </div>
        </section>
        <footer className="border-t py-6">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between px-8 sm:flex-row 2xl:max-w-6xl">
            <p className="mb-3.5 text-gray-600 sm:mb-0">Copyright &copy; 2023 by Abdul Rehman.</p>
            <div>
              <ul className="flex space-x-6">
                <li>
                  <a href="https://www.facebook.com/rj.malik.96" className="p-0.5 text-xl transition hover:text-teal-600">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="text-xl hover:text-teal-600 p-0.5 transition"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-xl hover:text-teal-600 p-0.5 transition"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                </li> */}

                <li>
                  <a href="https://www.linkedin.com/in/helloabdul" className="p-0.5 text-xl transition hover:text-teal-600">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="mailto:contact@helloabdul.com" className="p-0.5 text-xl transition hover:text-teal-600">
                    <i className="fas fa-envelope"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

interface ProjectProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  reverse?: boolean;
  video: string;
}

const Project = ({ title, subtitle, description, image, reverse, video }: ProjectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}>
      <div className="md:w-[55%]">
        <Parallax speed={reverse ? -4 : 4}>
          <Image width={700} height={400} src={image} className="rounded-xl border border-gray-100 shadow-lg shadow-gray-100" alt="Project" />
        </Parallax>
      </div>
      <div className={`pt-6 md:w-[45%] md:pt-0 ${reverse ? 'md:pr-10' : 'md:pl-10'}`}>
        <p className="mb-1 text-sm font-medium">{subtitle}</p>
        <h3 className="mb-3 text-2xl font-semibold sm:text-[28px]">{title}</h3>
        <p className="mb-3 text-[17px] text-zinc-500">{description}</p>
        <button
          onClick={() => {
            setOpen(true);
            va.track(title);
          }}
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          <PlayIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Watch Video
        </button>
      </div>
      <VideoModal open={open} setOpen={setOpen} src={video} />
    </div>
  );
};
