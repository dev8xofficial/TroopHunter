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
      heading: 'We work globally',
      email: 'contact@dev8x.com',
      buttonText: 'Submit a brief'
    },
    offices: [
      {
        country: 'Pakistan',
        city: 'Lahore, Punjab (HQ)',
        phone: '+92 (329) 294-7777'
      },
      {
        country: 'USA',
        city: 'San Francisco, CA (Remote)',
        phone: '+1 (321) 300-2393'
      }
    ],
    // careers: {
    //   heading: 'We're Growing – Join Our Team',
    //   description: 'Let's build the future, together.',
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
      href: 'https://www.linkedin.com/company/dev8x/'
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
    shortIntro: 'Automated lead generation platform for fast, accurate prospect discovery.',
    overview: 'Led full-stack development and technical strategy for **TroopHunter**, creating dashboards, microservices, and scalable architecture for real-time lead insights.',
    approach: 'Implemented **Next.js** + **TypeScript** dashboards, **Node.js** microservices, **PostgreSQL** with **Sequelize**, **TurboRepo** monorepo, CI/CD pipelines using **Docker**, **Kubernetes**, **Terraform**, and **Ansible**. UX enhanced via **GSAP** & **Framer Motion**.',
    impact: 'Dashboards load instantly; filters and workflows are intuitive, enjoyable, and highly performant, delivering reliable lead generation with minimal friction.',
    keyContributions: ['**Next.js** & **TypeScript** frontend architecture', 'State management via **Redux Thunk**', '**GSAP** & **Framer Motion** for microinteractions', 'Monorepo setup with **TurboRepo**', 'CI/CD pipelines using **Docker**, **Kubernetes**, **Terraform**, **Ansible**', '**Node.js** & **Express** microservices', '**PostgreSQL** ORM via **Sequelize**', 'Authentication & authorization flows', 'Code quality enforcement with **ESLint**, **Prettier**', 'Git feature branching & pull request workflow'],
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
    testimonialAuthorPosition: 'CEO, Dev8X'
  },
  {
    slug: 'totalhealthdentalcare',
    title: 'Total Health Dental Care',
    websiteUrl: 'https://www.totalhealthdentalcare.com',
    industry: 'Healthcare / Dental Services',
    shortIntro: 'Corporate website redesign improving patient engagement and global presence.',
    overview: 'Revamped the **Total Health Dental Care** website with responsive design, scroll-based animations, interactive Mapbox GL office locator, and performance optimization.',
    approach: 'Implemented **React.js**, **TypeScript**, **GSAP**, **ScrollTrigger**, **Locomotive-Scroll**, **Mapbox GL**, and **ImagesLoaded** for high-performance, interactive UI.',
    impact: 'Increased website traffic by 20%, user engagement by 30%, and reduced load times by 40%, enhancing global patient experience.',
    keyContributions: ['Responsive, accessible website redesign with **TailwindCSS**', 'Scroll-based animations with **GSAP** and **ScrollTrigger**', 'Interactive office locator using **Mapbox GL**', 'Performance optimization with **ImagesLoaded** and polyfills', 'Cross-browser and mobile device compatibility', 'Enhanced UX with smooth scrolling and microinteractions', 'Integrated dynamic motion paths and advanced typography', 'Boosted conversion rates via intuitive navigation', 'Improved global patient engagement and retention', 'Higher visibility and brand presence online'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/totalhealthdentalcare/mobile/7.png'), prefixed('/api/images/work/totalhealthdentalcare/mobile/8.png'), prefixed('/api/images/work/totalhealthdentalcare/mobile/9.png'), prefixed('/api/images/work/totalhealthdentalcare/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/totalhealthdentalcare.mp4'),
      sequences: [prefixed('/videos/work/totalhealthdentalcare/part-01-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-03-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-05-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-02-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-04-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-06-export.mp4')]
    },
    bgColor: 'cyan',
    path: 'totalhealthdentalcare',
    testimonial: '“They simplified the entire process and made tech feel less overwhelming. Really happy with the results.”',
    testimonialAuthor: 'Sepand Hokmabadi',
    testimonialAuthorPosition: 'CEO, Total Health Dental Care'
  },
  {
    slug: 'scheduler',
    title: 'Scheduler',
    websiteUrl: 'https://schedule.totalhealthdentalcare.com',
    industry: 'Healthcare / Dental Service',
    shortIntro: 'Real-time scheduling web app for Total Health Dental Care, enhancing booking convenience and accessibility.',
    overview: 'Developed a **scheduler** web app allowing patients to select offices, pick dates and times, and securely pay, integrated with CRM and DentrixAscend.',
    approach: 'Built with **React.js**, **TypeScript**, **TailwindCSS**, and **GSAP** for animations, optimized with **ImagesLoaded** and polyfills for performance across devices.',
    impact: 'Reduced patient travel costs, improved satisfaction, and increased appointment booking efficiency across offices.',
    keyContributions: ['Intuitive booking interface with office selection', 'Patient registration and existing patient flow', 'Secure card payment collection', 'Integration with **CRM** and DentrixAscend', 'Responsive design using **TailwindCSS** + **HTML5**', 'Scroll and animation enhancements via **GSAP**', 'Performance optimization with **ImagesLoaded**', 'Reduced administrative overhead for staff', 'Increased patient appointment rates', 'Improved overall booking convenience and UX'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/scheduler/mobile/7.png'), prefixed('/api/images/work/scheduler/mobile/8.png'), prefixed('/api/images/work/scheduler/mobile/9.png'), prefixed('/api/images/work/scheduler/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/scheduler.mp4'),
      sequences: [prefixed('/videos/work/scheduler/part-01-export.mp4'), prefixed('/videos/work/scheduler/part-02-export.mp4'), prefixed('/videos/work/scheduler/part-03-export.mp4'), prefixed('/videos/work/scheduler/part-04-export.mp4')]
    },
    bgColor: 'blue',
    path: 'scheduler',
    testimonial: '“They simplified the entire process and made tech feel less overwhelming. Really happy with the results.”',
    testimonialAuthor: 'Sepand Hokmabadi',
    testimonialAuthorPosition: 'CEO, Total Health Dental Care'
  },
  {
    slug: 'honeydu',
    title: 'Honeydu',
    websiteUrl: 'https://www.honeydu.io',
    industry: 'Fintech',
    shortIntro: 'Zero-fee payment and invoicing platform for creators and freelancers.',
    overview: 'Developed **Honeydu**, a mobile-first app to send/receive money, generate invoices, and track finances, enhancing user autonomy and financial clarity.',
    approach: 'Built using **React.js**, **TailwindCSS**, **HTML5**, and **JavaScript**, focusing on reusable components, responsive design, and real-time financial insights.',
    impact: 'Simplified money management, reduced transaction fees, and empowered users to stay on top of finances efficiently.',
    keyContributions: ['Zero-fee payment interface using **React.js** and **TailwindCSS**', 'Invoice generation and financial organization tools', 'Mobile-first, responsive user experience', 'Reusable components for scalability', 'Real-time insights into account balances', 'Streamlined payment processes for freelancers and creators', 'Enhanced user autonomy and financial decision-making', 'Improved clarity and usability of financial data', 'Optimized for cross-device performance', 'Reduced friction in everyday financial transactions'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [''],
    video: {
      originalFile: prefixed('/videos/work/honeydu.mp4'),
      sequences: [prefixed('/videos/work/honeydu/part-01-export.mp4'), prefixed('/videos/work/honeydu/part-02-export.mp4'), prefixed('/videos/work/honeydu/part-03-export.mp4'), prefixed('/videos/work/honeydu/part-04-export.mp4')]
    },
    bgColor: 'cyan',
    path: 'honeydu',
    testimonial: '“We had a vague idea — they turned it into a working solution without any stress. Great experience!”',
    testimonialAuthor: 'Devin Picciolini',
    testimonialAuthorPosition: 'CEO, Coral'
  },
  {
    slug: 'coral',
    title: 'Coral',
    websiteUrl: 'https://www.coral.global',
    industry: 'Consulting & Venture Studio',
    shortIntro: 'Responsive website and Web3 platform enhancements for Coral Lab.',
    overview: 'Built Coral’s company website and Web3 projects like **GoldenDAO** and **Honeydu**, focusing on responsive UI, UX animations, and Web3 interactions.',
    approach: 'Used **React.js**, **TailwindCSS**, **GSAP**, **SmoothScroller**, **HTML5**, and **SCSS** to create modern, interactive, mobile-first web experiences.',
    impact: "Improved brand presence, engagement, and Web3 community interaction. Honeydu's redesign enhanced clarity and mobile-first usability.",
    keyContributions: ['Responsive website design with **HTML5** and **SCSS**', 'UX animations with **GSAP** and **SmoothScroller**', 'Web3 integrations for **GoldenDAO** membership and voting', 'Reusable components and global state via **Redux**', 'Mobile-first interface for Honeydu payment system', 'Improved brand visibility and engagement metrics', 'Interactive and engaging web experience', 'Optimized site performance across devices', 'Facilitated NFT-gated experiences and exclusive events', 'Enhanced user satisfaction and accessibility'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/coral/mobile/7.png'), prefixed('/api/images/work/coral/mobile/8.png'), prefixed('/api/images/work/coral/mobile/9.png'), prefixed('/api/images/work/coral/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/coral.mp4'),
      sequences: [prefixed('/videos/work/coral/part-01-export.mp4'), prefixed('/videos/work/coral/part-02-export.mp4'), prefixed('/videos/work/coral/part-03-export.mp4'), prefixed('/videos/work/coral/part-04-export.mp4')]
    },
    bgColor: 'blue',
    path: 'coral',
    testimonial: '“We had a vague idea — they turned it into a working solution without any stress. Great experience!”',
    testimonialAuthor: 'Devin Picciolini',
    testimonialAuthorPosition: 'CEO, Coral'
  },
  {
    slug: 'goldendao',
    title: 'Golden DAO',
    websiteUrl: 'https://www.goldendao.xyz',
    industry: 'Blockchain',
    shortIntro: 'Web3 membership and community platform for AAPI empowerment.',
    overview: 'Developed **GoldenDAO** with NFT-gated membership, exclusive events, and voting system, engaging the AAPI Web3 community.',
    approach: 'Built with **React.js**, **Redux**, **TailwindCSS**, **GSAP**, and **HTML5** for dynamic interactions, responsive layouts, and engaging microinteractions.',
    impact: 'Advanced community solidarity and empowerment, provided members access to events, exclusive content, and governance participation.',
    keyContributions: ['Membership system with exclusive NFT-gated access', 'Voting and event participation features for members', 'Responsive UI using **TailwindCSS** and **HTML5**', 'Dynamic animations via **GSAP**', 'State management with **Redux**', 'Enhanced engagement through Web3 community interactions', 'Testing, debugging, and performance optimization', 'Continuous updates and maintenance for user satisfaction', 'Facilitated collaboration and contribution within AAPI community', 'Strengthened digital presence and empowerment for members'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [''],
    video: {
      originalFile: prefixed('/videos/work/goldendao.mp4'),
      sequences: [prefixed('/videos/work/goldendao/part-01-export.mp4'), prefixed('/videos/work/goldendao/part-02-export.mp4'), prefixed('/videos/work/goldendao/part-03-export.mp4'), prefixed('/videos/work/goldendao/part-04-export.mp4'), prefixed('/videos/work/goldendao/part-05-export.mp4')]
    },
    bgColor: 'cyan',
    path: 'goldendao',
    testimonial: '“We had a vague idea — they turned it into a working solution without any stress. Great experience!”',
    testimonialAuthor: 'Devin Picciolini',
    testimonialAuthorPosition: 'CEO, Coral'
  }
];

export default PageData;
