import { ProposalContent, prefixed, getCompanyName } from '@repo/components';
import COMPANIES from './companies.d';

const PROPOSALS: ProposalContent[] = [
  {
    slug: '042deec5-c6a3-4bb0-9134-86fbab6875d6',
    variant: 'cyan',
    tagText: 'Company',
    heading: getCompanyName(COMPANIES, '8475e512-b410-473b-abae-e707aae40022') + " - Prototype",
    image: '',
    iconCards: {
      title: 'Real Estate Solutions',
      paragraph: 'For over a decade, The Burkes Group has been providing comprehensive real estate services in The Woodlands, TX. We combine traditional values with modern technology to deliver exceptional results.',
      items: [
        {
          title: 'Client Portal Access',
          description: 'Secure, 24/7 access to your transaction dashboard. Track progress, upload documents, and communicate with your agent—all from one centralized platform designed for clarity and ease of use.',
          icon: { name: 'DashboardIcon', size: 24 }
        },
        {
          title: 'Document Management',
          description: 'Streamlined document handling with e-signature capabilities, automatic notifications, and secure cloud storage. Never lose track of important paperwork with our organized system.',
          icon: { name: 'DocumentIcon', size: 22 }
        },
        {
          title: 'Real-Time Communication',
          description: 'Direct messaging with your dedicated agent, instant notifications for important updates, and scheduled appointment management—stay connected throughout your entire journey.',
          icon: { name: 'MessageIcon', size: 24 }
        },
        {
          title: 'Transaction Transparency',
          description: 'Visual progress tracking from initial consultation to closing day. Clear milestone indicators and automated updates keep you informed at every step of the buying or selling process.',
          icon: { name: 'ProgressIcon', size: 26 }
        }
      ]
    },
    proposal: {
      companyId: '8475e512-b410-473b-abae-e707aae40022',
      videoSrc: prefixed('/videos/proposals/042deec5-c6a3-4bb0-9134-86fbab6875d6/output.mp4'),
      poster: prefixed(''),
      tag: { text: '', backgroundColor: '', color: '' },
      date: '03.02.26',
      title: 'Real Estate Solution:',
      description: 'For over a decade, The Burkes Group has been providing comprehensive real estate services in The Woodlands, TX. We combine traditional values with modern technology to deliver exceptional results.',
      link: { href: '/share/042deec5-c6a3-4bb0-9134-86fbab6875d6', label: 'Share' }
    },
    contentAsideImageItems: [
      {
        title: 'Complete Transaction Visibility',
        paragraph: "Track every step of your real estate journey with our intuitive progress dashboard. From initial consultation to closing day, you'll always know exactly where you stand. Real-time updates, milestone notifications, and clear timelines ensure you're never left wondering about the status of your transaction.",
        icon: { name: 'VoltageIcon', size: 64 }
      },
      {
        title: 'Human experiences',
        paragraph: 'Offer an immersive user experience that captures the essence of your brand and resonates with your target audience. From intuitive navigation to immersive storytelling, every website is meticulously crafted to command attention and leave a lasting impression.',
        icon: { name: 'VoltageIcon', size: 64 }
      },
      {
        title: 'Robust, Secure, Flexible',
        paragraph: 'Every website we build is backed by secure and performant infrastructure, tailored to the needs of the organisation. This ensures that your digital presence can scale with demand and offer flexibility to meet the needs of your business over time.',
        icon: { name: 'VoltageIcon', size: 64 }
      },
      {
        title: 'Rewarding partnerships',
        paragraph: 'Behind every best-in-class website is a collaborative agency–client partnership. We work in close collaboration with you to ensure outcomes that offer extraordinary experiences while delivering results. Awards are nice, but your success means so much more.',
        icon: { name: 'VoltageIcon', size: 64 }
      }
    ],
    meta: {
      title: 'The Bunkers Group — Dev8X | Dev8X: World class digital products',
      description: 'An interactive data visualisation highlighting global surveillance connections'
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
      copyright: {
        year: '2026',
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
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
      },
      {
        name: 'Paula McCarville',
        company: 'Curtin University',
        bgColor: '#4C21E2',
        color: '#F0EBFF',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/4c0927054c/curtin-open-day.jpg',
        comment: 'From the very beginning, it was evident that the team truly grasped our brief and vision, effectively translating it into a remarkable reality.'
      },
      {
        name: 'Steph Jojart',
        company: 'Schrole',
        bgColor: '#1665A3',
        color: '#E8F5FF',
        transformOrigin: 'top center',
        image: 'https://a-us.storyblok.com/f/1017006/3488x3224/f6a5e2a115/schrole-1744px-x-1612px.jpg',
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'c326895f-4cf2-463b-8680-5483244d9a07',
    variant: 'cyan',
    tagText: 'Company',
    heading: getCompanyName(COMPANIES, '8475e512-b410-473b-abae-e707aae40022') + " - Proposal",
    image: '',
    iconCards: {
      title: 'Real Estate Solutions',
      paragraph: 'For over a decade, The Burkes Group has been providing comprehensive real estate services in The Woodlands, TX. We combine traditional values with modern technology to deliver exceptional results.',
      items: [
        {
          title: 'Client Portal Access',
          description: 'Secure, 24/7 access to your transaction dashboard. Track progress, upload documents, and communicate with your agent—all from one centralized platform designed for clarity and ease of use.',
          icon: { name: 'DashboardIcon', size: 24 }
        },
        {
          title: 'Document Management',
          description: 'Streamlined document handling with e-signature capabilities, automatic notifications, and secure cloud storage. Never lose track of important paperwork with our organized system.',
          icon: { name: 'DocumentIcon', size: 22 }
        },
        {
          title: 'Real-Time Communication',
          description: 'Direct messaging with your dedicated agent, instant notifications for important updates, and scheduled appointment management—stay connected throughout your entire journey.',
          icon: { name: 'MessageIcon', size: 24 }
        },
        {
          title: 'Transaction Transparency',
          description: 'Visual progress tracking from initial consultation to closing day. Clear milestone indicators and automated updates keep you informed at every step of the buying or selling process.',
          icon: { name: 'ProgressIcon', size: 26 }
        }
      ]
    },
    proposal: {
      companyId: '8475e512-b410-473b-abae-e707aae40022',
      videoSrc: prefixed('/videos/proposals/c326895f-4cf2-463b-8680-5483244d9a07/output.mp4'),
      poster: prefixed(''),
      tag: { text: '', backgroundColor: '', color: '' },
      date: '03.02.26',
      title: 'Real Estate Solution:',
      description: 'For over a decade, The Burkes Group has been providing comprehensive real estate services in The Woodlands, TX. We combine traditional values with modern technology to deliver exceptional results.',
      link: { href: '/share/c326895f-4cf2-463b-8680-5483244d9a07', label: 'Share' }
    },
    contentAsideImageItems: [
      {
        title: 'Complete Transaction Visibility',
        paragraph: "Track every step of your real estate journey with our intuitive progress dashboard. From initial consultation to closing day, you'll always know exactly where you stand. Real-time updates, milestone notifications, and clear timelines ensure you're never left wondering about the status of your transaction.",
        icon: { name: 'VoltageIcon', size: 64 }
      },
      {
        title: 'Human experiences',
        paragraph: 'Offer an immersive user experience that captures the essence of your brand and resonates with your target audience. From intuitive navigation to immersive storytelling, every website is meticulously crafted to command attention and leave a lasting impression.',
        icon: { name: 'VoltageIcon', size: 64 }
      },
      {
        title: 'Robust, Secure, Flexible',
        paragraph: 'Every website we build is backed by secure and performant infrastructure, tailored to the needs of the organisation. This ensures that your digital presence can scale with demand and offer flexibility to meet the needs of your business over time.',
        icon: { name: 'VoltageIcon', size: 64 }
      },
      {
        title: 'Rewarding partnerships',
        paragraph: 'Behind every best-in-class website is a collaborative agency–client partnership. We work in close collaboration with you to ensure outcomes that offer extraordinary experiences while delivering results. Awards are nice, but your success means so much more.',
        icon: { name: 'VoltageIcon', size: 64 }
      }
    ],
    meta: {
      title: 'The Bunkers Group — Dev8X | Dev8X: World class digital products',
      description: 'An interactive data visualisation highlighting global surveillance connections'
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
      copyright: {
        year: '2026',
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
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
      },
      {
        name: 'Paula McCarville',
        company: 'Curtin University',
        bgColor: '#4C21E2',
        color: '#F0EBFF',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/4c0927054c/curtin-open-day.jpg',
        comment: 'From the very beginning, it was evident that the team truly grasped our brief and vision, effectively translating it into a remarkable reality.'
      },
      {
        name: 'Steph Jojart',
        company: 'Schrole',
        bgColor: '#1665A3',
        color: '#E8F5FF',
        transformOrigin: 'top center',
        image: 'https://a-us.storyblok.com/f/1017006/3488x3224/f6a5e2a115/schrole-1744px-x-1612px.jpg',
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  }
];

export default PROPOSALS;
