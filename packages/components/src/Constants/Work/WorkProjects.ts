import { WorkDetail, WorkGridCard } from '../../Interfaces/Work/WorkProjectTypes';
import { prefixed } from '../../../utils/helpers';

export const WORK_PROJECTS: WorkDetail[] = [
  {
    slug: 'troophunter',
    title: 'TroopHunter',
    websiteUrl: 'https://troophunter.com',
    industry: 'Sales / Lead Generation',
    shortIntro: 'TroopHunter accelerates lead generation, helping US businesses find prospects faster than any manual method could.',
    overview: 'I led TroopHunter’s end-to-end frontend and backend. Built a fast, scalable Next.js + TypeScript UI with Node.js microservices and PostgreSQL powered by Sequelize.',
    approach: 'Focused on intuitive UX, delightful microinteractions via Framer Motion & GSAP, Redux Thunk for state, and a TurboRepo monorepo. CI/CD pipelines with Docker, Kubernetes, Terraform, and Ansible ensured smooth releases.',
    impact: 'Now 50+ US companies generate leads faster, dashboards load instantly, filters are intuitive, and workflows feel… actually fun.',
    keyContributions: ['Next.js & TypeScript frontend architecture', 'Redux Thunk state management', 'Framer Motion & GSAP microinteractions', 'TurboRepo monorepo setup', 'Dockerized CI/CD pipelines with Kubernetes, Terraform & Ansible', 'Node.js & Express microservices', 'PostgreSQL ORM via Sequelize', 'OAuth & auth flows', 'Code quality automation via ESLint & Prettier', 'Git feature branching & PR workflows'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/troophunter/mobile/7.png'), prefixed('/api/images/work/troophunter/mobile/8.png'), prefixed('/api/images/work/troophunter/mobile/9.png'), prefixed('/api/images/work/troophunter/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/troophunter/1080.mp4'),
      sequences: [prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4')]
    },
    bgColor: 'blue',
    path: 'troophunter',
    testimonial: 'Working with Abdul made TroopHunter feel alive. Fast, polished, fun—yet the code stays rock solid.',
    testimonialAuthor: 'Abdul Rehman',
    testimonialAuthorPosition: 'Founder & Lead Engineer'
  },
  {
    slug: 'totalhealthdentalcare',
    title: 'Total Health Dental Care',
    websiteUrl: 'https://www.totalhealthdentalcare.com',
    industry: 'Healthcare / Dental Services',
    shortIntro: 'Reimagining dental care with a digital-first approach, serving 15,000+ patients across the Bay Area.',
    overview: 'I partnered to build React + TypeScript apps, integrate APIs, structure a monorepo, and deliver Dockerized CI/CD pipelines that actually work.',
    approach: 'From patient portals to internal dashboards, every module was built for speed, reliability, and maintainability with Redux Thunk, ESLint, and Docker CI/CD.',
    impact: 'The platform now runs smoothly for patients and staff, reducing friction, boosting engagement, and giving Total Health Dental Care a modern edge.',
    keyContributions: ['React.js & TypeScript Architecture', 'Redux Thunk State Management', 'ESLint & Code Quality Enforcement', 'RESTful API Integration', 'Dockerized Monorepo & CI/CD Pipelines'],
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
    testimonial: 'Working with Abdul felt like having a senior frontend engineer embedded. He simplified complex systems and shipped features faster than expected.',
    testimonialAuthor: 'Sepand Hokmabadi',
    testimonialAuthorPosition: 'CEO, Total Health Dental Care'
  },
  {
    slug: 'scheduler',
    title: 'Scheduler',
    websiteUrl: 'https://schedule.totalhealthdentalcare.com',
    industry: 'Healthcare / Dental Service',
    shortIntro: 'Scheduler is my automation sidekick that turns appointment chaos into smooth, predictable flows — fast for patients, painless for staff, and fun to ship.',
    overview: 'Built inside Total Health Dental Care’s ecosystem, Scheduler solves “why is scheduling still hard?” with React, TypeScript, Redux Thunk, and TanStack for real-time UI and booking flows.',
    approach: 'I treat Scheduler like Devin Picciolini treats timelines: structured, honest, and allergic to surprises. Monorepo architecture, ESLint/Prettier, and Dockerized CI/CD keep deployments seamless.',
    impact: 'Scheduler cut no-shows, delighted staff, and made patient flows intuitive. Smart frontend patterns and thoughtful UX quietly moved real metrics without a shout.',
    keyContributions: ['React.js + TypeScript Frontend with Redux Thunk', 'Smart Booking Engine & Real-Time Availability Sync', 'Calendar UI with Smooth GSAP Animations', 'Patient Notification System, no surprises', 'Staff Workflow Automation & State-Safe Flows', 'Monorepo Architecture + Dockerized CI/CD Pipelines', 'HTML, TailwindCSS, ESLint/Prettier Code Quality', 'Git Feature Branching + PR Reviews'],
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
    testimonial: 'Scheduler made appointment chaos disappear. It’s fast, reliable, and our staff actually enjoy using it. Abdul’s frontend craft shows.',
    testimonialAuthor: 'Sepand Hokmabadi',
    testimonialAuthorPosition: 'CEO, Total Health Dental Care'
  },
  {
    slug: 'honeydu',
    title: 'Honeydu',
    websiteUrl: 'https://www.honeydu.io',
    industry: 'Fintech',
    shortIntro: 'I helped Honeydu turn a good idea into a sleek, modern invoicing tool that makes freelance finances almost fun.',
    overview: 'The old flow was clunky. I rebuilt the frontend to be faster, predictable, and mobile-first. Clean layouts let freelancers focus on work, not invoices.',
    approach: 'I kept interactions obvious, fast, and friendly. Using React, Redux, and TailwindCSS, I built a consistent, modular UI. Devin Picciolini ensured smooth alignment with the team.',
    impact: 'UI feels lighter, faster, and human. Payments, invoices, notifications — all flow seamlessly. Freelancers spend less time wrestling with the tool and more time creating.',
    keyContributions: ['Built fast, responsive UI with React & Redux', 'Created reusable components & predictable global state', 'Styled interface with TailwindCSS + semantic HTML', 'Improved mobile-first performance and clarity', 'Added GSAP micro-interactions for friendly UI moments'],
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
    testimonial: 'Pairing with Abdul is like having a frontend Swiss-Army knife — clean, fast UI that genuinely delights our users.',
    testimonialAuthor: 'Devin Picciolini',
    testimonialAuthorPosition: 'CEO, Coral'
  },
  {
    slug: 'coral',
    title: 'Coral',
    websiteUrl: 'https://www.coral.global',
    industry: 'Consulting & Venture Studio',
    shortIntro: 'Crafting fast, interactive experiences that make users smile and clients nod in approval.',
    overview: 'Worked with Coral’s stellar team (including ex-Instagram folks!) to build frontend experiences that feel alive and genuinely user-focused.',
    approach: 'Led frontend with React.js, Redux, HTML, SASS, and GSAP. Built reusable, scalable components with smooth animations that don’t block performance.',
    impact: 'Clean code + smart UI patterns = digital products that drive engagement and delight users while hitting business goals.',
    keyContributions: ['React.js & Redux architecture', 'Dynamic UI/UX with GSAP animations', 'Scalable HTML/CSS/SASS components', 'Interactive prototypes & micro-interactions', 'Frontend strategy & performance optimization'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    team: [{ role: 'Project Manager', name: 'Devin Picciolini' }],
    images: [prefixed('/api/images/work/coral/mobile/7.png'), prefixed('/api/images/work/coral/mobile/8.png'), prefixed('/api/images/work/coral/mobile/9.png'), prefixed('/api/images/work/coral/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/coral.mp4'),
      sequences: [prefixed('/videos/work/coral/part-01-export.mp4'), prefixed('/videos/work/coral/part-02-export.mp4'), prefixed('/videos/work/coral/part-03-export.mp4'), prefixed('/videos/work/coral/part-04-export.mp4')]
    },
    bgColor: 'blue',
    path: 'coral',
    testimonial: 'Abdul’s frontend work was magical—clean, fast, and enjoyable. Debugging with him felt like a team sport.',
    testimonialAuthor: 'Devin Picciolini',
    testimonialAuthorPosition: 'CEO, Coral'
  },
  {
    slug: 'goldendao',
    title: 'Golden DAO',
    websiteUrl: 'https://www.goldendao.xyz',
    industry: 'Blockchain',
    shortIntro: 'I built GoldenDAO’s React + Redux frontend — bridging Web3 culture with smooth, human-first interactions and a dash of magic.',
    overview: 'GoldenDAO needed a playful, human-feel blockchain experience. I turned abstract ideas into fast, responsive, pixel-perfect frontend interactions.',
    approach: 'Architected React + Redux UI with SASS, HTML, and GSAP. Optimized NFT-gated features, hover effects, and animations. Collaborated with Devin and the team for reliable delivery.',
    impact: 'Users explore NFT-exclusive events and community features seamlessly. The frontend makes blockchain approachable, playful, and surprisingly human.',
    keyContributions: ['React.js & Redux architecture', 'JavaScript-heavy UI interactions', 'Responsive HTML & SASS layouts', 'GSAP animations for micro-interactions', 'NFT access-gated features'],
    team: [{ role: 'Project Manager', name: 'Devin Picciolini' }],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [''],
    video: {
      originalFile: prefixed('/videos/work/goldendao.mp4'),
      sequences: [prefixed('/videos/work/goldendao/part-01-export.mp4'), prefixed('/videos/work/goldendao/part-02-export.mp4'), prefixed('/videos/work/goldendao/part-03-export.mp4'), prefixed('/videos/work/goldendao/part-04-export.mp4'), prefixed('/videos/work/goldendao/part-05-export.mp4')]
    },
    bgColor: 'cyan',
    path: 'goldendao',
    testimonial: 'Abdul made the frontend feel effortless — fast, precise, and genuinely enjoyable to use.',
    testimonialAuthor: 'Andrew Yang',
    testimonialAuthorPosition: 'CEO, Golden DAO'
  }
];

export const WORK_PROJECTS_GRID_DATA: WorkGridCard[] = WORK_PROJECTS.map((item) => {
  if (item.images.length < 5) {
    return {
      variant: 'landscape',
      space: 'inner',
      bgColor: item.bgColor,
      title: item.title,
      images: item.images,
      placeholderImage: item.placeholderImage,
      video: item.video,
      path: item.path,
      testimonial: item.testimonial,
      testimonialAuthor: item.testimonialAuthor,
      testimonialAuthorPosition: item.testimonialAuthorPosition
    };
  } else {
    return item.images.map((image) => ({
      variant: 'portrait',
      space: 'outer',
      bgColor: item.bgColor,
      title: item.title,
      images: item.images,
      placeholderImage: item.placeholderImage,
      video: item.video,
      path: item.path,
      testimonial: item.testimonial,
      testimonialAuthor: item.testimonialAuthor,
      testimonialAuthorPosition: item.testimonialAuthorPosition
    }));
  }
});
