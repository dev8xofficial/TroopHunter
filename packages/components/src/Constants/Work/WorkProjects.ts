import { WorkDetail, WorkGridCard } from '../../Interfaces/Work/WorkProjectTypes';

export const WORK_PROJECTS: WorkDetail[] = [
  {
    slug: 'totalhealthdentalcare',
    title: 'Total Health Dental Care',
    websiteUrl: 'https://www.totalhealthdentalcare.com',
    industry: 'Healthcare / Dental Services',
    shortIntro: 'Total Health Dental Care is a pioneering dental care provider delivering patient-centric solutions across the Bay Area.',
    overview: 'Following an ambitious digital transformation, Total Health Dental Care partnered with Dev8X to create a connected ecosystem of tools and experiences that redefined patient engagement and operational excellence in modern dentistry.',
    approach: 'From a custom mobile app to powerful backend tools, every element of the platform was designed to enhance accessibility, streamline operations, and elevate the dental care experience for over 15,000 active patients.',
    impact: 'The result is a future-forward healthcare platform that merges technology with care, enabling Total Health Dental Care to lead with innovation and expand its impact in a competitive market.',
    keyContributions: ['API Development & Integration', 'Flutter Mobile Features', 'Workflow Automation Scripts', 'Custom CRM Module Development', 'Virtual Consultation Tools'],
    placeholderImage: '/images/placeholder/1080.png',
    images: [''],
    video: '/videos/work/crm.mp4',
    bgColor: 'cyan',
    path: 'totalhealthdentalcare'
  },
  {
    slug: 'honeydu',
    title: 'Honeydu',
    websiteUrl: 'https://www.honeydu.io',
    industry: 'Fintech',
    shortIntro: 'Honeydu is a modern invoicing app crafted specifically for freelancers and creators, redefining how independent professionals manage their finances.',
    overview: 'Conceived to address the shortcomings of traditional tools, Honeydu offers a streamlined mobile-first experience, making invoicing accessible, intuitive, and tailored to the rhythms of creative work.',
    approach: 'Designed from the ground up with simplicity and usability in mind, the app’s interface emphasizes clarity, while custom workflows remove unnecessary complexity. The result is a lightweight financial companion that lets users focus on what matters most—their craft.',
    impact: 'With thoughtful engineering, strategic partnerships, and an obsessive attention to design, Honeydu delivers a purpose-built platform that evolves with its users and stands apart in a crowded fintech landscape.',
    keyContributions: ['Built responsive UI with React', 'Created APIs using Node.js', 'Integrated payment systems', 'Optimized mobile performance', 'Set up CI/CD pipelines'],
    placeholderImage: '/images/placeholder/1080.png',
    images: [''],
    video: '/videos/work/honeydu.mp4',
    bgColor: 'green',
    path: 'honeydu'
  },
  {
    slug: 'coral',
    title: 'Coral',
    websiteUrl: 'https://www.coral.global',
    industry: 'Consulting & Venture Studio',
    shortIntro: 'Empowering businesses through strategic digital solutions.',
    overview: 'Coral is a digital consulting and venture studio partnering with businesses to build a better digital future.',
    approach: 'The team, which includes former Instagram employees, provides deep expertise in strategy, design, and engineering.',
    impact: 'By aligning business goals with innovative technology, Coral enables clients to adapt and thrive in the digital age.',
    keyContributions: ['Digital Strategy & UX', 'Brand-Driven UI Design', 'Interactive Prototyping', 'Agile Web Development', 'Technology Consulting'],
    placeholderImage: '/images/placeholder/1080.png',
    images: [''],
    video: '/videos/work/coral.mp4',
    bgColor: 'blue',
    path: 'coral'
  },
  {
    slug: 'goldendao',
    title: 'Golden DAO',
    websiteUrl: 'https://www.goldendao.xyz',
    industry: 'Blockchain',
    shortIntro: 'GoldenDAO is a pioneering community-led initiative championing AAPI empowerment through Web3, created in collaboration with Dev8X and Andrew Yang.',
    overview: 'In response to a cultural and technological shift, Dev8X partnered with Yang to craft a digital ecosystem that embodied unity, innovation, and representation. GoldenDAO was envisioned as a tactile, immersive platform where identity meets blockchain infrastructure.',
    approach: 'The user experience was anchored by an NFT-gated interface, enabling exclusive access to events and gatherings while also offering a sense of digital belonging. Dev8X’s role extended beyond design and engineering — shaping community rituals, facilitating in-person activations, and helping establish GoldenDAO as a hub of purpose-driven engagement.',
    impact: 'The result is a bold and meaningful experience that seamlessly blends real-world connection with blockchain-powered membership, fostering a new era of cultural leadership and solidarity.',
    keyContributions: ['React & Node.js development', 'Ethereum smart contracts', 'NFT access controls', 'Real-time event features', 'Decentralized app design'],
    placeholderImage: '/images/placeholder/1080.png',
    images: [''],
    video: '/videos/work/golden-dao.mp4',
    bgColor: 'cyan',
    path: 'goldendao'
  }
];

export const WORK_PROJECTS_GRID_DATA: WorkGridCard[] = WORK_PROJECTS.map((item) => {
  if (item.images.length < 2) {
    return {
      variant: 'landscape',
      space: 'inner',
      bgColor: item.bgColor,
      title: item.title,
      images: item.images,
      video: item.video,
      path: item.path
    };
  } else {
    return item.images.map((image) => ({
      variant: 'portrait',
      space: 'outer',
      bgColor: item.bgColor,
      title: item.title,
      images: item.images,
      video: item.video,
      path: item.path
    }));
  }
});
