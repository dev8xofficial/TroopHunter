import { WorkDetail, WorkGridCard } from '../../Interfaces/Work/WorkProjectTypes';
import { prefixed } from '../../../utils/helpers';

export const WORK_PROJECTS: WorkDetail[] = [
  {
    slug: 'troophunter',
    title: 'TroopHunter',
    websiteUrl: 'https://troophunter.com',
    industry: 'Sales / Lead Generation',
    shortIntro: 'TroopHunter is a high-velocity lead generation platform empowering businesses to find prospects faster than manual research ever could.',
    overview: 'I helped shape TroopHunter into a no-code, production-grade platform. Using Next.js, TypeScript, and a monorepo architecture, I delivered a frontend that’s fast, interactive, and scalable, while backend microservices handle everything from OAuth to PostgreSQL data enrichment.',
    approach: 'By combining a clean UI, thoughtful UX, Framer Motion animations, and Redux-powered state, I created a workflow where users focus on closing deals, not wrestling with the interface. CI/CD pipelines, Docker, and on-prem virtualization ensure deployments are smooth and reliable.',
    impact: 'Trusted by over 50 US-based businesses, TroopHunter’s frontend helps teams generate leads faster, reduce operational friction, and focus on real business growth. Users experience fast-loading dashboards, intuitive search filters, and delightful microinteractions.',
    keyContributions: ['Next.js & TypeScript Frontend Architecture', 'Redux + Microinteraction-Driven UI', 'Framer Motion & GSAP Animations', 'Monorepo + Turborepo Setup', 'CI/CD Pipelines with Docker & Kubernetes', 'Microservices Integration with Node.js & Express', 'PostgreSQL ORM with Sequelize', 'OAuth & Authentication Flows'],
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
    testimonialAuthorPosition: 'CEO, Dev8X'
  },
  {
    slug: 'totalhealthdentalcare',
    title: 'Total Health Dental Care',
    websiteUrl: 'https://www.totalhealthdentalcare.com',
    industry: 'Healthcare / Dental Services',
    shortIntro: 'Total Health Dental Care reimagines dental care with a connected, digital-first approach, serving 15,000+ patients across the Bay Area.',
    overview: 'They came with a bold vision — a fully connected dental platform. I partnered with them to architect React + TypeScript apps, integrate RESTful APIs, implement monorepo patterns, and deliver CI/CD pipelines that actually work.',
    approach: 'From patient portals to internal dashboards, every module was crafted for speed, reliability, and maintainability. Redux Thunk handles state like a charm, ESLint keeps the code clean, and Docker + CI/CD keeps deployments smooth.',
    impact: 'The platform now delivers a seamless experience for patients and staff alike, reducing operational friction, boosting engagement, and giving Total Health Dental Care a competitive edge in modern healthcare.',
    keyContributions: ['React.js & TypeScript Architecture', 'Redux Thunk State Management', 'ESLint & Code Quality Enforcement', 'RESTful API Integration', 'Dockerized Monorepo & CI/CD Pipelines'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/totalhealthdentalcare/mobile/7.png'), prefixed('/api/images/work/totalhealthdentalcare/mobile/8.png'), prefixed('/api/images/work/totalhealthdentalcare/mobile/9.png'), prefixed('/api/images/work/totalhealthdentalcare/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/totalhealthdentalcare.mp4'),
      sequences: [prefixed('/videos/work/totalhealthdentalcare/part-01-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-03-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-05-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-02-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-04-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-06-export.mp4')]
    },
    bgColor: 'cyan',
    path: 'totalhealthdentalcare',
    testimonial: 'Working with Abdul was like having a senior frontend engineer embedded in our team. He took complex systems, simplified them, and shipped features faster than we expected. Our users noticed the difference immediately.',
    testimonialAuthor: 'Sepand Hokmabadi',
    testimonialAuthorPosition: 'CEO, Total Health Dental Care'
  },
  {
    slug: 'scheduler',
    title: 'Scheduler',
    websiteUrl: 'https://schedule.totalhealthdentalcare.com',
    industry: 'Healthcare / Dental Service',
    shortIntro: 'Scheduler is my little automation sidekick that makes patient appointments feel like magic — fast, predictable, and frustration-free.',
    overview: 'Built for Total Health Dental Care’s digital ecosystem, Scheduler tackles the classic scheduling headache. React, TypeScript, and Redux powers a seamless interface where patients see availability in real-time and staff manage calendars without losing their minds.',
    approach: 'I built Scheduler with a monorepo mindset, ESLint safety nets, and CI/CD pipelines, so it’s as robust as it is smooth. Patients can book, reschedule, or cancel appointments effortlessly, while the backend and Dockerized microservices hum quietly in the background, keeping everything in sync.',
    impact: 'Since launch, Scheduler has quietly stolen the spotlight: fewer no-shows, happier staff, and smoother patient experiences. It’s proof that clean frontend + smart UX can move metrics, delight humans, and still look effortless.',
    keyContributions: ['React.js + TypeScript Frontend with Redux State Management', 'Smart Booking Engine & Calendar Sync', 'Patient Notification System (no one likes surprises)', 'Staff Workflow Automation', 'Seamless Mobile & CRM Integration', 'Monorepo Architecture + Docker + CI/CD'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/scheduler/mobile/7.png'), prefixed('/api/images/work/scheduler/mobile/8.png'), prefixed('/api/images/work/scheduler/mobile/9.png'), prefixed('/api/images/work/scheduler/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/scheduler.mp4'),
      sequences: [prefixed('/videos/work/scheduler/part-01-export.mp4'), prefixed('/videos/work/scheduler/part-02-export.mp4'), prefixed('/videos/work/scheduler/part-03-export.mp4'), prefixed('/videos/work/scheduler/part-04-export.mp4')]
    },
    bgColor: 'blue',
    path: 'scheduler',
    testimonial: 'Scheduler made our appointment chaos disappear. It’s fast, reliable, and our staff actually enjoy using it. Dev8X knows their frontend magic!',
    testimonialAuthor: 'Sepand Hokmabadi',
    testimonialAuthorPosition: 'CEO, Total Health Dental Care'
  },
  {
    slug: 'honeydu',
    title: 'Honeydu',
    websiteUrl: 'https://www.honeydu.io',
    industry: 'Fintech',
    shortIntro: 'I helped Honeydu become a sleek, modern invoicing app for freelancers and creators—turning finance headaches into something almost fun (almost).',
    overview: 'Honeydu was struggling with the usual clunky invoicing tools, so we rebuilt it from the ground up. Mobile-first, intuitive, and fast, it now lets independent professionals handle finances without losing their creative flow.',
    approach: 'I focused on clarity and simplicity—every button, every workflow, every pixel. Using React, Redux, and TailwindCSS, I created an interface that’s light, responsive, and predictable. Users can do more in less time, without feeling lost in menus or modals.',
    impact: 'From optimizing mobile performance to integrating payments, I helped Honeydu become a purpose-built financial companion. The result? Freelancers and creators can spend less time wrestling with invoices and more time building their craft.',
    keyContributions: ['Built fast, responsive UI with React & Redux', 'Structured reusable components and global state for scale', 'Styled everything with TailwindCSS & semantic HTML', 'Optimized mobile-first performance & accessibility', 'Set up ESLint, CI/CD pipelines, and dev-friendly tooling'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [''],
    video: {
      originalFile: prefixed('/videos/work/honeydu.mp4'),
      sequences: [prefixed('/videos/work/honeydu/part-01-export.mp4'), prefixed('/videos/work/honeydu/part-02-export.mp4'), prefixed('/videos/work/honeydu/part-04-export.mp4'), prefixed('/videos/work/honeydu/part-03-export.mp4')]
    },
    bgColor: 'cyan',
    path: 'honeydu',
    testimonial: 'Working with Abdul felt like pairing with a frontend swiss-army knife—he shipped clean, fast, and thoughtful UI that actually made our users smile. He doesn’t just write code; he builds experiences.',
    testimonialAuthor: 'Devin Picciolini',
    testimonialAuthorPosition: 'CEO, Coral'
  },
  {
    slug: 'coral',
    title: 'Coral',
    websiteUrl: 'https://www.coral.global',
    industry: 'Consulting & Venture Studio',
    shortIntro: 'Building fast, elegant, and interactive experiences that make users smile.',
    overview: 'Coral is where digital strategy meets pixel-perfect execution. I teamed up with their brilliant crew (some ex-Instagram folks!) to craft frontend experiences that don’t just look good—they behave like they actually care about users.',
    approach: 'I led the frontend work using React.js, Redux, HTML, CSS, SASS, and sprinkled some GSAP magic for smooth, delightful interactions. Every component was designed to be reusable, scalable, and load faster than your coffee order.',
    impact: 'By blending clean code with smart UI patterns, we helped Coral deliver digital products that actually hit business goals—boosting engagement and keeping clients grinning while their users stay hooked.',
    keyContributions: ['React.js & Redux Architecture', 'Dynamic UI/UX with GSAP Animations', 'Scalable, Clean HTML/CSS/SASS Components', 'Interactive Prototypes & Micro-Interactions', 'Frontend Strategy & Optimization'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/coral/mobile/7.png'), prefixed('/api/images/work/coral/mobile/8.png'), prefixed('/api/images/work/coral/mobile/9.png'), prefixed('/api/images/work/coral/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/coral.mp4'),
      sequences: [prefixed('/videos/work/coral/part-01-export.mp4'), prefixed('/videos/work/coral/part-02-export.mp4'), prefixed('/videos/work/coral/part-03-export.mp4'), prefixed('/videos/work/coral/part-04-export.mp4')]
    },
    bgColor: 'blue',
    path: 'coral',
    testimonial: 'Working with Abdul was like having a frontend wizard in the team. Clean code, fast iterations, and a sense of humor that made even debugging fun!',
    testimonialAuthor: 'Devin Picciolini',
    testimonialAuthorPosition: 'CEO, Coral'
  },
  {
    slug: 'goldendao',
    title: 'Golden DAO',
    websiteUrl: 'https://www.goldendao.xyz',
    industry: 'Blockchain',
    shortIntro: 'I helped GoldenDAO come alive — a community-first Web3 experience bridging culture and code, built with React, Redux, and a sprinkle of magic.',
    overview: 'GoldenDAO started as a bold idea: how do we make a blockchain community feel human, playful, and purposeful at the same time? I worked closely with the team to translate that vision into a clean, responsive, and fast frontend — turning abstract concepts into tangible, pixel-perfect interactions.',
    approach: 'I architected a React + Redux frontend that balanced smooth animations with real-time NFT-gated access. Using HTML, SASS, and GSAP, every click, hover, and transition was optimized to feel effortless while keeping load times snappy. Along the way, I collaborated with designers and backend engineers to ensure that the frontend didn’t just look good — it worked reliably under the hood.',
    impact: 'The result? Users can now explore GoldenDAO’s NFT-exclusive events and community features without friction, feeling part of something bigger. The frontend experience merges Web3 innovation with intuitive, human-first design — making blockchain surprisingly fun and approachable.',
    keyContributions: ['React.js & Redux architecture', 'JavaScript-heavy UI interactions', 'HTML & SASS for responsive, polished layouts', 'GSAP animations for micro-interactions', 'NFT access-gated features'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [''],
    video: {
      originalFile: prefixed('/videos/work/goldendao.mp4'),
      sequences: [prefixed('/videos/work/goldendao/part-01-export.mp4'), prefixed('/videos/work/goldendao/part-02-export.mp4'), prefixed('/videos/work/goldendao/part-03-export.mp4'), prefixed('/videos/work/goldendao/part-04-export.mp4'), prefixed('/videos/work/goldendao/part-05-export.mp4')]
    },
    bgColor: 'cyan',
    path: 'goldendao',
    testimonial: 'Working with Abdul was like watching a frontend ninja at work — fast, precise, and somehow making everything feel effortless.',
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
