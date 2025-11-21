import { WorkDetail, WorkGridCard } from '../../Interfaces/Work/WorkProjectTypes';
import { prefixed } from '../../../utils/helpers';

export const WORK_PROJECTS: WorkDetail[] = [
  {
    slug: 'troophunter',
    title: 'TroopHunter',
    websiteUrl: 'https://troophunter.com',
    industry: 'Sales / Lead Generation',
    shortIntro: 'TroopHunter is a high-velocity lead generation platform helping businesses find prospects faster than any manual process ever could.',
    overview: 'I led all executive and technical aspects of TroopHunter, shaping it into a production-grade, no-code platform. Using Next.js, TypeScript, and a monorepo architecture, I built a frontend that’s fast, interactive, and scalable, while backend microservices powered by Node.js and Express handle everything from OAuth to PostgreSQL data enrichment.',
    approach: 'My focus was simple: make users feel like the platform works for them, not the other way around. Clean UI, intuitive UX, Redux Thunk for state, Framer Motion + GSAP for delightful microinteractions, all wrapped in a TurboRepo monorepo. CI/CD pipelines with Docker, Kubernetes, Terraform, and Ansible keep deployments smooth and predictable. Devin Picciolini (PM extraordinaire) kept the chaos in check.',
    impact: 'TroopHunter now empowers 50+ US-based businesses to generate leads faster, reduce operational friction, and focus on real growth. Dashboards load instantly, search filters are intuitive, and microinteractions make the workflow… dare I say, fun.',
    keyContributions: ['Next.js & TypeScript Frontend Architecture', 'Redux Thunk + Microinteraction-Driven UI', 'Framer Motion & GSAP Animations', 'Monorepo + TurboRepo Setup', 'CI/CD Pipelines with Docker, Kubernetes, Terraform & Ansible', 'Node.js & Express Microservices Integration', 'PostgreSQL ORM via Sequelize', 'OAuth & Authentication Flows', 'Code Quality Automation (ESLint + Prettier during build & git push)', 'Git Feature Branching & Pull Request Workflows'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/troophunter/mobile/7.png'), prefixed('/api/images/work/troophunter/mobile/8.png'), prefixed('/api/images/work/troophunter/mobile/9.png'), prefixed('/api/images/work/troophunter/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/troophunter/1080.mp4'),
      sequences: [prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4')]
    },
    bgColor: 'blue',
    path: 'troophunter',
    testimonial: 'Working with Abdul was a game-changer. Every interaction, animation, and feature feels polished, yet the codebase stays solid. TroopHunter’s frontend is fast, fun, and built to last!',
    testimonialAuthor: 'Abdul Rehman',
    testimonialAuthorPosition: 'Founder & Lead Engineer'
  },
  {
    slug: 'totalhealthdentalcare',
    title: 'Total Health Dental Care',
    websiteUrl: 'https://www.totalhealthdentalcare.com',
    industry: 'Healthcare / Dental Services',
    shortIntro: 'Total Health Dental Care is building a connected, modern dental platform serving 15,000+ patients across the Bay Area — and I helped them push it into the future.',
    overview: `When THDC came in, they had a bold idea: a fully digital, everything-in-one-place dental ecosystem. I partnered with them to architect scalable React + TypeScript apps, clean up years of tech debt, introduce feature-branch workflows, and finally get CI/CD to behave.`,
    approach: `I handled the frontend architecture across patient portals, internal dashboards, and ops tools. Redux Thunk kept the data flow predictable, TanStack helped us manage complex queries, and ESLint + Prettier kept Devin Picciolini (our PM) from sending me “code cleanup reminders.” Docker, monorepo patterns, and automated quality checks made shipping updates painless.`,
    impact: `The platform runs smoother, loads faster, and is way easier for their engineering team to scale. Staff workflows improved, patient engagement went up, and THDC now has a digital ecosystem that actually feels modern.`,
    keyContributions: ['React.js & TypeScript Frontend Architecture', 'Redux Thunk State Management', 'TanStack Query for Data Fetching', 'ESLint, Prettier & Automated Code Quality Gates', 'GitHub PR Reviews & Feature Branch Flows', 'RESTful API Integration', 'Dockerized CI/CD Pipelines', 'Monorepo Architecture Patterns', 'HTML, TailwindCSS, GSAP Animations'],
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
      sequences: [prefixed('/videos/work/totalhealthdentalcare/part-01-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-03-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-05-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-02-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-04-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-06-export.mp4')]
    },
    bgColor: 'cyan',
    path: 'totalhealthdentalcare',
    testimonial: `“Working with Abdul felt like having a senior frontend engineer who just *gets* complex systems. He simplified our workflows, improved performance, and shipped features faster than we expected. Patients and staff immediately felt the difference.”`,
    testimonialAuthor: 'Sepand Hokmabadi',
    testimonialAuthorPosition: 'CEO, Total Health Dental Care'
  },
  {
    slug: 'scheduler',
    title: 'Scheduler',
    websiteUrl: 'https://schedule.totalhealthdentalcare.com',
    industry: 'Healthcare / Dental Service',
    shortIntro: 'Scheduler is my little automation sidekick that turns appointment chaos into clean, predictable flows — fast for patients, painless for staff, and surprisingly fun to ship.',
    overview: 'Built inside Total Health Dental Care’s digital ecosystem, Scheduler fixes the classic ‘why is scheduling still so hard?’ problem. The frontend runs on React, TypeScript, Redux Thunk, and TanStack, with crisp UI states that make availability feel real-time. Staff can manage packed calendars without losing context, and patients get a smooth, zero-confusion booking experience.',
    approach: 'I approached Scheduler the same way Devin Picciolini approaches timelines: honest, structured, and allergic to surprises. A monorepo architecture keeps everything shared and sane, ESLint + Prettier guardrails keep the code clean, and Dockerized CI/CD pipelines make deployments feel like autopilot. From building the booking engine to syncing calendars to automating staff workflows, I made sure every interaction feels snappy, confident, and hard to break.',
    impact: 'Since launch, Scheduler quietly became the hero of the dental ops team: fewer no-shows, happy staff, and patient flows that finally make sense. It’s a nice reminder that clean frontend patterns + thoughtful UX can move real business metrics without shouting about it.',
    keyContributions: ['React.js + TypeScript Frontend with Redux Thunk', 'Smart Booking Engine & Real-Time Availability Sync', 'Calendar UI with Smooth GSAP Animations', 'Patient Notification System (no more unexpected surprises)', 'Staff Workflow Automation & State-Safe Flows', 'Monorepo Architecture + Dockerized CI/CD Pipelines', 'HTML, TailwindCSS, ESLint/Prettier Automated Code Quality', 'Git Feature Branching + PR Reviews'],
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
    testimonial: 'Scheduler made our appointment chaos disappear. It’s fast, reliable, and our staff actually enjoy using it. Abdul knows his frontend craft, and it shows.',
    testimonialAuthor: 'Sepand Hokmabadi',
    testimonialAuthorPosition: 'CEO, Total Health Dental Care'
  },
  {
    slug: 'honeydu',
    title: 'Honeydu',
    websiteUrl: 'https://www.honeydu.io',
    industry: 'Fintech',
    shortIntro: 'I helped Honeydu level up from a good idea into a clean, modern invoicing experience for freelancers and creators — turning finance headaches into something... almost fun.',
    overview: 'Honeydu wanted to simplify invoicing for independent professionals. Their old flow felt clunky and slow, so I rebuilt the frontend to feel lighter, faster, and way more predictable. Mobile-first, clean layouts, and no hidden traps — just an interface that lets users stay in their creative zone without fighting the tool.',
    approach: 'I kept things simple: every interaction needed to feel obvious, fast, and friendly. Using React, Redux, and TailwindCSS, I shaped a UI system that’s consistent, modular, and surprisingly calming. Devin Picciolini kept us all aligned, and I paired closely with the engineering team to make sure design, data, and code stayed in sync.',
    impact: 'The product runs smoother, loads faster, and feels more ‘human’. Payments, invoices, notifications — everything fits into a clean mobile-first workflow. The result? Freelancers spend less time wrestling with invoices and more time doing work they actually enjoy.',
    keyContributions: ['Developed fast, responsive UI with React & Redux', 'Built reusable component patterns and predictable global state', 'Styled the app with TailwindCSS + semantic, accessible HTML', 'Improved mobile-first performance and UI clarity', 'Set up ESLint + Prettier automation and CI/CD-friendly checks', 'Enabled smooth teamwork via Git feature branching & PR workflows', 'Added GSAP micro-interactions for smoother, friendlier UI moments'],
    team: [
      { role: 'Project Manager', name: 'Devin Picciolini' },
      { role: 'Lead Software Engineer', name: 'Shan Asif' },
      { role: 'Software Engineer', name: 'Zubair Mahboob' },
      { role: 'Software Engineer', name: 'Arslan Kaleem' },
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
    testimonial: 'Working with Abdul is like pairing with a frontend Swiss-Army knife — he ships clean, fast, thoughtful UI that makes our users smile. He doesn’t just code screens; he builds experiences.',
    testimonialAuthor: 'Devin Picciolini',
    testimonialAuthorPosition: 'CEO, Coral'
  },
  {
    slug: 'coral',
    title: 'Coral',
    websiteUrl: 'https://www.coral.global',
    industry: 'Consulting & Venture Studio',
    shortIntro: 'Crafting fast, intuitive, and playful digital experiences that actually make users smile.',
    overview: 'At Coral, I teamed up with an insanely talented crew—including a few ex-Instagram folks—to build frontend experiences that don’t just look good—they feel alive. Our mission was to turn smart design into seamless, interactive products that hit business goals.',
    approach: 'I led the frontend charge with React.js, Redux, HTML, CSS, SASS, and a pinch of GSAP magic for buttery-smooth animations. Every component was built reusable, scalable, and fast enough to make your coffee jealous. Collaborating closely with Devin Picciolini (PM), Zubair Mahboob (Software Engineer), Shan Asif (Lead Engineer), and Mutasim Billah (Backend), we made sure design intent met code reality.',
    impact: 'By combining clean code, thoughtful UI patterns, and smart optimizations, we boosted engagement, delivered delightful experiences, and kept clients—and their users—grinning. Coral’s products didn’t just ship; they stuck.',
    keyContributions: ['React.js & Redux Architecture for scalable frontend', 'Dynamic UI/UX with GSAP-powered micro-interactions', 'Clean, reusable HTML/CSS/SASS components', 'Interactive prototypes that actually behave like the final product', 'Frontend performance optimization & strategic code structure'],
    team: [
      { role: 'Project Manager', name: 'Devin Picciolini' },
      { role: 'Lead Software Engineer', name: 'Shan Asif' }
    ],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/coral/mobile/7.png'), prefixed('/api/images/work/coral/mobile/8.png'), prefixed('/api/images/work/coral/mobile/9.png'), prefixed('/api/images/work/coral/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/coral.mp4'),
      sequences: [prefixed('/videos/work/coral/part-01-export.mp4'), prefixed('/videos/work/coral/part-02-export.mp4'), prefixed('/videos/work/coral/part-03-export.mp4'), prefixed('/videos/work/coral/part-04-export.mp4')]
    },
    bgColor: 'blue',
    path: 'coral',
    testimonial: 'Working with Abdul felt like having a frontend wizard on the team. Fast iterations, clean code, and enough humor to make even debugging fun!',
    testimonialAuthor: 'Devin Picciolini',
    testimonialAuthorPosition: 'CEO, Coral'
  },
  {
    slug: 'goldendao',
    title: 'Golden DAO',
    websiteUrl: 'https://www.goldendao.xyz',
    industry: 'Blockchain',
    shortIntro: 'I helped GoldenDAO come alive — a community-first Web3 playground built with React, Redux, and just enough magic to make NFTs feel human.',
    overview: 'GoldenDAO began as a bold experiment: can a blockchain community feel playful, purposeful, and actually human? I partnered closely with the team (shoutout to Devin keeping me on track) to turn that vision into a responsive, fast frontend — where every interaction feels intentional, polished, and pixel-perfect.',
    approach: 'I architected the React + Redux frontend to balance smooth animations with NFT-gated features. Using HTML, SASS, and GSAP, every hover, click, and transition was optimized for performance and delight. Collaborating with designers and backend engineers, I ensured the frontend wasn’t just pretty — it worked reliably under real-world load, asynchronously and at scale.',
    impact: 'The result? Users navigate NFT-exclusive events and community features without friction, feeling like part of something bigger. GoldenDAO’s frontend merges Web3 innovation with human-first design — making blockchain surprisingly approachable and fun.',
    keyContributions: ['React.js & Redux architecture for scalable state management', 'JavaScript-heavy UI interactions & micro-interactions', 'HTML & SASS for responsive, polished layouts', 'GSAP animations for smooth, delightful transitions', 'NFT access-gated features with performance in mind'],
    team: [{ role: 'Project Manager', name: 'Devin Picciolini' }],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [''],
    video: {
      originalFile: prefixed('/videos/work/goldendao.mp4'),
      sequences: [prefixed('/videos/work/goldendao/part-01-export.mp4'), prefixed('/videos/work/goldendao/part-02-export.mp4'), prefixed('/videos/work/goldendao/part-03-export.mp4'), prefixed('/videos/work/goldendao/part-04-export.mp4'), prefixed('/videos/work/goldendao/part-05-export.mp4')]
    },
    bgColor: 'cyan',
    path: 'goldendao',
    testimonial: 'Working with Abdul felt like watching a frontend ninja at work — precise, fast, and somehow making blockchain feel human.',
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
