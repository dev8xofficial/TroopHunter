import { WorkDetail } from '@repo/components';
import { PageLayoutContent } from '@repo/components/src/Interfaces/PageLayout/PageLayout';
import { prefixed } from '../../utils/helpers';

const PageData: PageLayoutContent = {
  meta: {
    title: 'Our Work — Dev8X | Dev8X: World class digital products',
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
        country: 'USA',
        city: 'Orlando, Florida',
        phone: '+1 (321) 300-2393'
      },
      {
        country: 'Pakistan',
        city: 'Lahore, Punjab',
        phone: '+92 (329) 294-7777'
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
      icon: { name: 'AsteriskIcon', width: 10 },
      href: 'https://www.linkedin.com/company/helloabdul/'
    },
    {
      title: 'Instagram',
      icon: { name: 'AsteriskIcon', width: 10 },
      href: 'https://www.instagram.com/dev8xofficial/'
    },
    {
      title: 'Facebook',
      // icon: { name: 'AsteriskIcon', width: 10 },
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
    shortIntro: '**TroopHunter** is an **automated lead generation** platform for fast, accurate prospect discovery. No manual research or marketing skills needed.',
    overview: 'I led all executive and technical aspects. Built **Next.js**, **TypeScript** frontend, **Node.js** microservices, **PostgreSQL** with **Sequelize**, fast dashboards, scalable architecture.',
    approach: 'Focused on smooth UX, microinteractions (**GSAP**, **Framer Motion**), responsive design, Redux Thunk state, TurboRepo monorepo, Docker CI/CD, Kubernetes, Terraform, Ansible.',
    impact: 'Dashboards load instantly. Filters are intuitive. Workflows feel enjoyable, not tedious. Performance optimized end-to-end for speed and reliability.',
    keyContributions: ['**Next.js** & **TypeScript** frontend architecture', 'Redux Thunk state management', 'GSAP & Framer Motion microinteractions', 'TurboRepo monorepo setup', 'Docker CI/CD pipelines (**K8s**, Terraform, Ansible)', '**Node.js** & Express microservices', '**PostgreSQL** ORM via **Sequelize**', 'Authentication & authorization flows', 'ESLint, Prettier, CI/CD code quality automation', 'Git feature branching & PR workflow'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/troophunter/mobile/7.png'), prefixed('/api/images/work/troophunter/mobile/8.png'), prefixed('/api/images/work/troophunter/mobile/9.png'), prefixed('/api/images/work/troophunter/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/troophunter/1080.mp4'),
      sequences: [prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4')]
    },
    bgColor: 'blue',
    path: 'troophunter',
    testimonial: 'Working with Abdul made TroopHunter feel alive: fast, polished, fun—and code stays rock solid.',
    testimonialAuthor: 'Abdul Rehman',
    testimonialAuthorPosition: 'Founder & Lead Engineer'
  },
  {
    slug: 'totalhealthdentalcare',
    title: 'Total Health Dental Care',
    websiteUrl: 'https://www.totalhealthdentalcare.com',
    industry: 'Healthcare / Dental Services',
    shortIntro: '**Digital-first dental care** serving 15,000+ patients with fast, modern **React.js + TypeScript** apps and smooth interfaces across devices.',
    overview: 'Built **React.js + TypeScript** frontend, structured **monorepo**, integrated **RESTful APIs**, and shipped robust **Dockerized CI/CD pipelines** for reliable workflows.',
    approach: 'Optimized every module for **speed, maintainability, and reliability** using **Redux Thunk, ESLint, TailwindCSS, Docker, CI/CD pipelines**.',
    impact: 'Staff and patients enjoy **smooth workflows**, faster interactions, and higher engagement with a modern, frictionless interface.',
    keyContributions: ['**React.js & TypeScript Architecture**', '**Redux Thunk State Management**', '**ESLint & CI/CD Automation**', '**RESTful API Integration**', '**Dockerized Monorepo & Pipelines**'],
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
    testimonial: 'Working with me felt like having a **senior frontend engineer embedded**—complex systems simplified, features shipped faster than expected.',
    testimonialAuthor: 'Sepand Hokmabadi',
    testimonialAuthorPosition: 'CEO, Total Health Dental Care'
  },
  {
    slug: 'scheduler',
    title: 'Scheduler',
    websiteUrl: 'https://schedule.totalhealthdentalcare.com',
    industry: 'Healthcare / Dental Service',
    shortIntro: 'Scheduler tames appointment chaos—fast for patients, painless for staff, and fun to ship. Real-time flows built with **React** + **TypeScript**.',
    overview: 'Inside Total Health Dental Care, Scheduler solves scheduling headaches using **React**, **TypeScript**, **Redux Thunk**, and **TanStack** for smooth, real-time booking UIs.',
    approach: 'I treat Scheduler like Devin Picciolini handles timelines: structured, honest, and surprise-free. **Monorepo**, **ESLint/Prettier**, **Dockerized CI/CD** keep releases seamless.',
    impact: 'Scheduler reduced no-shows, delighted staff, and made patient flows intuitive. Smart frontend patterns quietly improved real metrics without shouting about it.',
    keyContributions: ['**React.js** + **TypeScript** frontend with **Redux Thunk**', 'Smart booking engine with real-time availability sync', 'Calendar UI with smooth **GSAP** animations', 'Patient notification system—no surprises', 'Staff workflow automation with state-safe flows', '**Monorepo** architecture + **Dockerized CI/CD** pipelines', 'HTML5, **TailwindCSS**, **ESLint/Prettier** code quality', 'Git feature branching + PR reviews for reliable workflow'],
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
    testimonial: 'Scheduler made appointment chaos vanish. Fast, reliable, and staff actually enjoy using it. Frontend craft shows.',
    testimonialAuthor: 'Sepand Hokmabadi',
    testimonialAuthorPosition: 'CEO, Total Health Dental Care'
  },
  {
    slug: 'honeydu',
    title: 'Honeydu',
    websiteUrl: 'https://www.honeydu.io',
    industry: 'Fintech',
    shortIntro: 'Turned Honeydu into a sleek, modern invoicing tool that makes freelance finances almost fun with **React**, **Redux**, and **TailwindCSS**.',
    overview: 'Rebuilt frontend for speed, predictability, and mobile-first use. Clean layouts help freelancers focus on work, not invoices.',
    approach: 'Kept UI interactions obvious, fast, and friendly. Built modular components with **React**, **Redux**, **TailwindCSS**, guided by Devin Picciolini.',
    impact: 'UI feels lighter, faster, human. Payments, invoices, notifications flow seamlessly. Freelancers spend less time wrestling, more time creating.',
    keyContributions: ['Built responsive **React** + **Redux** UI', 'Created reusable components & predictable global state', 'Styled interface with **TailwindCSS** + semantic HTML', 'Improved mobile-first clarity and performance', 'Added **GSAP** micro-interactions for friendly UI moments'],
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
    testimonial: 'Working with Abdul is like having a frontend Swiss-Army knife — clean, fast UI that genuinely delights users.',
    testimonialAuthor: 'Devin Picciolini',
    testimonialAuthorPosition: 'CEO, Coral'
  },
  {
    slug: 'coral',
    title: 'Coral',
    websiteUrl: 'https://www.coral.global',
    industry: 'Consulting & Venture Studio',
    shortIntro: 'Crafting **React.js**-powered, fast, interactive experiences that delight users and impress clients. Mobile-first, responsive, animated, and intuitive.',
    overview: 'Built **frontend** with **React.js**, **Redux**, **HTML5**, **SASS**, **GSAP**. Focused on reusable components, smooth animations, and performance-first experiences.',
    approach: 'Led **frontend** with **React.js**, **Redux**, **SASS**, **GSAP**. Designed scalable, maintainable components. Prioritized speed, responsiveness, and delightful micro-interactions.',
    impact: 'Clean **code** + smart **UI** patterns = engaging products. Boosted performance, user satisfaction, and business metrics with interactive, scalable interfaces.',
    keyContributions: ['**React.js** & **Redux** architecture', 'Dynamic **UI/UX** with **GSAP** animations', 'Responsive, **SASS**-based components', 'Interactive prototypes & micro-interactions', 'Frontend strategy & performance optimization'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    team: [{ role: 'Project Manager', name: 'Devin Picciolini' }],
    images: [prefixed('/api/images/work/coral/mobile/7.png'), prefixed('/api/images/work/coral/mobile/8.png'), prefixed('/api/images/work/coral/mobile/9.png'), prefixed('/api/images/work/coral/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/coral.mp4'),
      sequences: [prefixed('/videos/work/coral/part-01-export.mp4'), prefixed('/videos/work/coral/part-02-export.mp4'), prefixed('/videos/work/coral/part-03-export.mp4'), prefixed('/videos/work/coral/part-04-export.mp4')]
    },
    bgColor: 'blue',
    path: 'coral',
    testimonial: 'Abdul’s **frontend** work felt magical—fast, clean, interactive. Debugging together was surprisingly fun and smooth.',
    testimonialAuthor: 'Devin Picciolini',
    testimonialAuthorPosition: 'CEO, Coral'
  },
  {
    slug: 'goldendao',
    title: 'Golden DAO',
    websiteUrl: 'https://www.goldendao.xyz',
    industry: 'Blockchain',
    shortIntro: 'Built **React.js + Redux** frontend — bridging Web3 culture with smooth, human-first interactions and playful NFT experiences.',
    overview: 'Turned abstract blockchain ideas into fast, pixel-perfect, **responsive** frontend interactions that feel human and approachable.',
    approach: 'Architected **React.js + Redux** UI with **HTML5**, **TailwindCSS**, and **GSAP**. Optimized NFT-gated features, hover effects, animations. Collaborated with Devin Picciolini.',
    impact: 'Users explore NFT-exclusive events and community features seamlessly. Frontend makes blockchain approachable, playful, and surprisingly human.',
    keyContributions: ['**React.js & Redux architecture**', '**JavaScript-heavy UI interactions**', '**Responsive HTML5 & TailwindCSS layouts**', '**GSAP animations for micro-interactions**', 'NFT access-gated features'],
    team: [{ role: 'Project Manager', name: 'Devin Picciolini' }],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [''],
    video: {
      originalFile: prefixed('/videos/work/goldendao.mp4'),
      sequences: [prefixed('/videos/work/goldendao/part-01-export.mp4'), prefixed('/videos/work/goldendao/part-02-export.mp4'), prefixed('/videos/work/goldendao/part-03-export.mp4'), prefixed('/videos/work/goldendao/part-04-export.mp4'), prefixed('/videos/work/goldendao/part-05-export.mp4')]
    },
    bgColor: 'cyan',
    path: 'goldendao',
    testimonial: 'Abdul made the frontend effortless — fast, precise, and genuinely enjoyable to use.',
    testimonialAuthor: 'Andrew Yang',
    testimonialAuthorPosition: 'CEO, Golden DAO'
  }
];

export default PageData;
