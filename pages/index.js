import { EnvelopeIcon } from "@heroicons/react/20/solid";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header/header";

export default function Home() {
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
        <title>Abdul Rehman | Full Stack Developer</title>
      </Head>
      <main className="relative leading-relaxed min-h-screen overflow-x-hidden">
        <Header />
        <section className="h-[75vh] sm:h-[70vh] flex items-center">
          <div className="max-w-4xl 2xl:max-w-5xl w-full px-8 lg:px-0 mx-auto">
            <div className="md:w-[80%] sm:-mb-[15%]">
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
            </div>
          </div>
        </section>
        <section className="grid-cols-4 hidden lg:grid space-x-8 transform translate-y-[45%] -mx-16">
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
        <section className="bg-teal-50 pt-16 pb-16 sm:pb-20 sm:pt-20 md:pt-24 md:pb-24 lg:pt-44">
          <div className="max-w-4xl 2xl:max-w-5xl w-full px-8 lg:px-0 mx-auto mb-20">
            <p
              className="text-xl md:text-2xl text-zinc-800 font-medium"
              style={{ lineHeight: "1.5" }}
            >
              {"I'm"} a Full Stack Developer with a passion for creating
              innovative web apps using modern tech like React, Next.js,
              Node.js, Express, and MongoDB. I collaborate with clients to bring
              their ideas to life and achieve their business goals. I deliver
              high-quality work that exceeds expectations. {"Let's"} create a
              cutting-edge app that sets your business apart.
            </p>
          </div>

          <div className="max-w-4xl 2xl:max-w-5xl w-full px-8 lg:px-0 mx-auto space-y-28">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-[55%]">
                <Image
                  width={700}
                  height={400}
                  src="/project-0.png"
                  className="rounded-xl shadow-xl shadow-gray-200"
                  alt="Project"
                />
              </div>
              <div className="md:w-[45%] pt-6 md:pt-0 md:pl-10">
                <p className="text-sm font-medium mb-1">React | TailwindCSS</p>
                <h2 className="text-2xl sm:text-3xl font-medium mb-3">
                  THDC CRM
                </h2>
                <p className="text-zinc-500">
                  Total Health Dental Care personal CRM project for doctors is a
                  customer relationship management system designed to help
                  dentists manage their patient data and appointments.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-[55%]">
                <Image
                  width={700}
                  height={400}
                  src="/project-1.png"
                  className="rounded-xl shadow-xl shadow-gray-200"
                  alt="Project"
                />
              </div>
              <div className="md:w-[45%] pt-6 md:pt-0 md:pr-10">
                <p className="text-sm font-medium mb-1">HTML5 | TailwindCSS</p>
                <h2 className="text-2xl sm:text-3xl font-medium mb-3">
                  Honeydu
                </h2>
                <p className="text-zinc-500">
                  Experience the power of seamless money management with
                  Honeydue. With its intuitive design and advanced features, you
                  can easily send and receive money from anyone, generate
                  invoices, and stay on top of your finances.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-[55%]">
                <Image
                  width={700}
                  height={400}
                  src="/project-2.png"
                  className="rounded-xl shadow-xl shadow-gray-200"
                  alt="Project"
                />
              </div>
              <div className="md:w-[45%] pt-6 md:pt-0 md:pl-10">
                <p className="text-sm font-medium mb-1">
                  HTML5 | CSS3 | Sass | jQuery
                </p>
                <h2 className="text-2xl sm:text-3xl font-medium mb-3">Coral</h2>
                <p className="text-zinc-500">
                  Coral is a consulting & development studio based in los
                  angeles. They lead & build advanced internal systems,
                  scaleable consumer products and robust fintech platforms for
                  startups and industry veterans.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl 2xl:max-w-5xl w-full px-8 lg:px-0 mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium flex items-center space-x-3">
              <span>Contact</span>{" "}
              <EnvelopeIcon className="w-7 md:w-8"></EnvelopeIcon>
            </h2>
            <p className="text-gray-600 text-lg mt-4">
              Contact me via{" "}
              <Link
                href="#"
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
          <div className="max-w-4xl 2xl:max-w-5xl w-full px-8 lg:px-0 mx-auto flex flex-col items-center sm:flex-row justify-between">
            <p className="text-gray-600 mb-3.5 sm:mb-0">
              Copyright &copy; 2023 by Abdul Rehman.
            </p>
            <div>
              <ul class="flex space-x-6">
                <li>
                  <a
                    href="#"
                    class="text-xl hover:text-teal-600 p-0.5 transition"
                  >
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
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
                </li>

                <li>
                  <a
                    href="#"
                    class="text-xl hover:text-teal-600 p-0.5 transition"
                  >
                    <i class="fab fa-linkedin-in"></i>
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
