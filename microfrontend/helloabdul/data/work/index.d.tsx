import { WorkDetail } from '@repo/components';
import { PageLayoutContent } from '@repo/components/src/Interfaces/PageLayout/PageLayout';
import { prefixed } from '../../utils/helpers';

const PageData: PageLayoutContent = {
  meta: {
    title: 'Our Work — Abdul | Abdul: World class digital products',
    description: 'World-class digital products, idea to execution.'
  },
  footerMainContent: {
    link: '/contact',
    start: 'Let’s make',
    end: 'something wonderful'
  },
  footerData: {
    global: {
      heading: 'I work globally',
      email: 'contact@helloabdul.com',
      buttonText: 'Hire me'
    },
    offices: [
      {
        country: 'Pakistan (HQ)',
        city: 'Lahore, Punjab',
        phone: '+92 (329) 294-7777'
      },
      {
        country: 'USA (Remote)',
        city: 'San Francisco, CA',
        phone: '+1 (321) 300-2393'
      }
    ],
    // careers: {
    //   heading: 'We’re Growing – Join Our Team',
    //   description: 'Let’s build the future, together.',
    //   link: '/careers',
    //   linkText: 'Explore Careers'
    // },
    copyright: {
      year: '2025',
      text: 'Privacy Policy',
      privacyLink: '/privacy'
    }
  },
  footerSocialLinks: [
    {
      title: 'LinkedIn',
      icon: { name: 'AsteriskIcon', size: 10 },
      href: 'https://www.linkedin.com/company/helloabdul/'
    },
    {
      title: 'Instagram',
      icon: { name: 'AsteriskIcon', size: 10 },
      href: 'https://www.instagram.com/dev8xofficial/'
    },
    {
      title: 'Facebook',
      // icon: { name: 'AsteriskIcon', size: 10 },
      href: 'https://www.facebook.com/profile.php?id=61569289660818'
    }
    // {
    //   title: 'Youtube',
    //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
    // }
  ]
};

export const WORK_PROJECTS: WorkDetail[] = [
  {
    slug: 'troophunter',
    title: 'TroopHunter',
    websiteUrl: 'https://troophunter.com',
    industry: 'Sales / Lead Generation',
    shortIntro: 'I led the development of **TroopHunter**, an automated lead generation platform that finds prospects quickly and accurately—no manual research needed.',
    overview: 'I handled full-stack development, creating **Next.js + TypeScript** dashboards and **Node.js microservices** with **PostgreSQL + Sequelize**, optimized for speed, responsiveness, and scalability.',
    approach: 'The UX focuses on intuitive workflows enhanced by **GSAP** and **Framer Motion**. **TurboRepo** monorepos ensure maintainable structure, while CI/CD pipelines use **Docker**, **Kubernetes**, **Terraform**, and **Ansible**.',
    impact: 'Users experience instant-loading dashboards with powerful filters. The system reduces lead discovery time drastically and improves accuracy across thousands of prospects.',
    keyContributions: [
      'Led frontend architecture with **Next.js & TypeScript**',
      'Implemented global state management with **Redux Thunk**',
      'Designed microinteractions using **GSAP** and **Framer Motion**',
      'Set up **TurboRepo** monorepo for scalable development',
      'Configured CI/CD pipelines with **Docker**, **Kubernetes**, **Terraform**, **Ansible**',
      'Built backend **Node.js** microservices with **Sequelize ORM**',
      'Integrated **authentication & authorization** flows',
      'Optimized dashboards for instant load and responsiveness',
      'Implemented automated testing and code quality enforcement',
      'Managed feature branching and pull request workflows via Git'
    ],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/troophunter/mobile/7.png'), prefixed('/api/images/work/troophunter/mobile/8.png'), prefixed('/api/images/work/troophunter/mobile/9.png'), prefixed('/api/images/work/troophunter/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/troophunter/1080.mp4'),
      sequences: [prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4')]
    },
    bgColor: 'blue',
    path: 'troophunter',
    testimonial: '“TroopHunter evolved into a precise, scalable lead-generation asset. Clear expertise and attention to detail ensured years of reliable growth.”',
    testimonialAuthor: 'Abdul Rehman',
    testimonialAuthorPosition: 'Founder & Lead Engineer'
  },
  {
    slug: 'totalhealthdentalcare',
    title: 'Total Health Dental Care',
    websiteUrl: 'https://www.totalhealthdentalcare.com',
    industry: 'Healthcare / Dental Services',
    shortIntro: 'I improved the **Total Health Dental Care** website, creating responsive, interactive, and performance-optimized pages for 15,000+ patients.',
    overview: 'I implemented **GSAP**, **ScrollTrigger**, and **TailwindCSS** for animations, responsive layouts, and performance optimization. Office pages leverage **Mapbox GL** for interactive location selection.',
    approach: 'The website ensures smooth scrolling, fast load times, and cross-browser compatibility. Images are optimized, and polyfills enhance accessibility across devices.',
    impact: 'Website traffic rose 20%, user engagement by 30%, and load times dropped 40%. Patients enjoy a visually engaging, intuitive experience.',
    keyContributions: ['Built responsive pages with **TailwindCSS**, **HTML5**, **CSS3**', 'Implemented scroll-based animations with **GSAP** and **ScrollTrigger**', 'Enhanced site performance via **ImagesLoaded** and polyfills', 'Integrated interactive **Mapbox GL** office locator', 'Optimized cross-browser and mobile compatibility', 'Improved UX with smooth scrolling and motion interactions', 'Created visually appealing and accessible web components', 'Reduced page load time by 40%', 'Increased user engagement by 30%', 'Boosted overall website traffic by 20%'],
    team: [
      { role: 'Project Manager', name: 'Devin Picciolini' },
      { role: 'Lead Software Engineer', name: 'Shan Asif' },
      { role: 'Software Engineer', name: 'Zubair Mahboob' },
      { role: 'Full-Stack Developer', name: 'Mohammed Musthafa' },
      { role: 'Back-End Developer', name: 'Mutasim Billah' }
    ],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/totalhealthdentalcare/mobile/7.png'), prefixed('/api/images/work/totalhealthdentalcare/mobile/8.png'), prefixed('/api/images/work/totalhealthdentalcare/mobile/9.png'), prefixed('/api/images/work/totalhealthdentalcare/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/totalhealthdentalcare.mp4'),
      sequences: [prefixed('/videos/work/totalhealthdentalcare/part-01-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-02-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-03-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-04-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-05-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-06-export.mp4')]
    },
    bgColor: 'cyan',
    path: 'totalhealthdentalcare',
    testimonial: '“Abdul turned our complex ideas into a clean, functional frontend without breaking a sweat. Highly recommend!”',
    testimonialAuthor: 'Sepand Hokmabadi',
    testimonialAuthorPosition: 'CEO, Total Health Dental Care'
  },
  {
    slug: 'scheduler',
    title: 'Scheduler',
    websiteUrl: 'https://schedule.totalhealthdentalcare.com',
    industry: 'Healthcare / Dental Service',
    shortIntro: 'I designed the **Scheduler** web app for **Total Health Dental Care**, simplifying appointment booking and improving patient convenience.',
    overview: 'The **React.js + TypeScript** scheduler integrates with the CRM and DentrixAscend. Patients select offices, book times, and make secure payments online.',
    approach: 'I implemented responsive, intuitive interfaces. Animations use **GSAP** for a smooth booking experience, with integrations for payment collection and office selection.',
    impact: 'Booking efficiency increased, travel costs decreased, and patient satisfaction improved. Staff workload decreased through automation, and revenue grew via better appointment management.',
    keyContributions: ['Created intuitive booking interface with **React.js** and **TypeScript**', 'Integrated CRM and **DentrixAscend** for seamless data sync', 'Implemented office selection and date/time pickers', 'Securely processed card payments for bookings', 'Used **GSAP** for smooth animations and microinteractions', 'Enhanced accessibility and mobile responsiveness', 'Streamlined patient registration flows', 'Reduced administrative work and improved operational efficiency', 'Optimized scheduling for speed and convenience', 'Enabled a 33% increase in hygiene re-appointments'],
    team: [
      { role: 'Project Manager', name: 'Devin Picciolini' },
      { role: 'Lead Software Engineer', name: 'Shan Asif' },
      { role: 'Software Engineer', name: 'Zubair Mahboob' },
      { role: 'Software Engineer', name: 'Arslan Kaleem' },
      { role: 'Mobile Application Developer', name: 'Mian Mudassir' },
      { role: 'Full-Stack Developer', name: 'Mohammed Musthafa' },
      { role: 'Back-End Developer', name: 'Mutasim Billah' }
    ],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/scheduler/mobile/7.png'), prefixed('/api/images/work/scheduler/mobile/8.png'), prefixed('/api/images/work/scheduler/mobile/9.png'), prefixed('/api/images/work/scheduler/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/scheduler.mp4'),
      sequences: [prefixed('/videos/work/scheduler/part-01-export.mp4'), prefixed('/videos/work/scheduler/part-02-export.mp4'), prefixed('/videos/work/scheduler/part-03-export.mp4'), prefixed('/videos/work/scheduler/part-04-export.mp4')]
    },
    bgColor: 'blue',
    path: 'scheduler',
    testimonial: '“Abdul turned our complex ideas into a clean, functional frontend without breaking a sweat. Highly recommend!”',
    testimonialAuthor: 'Sepand Hokmabadi',
    testimonialAuthorPosition: 'CEO, Total Health Dental Care'
  },
  {
    slug: 'honeydu',
    title: 'Honeydu',
    websiteUrl: 'https://www.honeydu.io',
    industry: 'Fintech',
    shortIntro: 'I developed **Honeydu**, a zero-fee payment and invoice app, simplifying money management for creators and freelancers.',
    overview: 'Using **React.js**, **TailwindCSS**, and **JavaScript**, I built intuitive dashboards for sending/receiving money, generating invoices, and tracking finances in real-time.',
    approach: 'I focused on a clean, mobile-first interface with reusable components and real-time updates, ensuring seamless financial management and user empowerment.',
    impact: 'Honeydu simplified transactions, reduced payment fees, and helped users manage finances efficiently, with an intuitive interface for freelancers and small businesses.',
    keyContributions: ['Designed responsive **React.js** + **TailwindCSS** interfaces', 'Enabled money transfer via email/phone number', 'Generated invoices and managed payments in-app', 'Provided real-time financial insights', 'Built reusable components for scalability', 'Optimized mobile-first experience', 'Enhanced UX for clarity and simplicity', 'Reduced reliance on traditional payment systems', 'Streamlined money management workflows', 'Empowered users to track finances efficiently'],
    team: [
      { role: 'Project Manager', name: 'Devin Picciolini' },
      { role: 'Lead Software Engineer', name: 'Shan Asif' },
      { role: 'Software Engineer', name: 'Zubair Mahboob' },
      { role: 'Back-End Developer', name: 'Mutasim Billah' }
    ],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [''],
    video: {
      originalFile: prefixed('/videos/work/honeydu.mp4'),
      sequences: [prefixed('/videos/work/honeydu/part-01-export.mp4'), prefixed('/videos/work/honeydu/part-02-export.mp4'), prefixed('/videos/work/honeydu/part-04-export.mp4'), prefixed('/videos/work/honeydu/part-03-export.mp4')]
    },
    bgColor: 'cyan',
    path: 'honeydu',
    testimonial: '“Working with Abdul felt like having a senior frontend engineer on our team, even remotely. Fast, precise, and fun!”',
    testimonialAuthor: 'Devin Picciolini',
    testimonialAuthorPosition: 'CEO, Coral'
  },
  {
    slug: 'coral',
    title: 'Coral',
    websiteUrl: 'https://www.coral.global',
    industry: 'Consulting & Venture Studio',
    shortIntro: 'I developed **Coral**’s responsive website and Web3 products, improving brand presence and engagement with modern UX and interactive elements.',
    overview: 'Built using **React.js**, **TailwindCSS**, and **SCSS**, integrating **GSAP** and **SmoothScroller** for enhanced interactions. Web3 components include membership and voting systems for **GoldenDAO**.',
    approach: 'I focused on responsive layouts, interactive animations, and smooth scrolling to increase engagement and provide a polished experience across devices.',
    impact: 'Website quality and brand engagement improved, launching Web3 platforms for community empowerment and fintech solutions.',
    keyContributions: ['Developed responsive UI with **HTML5**, **CSS3**, **SCSS**, **TailwindCSS**', 'Integrated **GSAP** and **SmoothScroller** for animations', 'Built **GoldenDAO** membership and voting features', 'Optimized UX for mobile-first interaction', 'Implemented Web3 functionalities for community engagement', 'Enhanced website aesthetics and performance', 'Collaborated on testing, debugging, and deployment', 'Improved site load time and responsiveness', 'Boosted brand presence through design consistency', 'Launched Web3 projects supporting community empowerment'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    team: [{ role: 'Project Manager', name: 'Devin Picciolini' }],
    images: [prefixed('/api/images/work/coral/mobile/7.png'), prefixed('/api/images/work/coral/mobile/8.png'), prefixed('/api/images/work/coral/mobile/9.png'), prefixed('/api/images/work/coral/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/coral.mp4'),
      sequences: [prefixed('/videos/work/coral/part-01-export.mp4'), prefixed('/videos/work/coral/part-02-export.mp4'), prefixed('/videos/work/coral/part-03-export.mp4'), prefixed('/videos/work/coral/part-04-export.mp4')]
    },
    bgColor: 'blue',
    path: 'coral',
    testimonial: '“Working with Abdul felt like having a senior frontend engineer on our team, even remotely. Fast, precise, and fun!”',
    testimonialAuthor: 'Devin Picciolini',
    testimonialAuthorPosition: 'CEO, Coral'
  },
  {
    slug: 'goldendao',
    title: 'Golden DAO',
    websiteUrl: 'https://www.goldendao.xyz',
    industry: 'Blockchain',
    shortIntro: 'I built **GoldenDAO**, a Web3 membership platform empowering AAPI communities with access-gated events and voting features.',
    overview: 'Using **React.js**, **Redux**, **TailwindCSS**, and **GSAP**, I created a responsive, interactive website with NFT-based membership controls and event participation features.',
    approach: 'Focus was on engagement and accessibility, integrating animations, responsive layouts, and blockchain interactions for a seamless Web3 experience.',
    impact: 'GoldenDAO launched successfully, advancing AAPI solidarity, offering exclusive benefits, and promoting member engagement in online and real-world events.',
    keyContributions: ['Implemented **React.js & Redux** architecture for responsive UI', 'Built NFT-gated access features', 'Integrated event registration and voting systems', 'Applied **GSAP** animations for microinteractions', 'Created responsive **HTML5 & TailwindCSS** layouts', 'Enabled community collaboration and engagement', 'Tested and maintained Web3 platform performance', 'Ensured security and accessibility across devices', 'Launched on schedule with full feature set', 'Supported AAPI empowerment through digital engagement'],
    team: [{ role: 'Project Manager', name: 'Devin Picciolini' }],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [''],
    video: {
      originalFile: prefixed('/videos/work/goldendao.mp4'),
      sequences: [prefixed('/videos/work/goldendao/part-01-export.mp4'), prefixed('/videos/work/goldendao/part-02-export.mp4'), prefixed('/videos/work/goldendao/part-03-export.mp4'), prefixed('/videos/work/goldendao/part-04-export.mp4'), prefixed('/videos/work/goldendao/part-05-export.mp4')]
    },
    bgColor: 'cyan',
    path: 'goldendao',
    testimonial: '“Working with Abdul felt like having a senior frontend engineer on our team, even remotely. Fast, precise, and fun!”',
    testimonialAuthor: 'Devin Picciolini',
    testimonialAuthorPosition: 'CEO, Coral'
  }
];

export default PageData;
