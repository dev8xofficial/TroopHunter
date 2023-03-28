import { EnvelopeIcon, PlayIcon } from "@heroicons/react/20/solid";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Header from "../components/header/header";
import VideoModal from "../components/Modals/VideoModal";

export default function Home() {
  const [modalInfo, setModalInfo] = useState({ open: false, video: "" });
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
          integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <title>Abdul Rehman | Frontend Developer</title>
      </Head>
      <main className="relative leading-relaxed min-h-screen overflow-x-hidden">
        <VideoModal
          open={modalInfo.open}
          video={modalInfo.video}
          setOpen={setModalInfo}
        />
        <Header />
        <section className="min-h-[85vh] sm:min-h-[70vh] flex items-center">
          <div className="max-w-5xl 2xl:max-w-6xl w-full px-8 lg:px-6 mx-auto md:grid grid-cols-7 sm:-mb-[6%]">
            <div className="col-span-2 mb-5 md:mb-0">
              <Image
                width={350}
                height={350}
                src="/abdul-rehman.jpg"
                alt="Abdul Rehman"
                className="rounded-full border-4 md:border-[6px] p-1 md:p-1.5 bg-gray-50 shadow w-40 sm:w-44 md:w-48 lg:w-[90%]"
              />
            </div>
            <div className="col-span-5 pl-2 lg:pl-2 flex flex-col justify-center">
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-3 lg:mb-4">
                I am Abdul Rehman <br /> Frontend Developer
              </h1>
              <p className="text-zinc-600 text-lg sm:pr-5">
                I build innovative and secure web applications using various
                programming languages and technologies such as HTML, CSS,
                JavaScript, React, and Next.js.
              </p>
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
        <section className="justify-between hidden lg:flex space-x-8 transform translate-y-[45%] -mx-16">
          <div className="transform rotate-[4deg]">
            <Image
              width={370}
              height={230}
              src="/project-0.png"
              className="rounded-lg shadow-gray-200 shadow-xl h-full border object-cover object-center"
              alt="Project"
            />
          </div>

          <div className="transform -rotate-[4deg]">
            <Image
              width={370}
              height={230}
              src="/project-1.png"
              className="rounded-lg shadow-gray-200 shadow-xl h-full border object-cover object-center"
              alt="Project"
            />
          </div>
          <div className="transform rotate-[4deg]">
            <Image
              width={370}
              height={230}
              src="/project-2.png"
              className="rounded-lg shadow-gray-200 shadow-xl h-full border object-cover object-center"
              alt="Project"
            />
          </div>
          <div className="transform -rotate-[4deg]">
            <Image
              width={370}
              height={230}
              src="/project-3.png"
              className="rounded-lg shadow-gray-200 shadow-xl h-full border object-cover object-center"
              alt="Project"
            />
          </div>
        </section>
        <section
          id="about"
          className="pt-14 bg-[#fafafa] pb-14 sm:pb-20 sm:pt-20 md:pt-24 md:pb-24 lg:pt-44 scroll-mt-8"
        >
          <div className="max-w-5xl 2xl:max-w-6xl px-8 mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              About Me
            </h2>
            <p
              className="text-lg lg:text-[22px] text-zinc-600 mb-4"
              style={{ lineHeight: "1.5" }}
            >
              {"I'm"} a Frontend Developer with a passion for creating
              innovative web apps using modern tech like React, Next.js,
              TailwindCSS, Material UI. I collaborate with clients to bring
              their ideas to life and achieve their business goals.
            </p>
            <p
              className="text-lg lg:text-[22px] text-zinc-600"
              style={{ lineHeight: "1.5" }}
            >
              {" "}
              I deliver high-quality work that exceeds expectations. {
                "Let's"
              }{" "}
              create a cutting-edge app that sets your business apart.
            </p>
          </div>
        </section>
        <section id="projects" className="py-12 md:py-16 lg:py-20 scroll-mt-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block w-16 mb-2 h-1 rounded bg-teal-500"></div>
            <h2 className="text-3xl md:text-4xl font-semibold">Projects</h2>
          </div>
          <ParallaxProvider scrollAxis="vertical">
            <div className="max-w-5xl 2xl:max-w-6xl px-8 mx-auto space-y-20 sm:space-y-28">
              <Project
                title="THDC CRM"
                image="/project-0.png"
                video="/videos/crm.mp4"
                subtitle="React | TailwindCSS"
                description="I built the Total Health Dental Care personal CRM website for doctors, a customer relationship management system to manage patient data and appointments."
              />
              <Project
                reverse
                title="Honeydu"
                video="/videos/honeydu.mp4"
                image="/project-1.png"
                subtitle="HTML5 | TailwindCSS"
                description="I built the Honeydue web app UI, a powerful money management tool with an intuitive design and advanced features to help users send and receive money, generate invoices, and track their finances."
              />
              <Project
                title="Coral"
                image="/project-2.png"
                video="/videos/coral.mp4"
                subtitle="HTML5 | CSS3 | Sass | jQuery"
                description="I built the website for Coral, a consulting and development studio based in Los Angeles that specializes in building advanced internal systems, scalable consumer products, and robust fintech platforms for startups and industry veterans."
              />
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
        <section id="contact" className="py-16 sm:py-20 bg-gray-50 scroll-mt-8">
          <div className="max-w-5xl 2xl:max-w-6xl px-8 mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold flex items-center space-x-3">
              <span>Contact</span>{" "}
              <EnvelopeIcon className="w-7 md:w-8"></EnvelopeIcon>
            </h2>
            <p className="text-gray-600 text-lg mt-4">
              Contact me via{" "}
              <Link
                href="https://www.linkedin.com/in/helloabdul"
                className="text-blue-500 hover:text-blue-600 hover:underline"
              >
                LinkedIn
              </Link>{" "}
              or{" "}
              <Link
                className="text-blue-500 hover:text-blue-600 hover:underline"
                href="mailto:contact@helloabdul.com"
              >
                email
              </Link>{" "}
              for any inquiries or project opportunities. I am eager to
              collaborate and help achieve our goals.
            </p>
          </div>
        </section>
        <footer className="border-t py-6">
          <div className="max-w-5xl 2xl:max-w-6xl px-8 mx-auto flex flex-col items-center sm:flex-row justify-between">
            <p className="text-gray-600 mb-3.5 sm:mb-0">
              Copyright &copy; 2023 by Abdul Rehman.
            </p>
            <div>
              <ul class="flex space-x-6">
                <li>
                  <a
                    href="https://www.facebook.com/rj.malik.96"
                    class="text-xl hover:text-teal-600 p-0.5 transition"
                  >
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#"
                    class="text-xl hover:text-teal-600 p-0.5 transition"
                  >
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-xl hover:text-teal-600 p-0.5 transition"
                  >
                    <i class="fab fa-twitter"></i>
                  </a>
                </li> */}

                <li>
                  <a
                    href="https://www.linkedin.com/in/helloabdul"
                    class="text-xl hover:text-teal-600 p-0.5 transition"
                  >
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@helloabdul.com"
                    class="text-xl hover:text-teal-600 p-0.5 transition"
                  >
                    <i class="fas fa-envelope"></i>
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

const Project = ({ title, subtitle, description, image, reverse, video }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center`}
    >
      <div className="md:w-[55%]">
        <Parallax speed={reverse ? -4 : 4}>
          <Image
            width={700}
            height={400}
            src={image}
            className="rounded-xl shadow-lg shadow-gray-100 border border-gray-100"
            alt="Project"
          />
        </Parallax>
      </div>
      <div
        className={`md:w-[45%] pt-6 md:pt-0 ${
          reverse ? "md:pr-10" : "md:pl-10"
        }`}
      >
        <p className="text-sm font-medium mb-1">{subtitle}</p>
        <h3 className="text-2xl sm:text-[28px] font-semibold mb-3">{title}</h3>
        <p className="text-zinc-500 text-[17px] mb-3">{description}</p>
        <button
          onClick={() => {
            setOpen(true);
          }}
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-teal-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          <PlayIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Watch Video
        </button>
      </div>
      <VideoModal open={open} setOpen={setOpen} src={video} />
    </div>
  );
};
