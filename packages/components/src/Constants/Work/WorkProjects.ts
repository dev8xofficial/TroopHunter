import { WorkDetail, WorkGridCard } from '../../Interfaces/Work/WorkProjectTypes';

export const WORK_PROJECTS: WorkDetail[] = [
  {
    slug: 'totalhealthdentalcare',
    title: 'Total Health Dental Care',
    websiteUrl: 'https://www.totalhealthdentalcare.com',
    industry: 'Healthcare',
    shortIntro: 'Redefining dental care through holistic approaches and advanced technology.',
    overview: 'Total Health Dental Care offers a holistic approach to dentistry, focusing on overall wellness and prevention.',
    approach: 'They integrate herbal mouth rinses, ozone therapy, and in-office 3D printing to deliver state-of-the-art care.',
    impact: 'With all dental specialists under one roof, they ensure a collaborative, patient-centric environment that redefines the dental experience.',
    keyContributions: [],
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
    industry: 'Financial Technology',
    shortIntro: 'Simplifying invoicing for creators and freelancers.',
    overview: 'Honeydu is a mobile app tailored for freelancers and creators who need a simple way to manage finances.',
    approach: 'It streamlines invoicing and payment tracking through an intuitive interface designed for ease of use.',
    impact: 'By simplifying financial tasks, Honeydu helps users stay organized, save time, and gain better control over their income.',
    keyContributions: [],
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
    industry: 'Digital Consulting',
    shortIntro: 'Empowering businesses through strategic digital solutions.',
    overview: 'Coral is a digital consulting and venture studio partnering with businesses to build a better digital future.',
    approach: 'The team, which includes former Instagram employees, provides deep expertise in strategy, design, and engineering.',
    impact: 'By aligning business goals with innovative technology, Coral enables clients to adapt and thrive in the digital age.',
    keyContributions: [],
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
    shortIntro: 'A decentralized autonomous organization promoting AAPI empowerment.',
    overview: 'Golden DAO is a community-led organization focused on empowering the AAPI community using blockchain.',
    approach: 'It uses decentralized governance and Web3 tools to support cultural, educational, and community-building initiatives.',
    impact: 'Golden DAO fosters awareness, inclusion, and representation, helping the AAPI community build a strong voice in the digital economy.',
    keyContributions: [],
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
