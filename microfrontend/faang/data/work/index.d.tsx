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
    careers: {
      heading: 'We’re Growing – Join Our Team',
      description: 'Let’s build the future, together.',
      link: '/careers',
      linkText: 'Explore Careers'
    },
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
      href: 'https://www.linkedin.com/company/dev8x/'
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
    overview: '**End-to-end no-code solution**. Aggregate enriched business data, connect instantly with prospects, and scale outreach without technical or marketing expertise.',
    approach: '**Smart search, clean UI, automation** simplify prospecting. Focus on deals while the platform handles data aggregation, filtering, and outreach pipelines.',
    impact: 'Saves time, cuts overhead, and improves lead quality. Enables measurable growth and smarter business development across **B2B sales pipelines**.',
    keyContributions: ['**B2B Lead Engine** delivering high-quality prospects', '**Data Aggregation & Enrichment** for reliable contacts', '**User-Centric Dashboard** with intuitive UX', '**Advanced Search & Filters** for faster results', '**Automated Outreach Pipelines** to scale efficiently'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/troophunter/mobile/7.png'), prefixed('/api/images/work/troophunter/mobile/8.png'), prefixed('/api/images/work/troophunter/mobile/9.png'), prefixed('/api/images/work/troophunter/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/troophunter/1080.mp4'),
      sequences: [prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4'), prefixed('/videos/work/troophunter/1080.mp4')]
    },
    bgColor: 'blue',
    path: 'troophunter',
    testimonial: '“**TroopHunter** evolved into a precise, scalable lead-generation asset. Clear expertise and attention to detail ensured years of reliable growth.”',
    testimonialAuthor: 'Abdul Rehman',
    testimonialAuthorPosition: 'CEO, Dev8X'
  },
  {
    slug: 'totalhealthdentalcare',
    title: 'Total Health Dental Care',
    websiteUrl: 'https://www.totalhealthdentalcare.com',
    industry: 'Healthcare / Dental Services',
    shortIntro: '**Digital-first dental care** serving 15,000+ patients in the Bay Area with fast, reliable, modern web apps and patient-focused tools.',
    overview: 'Partnered with **Dev8X** to modernize patient experience, integrating **React**, **Flutter**, and backend automation for seamless dental care operations.',
    approach: 'Custom mobile apps, **CRM modules**, and workflow automations streamline operations and enhance accessibility, making care intuitive, fast, and patient-centric.',
    impact: 'A tech-forward healthcare platform enabling Total Health Dental Care to innovate, expand reach, and lead with operational and patient-experience excellence.',
    keyContributions: ['**API Development & Integration**', '**Flutter Mobile Features**', '**Workflow Automation Scripts**', '**Custom CRM Module Development**', '**Virtual Consultation Tools**'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/totalhealthdentalcare/mobile/7.png'), prefixed('/api/images/work/totalhealthdentalcare/mobile/8.png'), prefixed('/api/images/work/totalhealthdentalcare/mobile/9.png'), prefixed('/api/images/work/totalhealthdentalcare/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/totalhealthdentalcare.mp4'),
      sequences: [prefixed('/videos/work/totalhealthdentalcare/part-01-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-03-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-05-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-02-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-04-export.mp4'), prefixed('/videos/work/totalhealthdentalcare/part-06-export.mp4')]
    },
    bgColor: 'cyan',
    path: 'totalhealthdentalcare',
    testimonial: '"Dev8X guided us through every step, turning our vision into a patient-focused, tech-driven platform—smooth, precise, and highly effective."',
    testimonialAuthor: 'Sepand Hokmabadi',
    testimonialAuthorPosition: 'CEO, Total Health Dental Care'
  },
  {
    slug: 'scheduler',
    title: 'Scheduler',
    websiteUrl: 'https://schedule.totalhealthdentalcare.com',
    industry: 'Healthcare / Dental Service',
    shortIntro: '**Scheduler** simplifies patient booking with real-time availability, rescheduling, and automated notifications across **Total Health Dental Care’s** digital platform.',
    overview: '**Scheduler** ensures efficient, patient-friendly scheduling. Integrates calendars, notifications, and workflows to reduce friction for patients and staff across the **healthcare** platform.',
    approach: 'Focused on automation and UX, **Scheduler** lets patients book, cancel, or reschedule effortlessly while staff manage appointments efficiently with backend and mobile integration.',
    impact: 'Improved efficiency and patient satisfaction. Reduced no-shows, streamlined workflows, and enhanced scheduling accuracy across **Total Health Dental Care’s** network.',
    keyContributions: ['Smart Booking Engine', 'Calendar Sync & Availability Management', 'Patient Notification System', 'Staff Workflow Automation', 'Integration with Mobile & CRM Tools'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/scheduler/mobile/7.png'), prefixed('/api/images/work/scheduler/mobile/8.png'), prefixed('/api/images/work/scheduler/mobile/9.png'), prefixed('/api/images/work/scheduler/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/scheduler.mp4'),
      sequences: [prefixed('/videos/work/scheduler/part-01-export.mp4'), prefixed('/videos/work/scheduler/part-02-export.mp4'), prefixed('/videos/work/scheduler/part-03-export.mp4'), prefixed('/videos/work/scheduler/part-04-export.mp4')]
    },
    bgColor: 'blue',
    path: 'scheduler',
    testimonial: 'We saw faster bookings, fewer no-shows, and smoother workflows. **Dev8X** delivered a reliable, polished solution that truly works.',
    testimonialAuthor: 'Sepand Hokmabadi',
    testimonialAuthorPosition: 'CEO, Total Health Dental Care'
  },
  {
    slug: 'honeydu',
    title: 'Honeydu',
    websiteUrl: 'https://www.honeydu.io',
    industry: 'Fintech',
    shortIntro: '**Honeydu** is a mobile-first invoicing app for freelancers and creators, making finance management simple, fast, and intuitive.',
    overview: '**Built for creative professionals**, Honeydu replaces complex tools with a streamlined experience. Intuitive workflows keep invoicing effortless, so users focus on their craft.',
    approach: 'Designed with **simplicity** in mind. Custom workflows, clear UI, and lightweight interactions let users manage finances without friction or distraction.',
    impact: '**Honeydu** delivers a standout fintech platform through thoughtful design, mobile optimization, and strategic integration, evolving with users and modern business needs.',
    keyContributions: ['Built responsive UI with **React**', 'Created APIs using **Node.js**', 'Integrated payment systems', 'Optimized mobile performance', 'Set up **CI/CD** pipelines'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [''],
    video: {
      originalFile: prefixed('/videos/work/honeydu.mp4'),
      sequences: [prefixed('/videos/work/honeydu/part-01-export.mp4'), prefixed('/videos/work/honeydu/part-02-export.mp4'), prefixed('/videos/work/honeydu/part-03-export.mp4'), prefixed('/videos/work/honeydu/part-04-export.mp4')]
    },
    bgColor: 'cyan',
    path: 'honeydu',
    testimonial: 'Dev8X elevated our **UX** and website quality. Their speed, professionalism, and clarity made development seamless from start to finish.',
    testimonialAuthor: 'Devin Picciolini',
    testimonialAuthorPosition: 'CEO, Coral'
  },
  {
    slug: 'coral',
    title: 'Coral',
    websiteUrl: 'https://www.coral.global',
    industry: 'Consulting & Venture Studio',
    shortIntro: 'Empowering businesses with **digital strategy**, design, and engineering for scalable, modern solutions that drive growth and innovation.',
    overview: 'Coral partners with companies to build **tech-driven experiences**, combining strategy, UX, and engineering for measurable business impact.',
    approach: 'Ex-Instagram experts deliver **interactive prototypes**, agile development, and brand-driven design to align technology with client goals.',
    impact: 'Clients thrive with adaptable, modern digital products that boost engagement, efficiency, and market relevance.',
    keyContributions: ['**Digital Strategy & UX**', '**Brand-Driven UI Design**', '**Interactive Prototyping**', '**Agile Web Development**', '**Technology Consulting**'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [prefixed('/api/images/work/coral/mobile/7.png'), prefixed('/api/images/work/coral/mobile/8.png'), prefixed('/api/images/work/coral/mobile/9.png'), prefixed('/api/images/work/coral/mobile/10.png')],
    video: {
      originalFile: prefixed('/videos/work/coral.mp4'),
      sequences: [prefixed('/videos/work/coral/part-01-export.mp4'), prefixed('/videos/work/coral/part-02-export.mp4'), prefixed('/videos/work/coral/part-03-export.mp4'), prefixed('/videos/work/coral/part-04-export.mp4')]
    },
    bgColor: 'blue',
    path: 'coral',
    testimonial: 'Working with **Dev8X** was seamless. They listened, delivered fast, and created a digital solution exceeding our expectations.',
    testimonialAuthor: 'Devin Picciolini',
    testimonialAuthorPosition: 'CEO, Coral'
  },
  {
    slug: 'goldendao',
    title: 'Golden DAO',
    websiteUrl: 'https://www.goldendao.xyz',
    industry: 'Blockchain',
    shortIntro: 'GoldenDAO is a **community-led Web3** platform promoting AAPI empowerment, built with **Dev8X** and **Andrew Yang**. *Membership meets culture digitally.*',
    overview: 'Partnering with **Dev8X**, Yang launched a **blockchain ecosystem** blending identity, innovation, and culture. **GoldenDAO** enables immersive digital experiences and community engagement.',
    approach: 'NFT-gated **UX** ensures exclusive access to events. **Dev8X** led **frontend**, **Node.js**, and community activations. *Feels like culture, not just code.*',
    impact: 'Created a bold, connected platform merging **real-world events** with **decentralized access**, strengthening cultural leadership and digital belonging.',
    keyContributions: ['**React** & **Node.js** frontend', '**Ethereum smart contracts**', '**NFT access controls**', 'Real-time event features', 'Decentralized app design'],
    placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
    images: [''],
    video: {
      originalFile: prefixed('/videos/work/goldendao.mp4'),
      sequences: [prefixed('/videos/work/goldendao/part-01-export.mp4'), prefixed('/videos/work/goldendao/part-02-export.mp4'), prefixed('/videos/work/goldendao/part-03-export.mp4'), prefixed('/videos/work/goldendao/part-04-export.mp4'), prefixed('/videos/work/goldendao/part-05-export.mp4')]
    },
    bgColor: 'cyan',
    path: 'goldendao',
    testimonial: '**Dev8X** turned our vision into an interactive **Web3 experience**. Their collaboration and precision were exceptional.',
    testimonialAuthor: 'Andrew Yang',
    testimonialAuthorPosition: 'CEO, Golden DAO'
  }
];

export default PageData;
