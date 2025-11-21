import { OffersContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';

const OFFERS: OffersContent[] = [
  {
    slug: 'real-estate',
    variant: 'green',
    tagText: 'For Tech Founders',
    heading: 'Custom web applications',
    paragraph: 'Upsilon is a web app development company that builds high-tech web-based solutions of any complexity - from two-sided marketplaces to AI/ML applications.Our experts leverage superior market know-how and the best-in-class technologies for web application design and development. Our solutions will raise your brand awareness, increase conversions, boost customer engagement and help your digital business get ahead of competition.',
    image: prefixed('/api/images/work/totalhealthdentalcare/mobile/1.png'),
    iconCards: {
      title: 'Highlights of Our Custom Web Apps',
      paragraph: 'We create impactful, efficient, and easy-to-use corporate and customer-facing web apps.',
      items: [
        {
          title: 'High performance',
          description: 'We make the most of performance engineering to ensure utmost performance of your web apps. Whether it’s a geo-based application set to support thousands of locations, or a multi-vendor marketplace, we’re here to enable glitch-free experiences.',
          icon: { name: 'RefreshIcon', width: 28 }
        },
        {
          title: 'Integration capabilities',
          description: 'By utilizing third-party integrations, we can add the best possible features to your software solution. Improve your web app with well-built microservices, video & text messaging, reporting and analytics functionality, and more.',
          icon: { name: 'BackendIcon', width: 26 }
        },
        {
          title: 'Security',
          description: 'Security is our priority in web app development. With end-to-end encryption, two-factor authentication, robust user access management implemented, all data, processes and operations within your web app will be maximally protected.',
          icon: { name: 'AIBrainIcon', width: 26 }
        },
        {
          title: 'Scalability',
          description: 'Using our vast experience across web application development projects, we will create a custom solution that will function without a hitch right after the deployment and in future, as your business grows.',
          icon: { name: 'SeismometerIcon', width: 22 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Web Portals',
        paragraph:
          'Our long-term experience in web portal development helps us to deliver the best result for our clients. We apply the most effective technologies to develop enterprise-grade and customer-focused, partner/vendor, learning, healthcare and other types of web portals.Our well-trained developers know how to implement all necessary functionality and represent it in a user-friendly format. Upsilon can also develop and test websites that can handle a huge number of user traffic and requests without system failures. Web portals with a high-load scalable architecture function smoothly and reliably allowing you to provide an engaging UX and increase ROI..',
        icon: { name: 'HomeIcon', width: 26 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Progressive Web Applications',
        paragraph:
          'Introduced and promoted by Google, PWA is recognized by Gartner as the one to substitute more than 50% of mobile native apps. This technology makes it possible to combine the best features of browsers and mobile apps, i.e. PWAs offer an alternative way to target and engage users and increase conversions. Why PWAs instead of web apps? They act as web pages but let you engage with customers through push notifications;They work across platforms and deliver a native-like user experience; They work when users have a weak or unstable Internet connection thanks to the Service Workers’ technology;They sync in the background and receive over-the-air updates without user interaction.',
        icon: { name: 'MapPinIcon', width: 24 },
        image: prefixed('/api/images/work/honeydu/desktop/10.png')
      },
      {
        title: 'Single-Page Applications',
        paragraph: 'Tap into our single-page application development services to stay competitive on the web and uncover a host of benefits for your business. We utilize the latest technology to deliver fast, efficient and flexible applications with cross-browser compatibility.Upsilon’s engineers will combine the best features of single-page applications (SPAs) to ensure excellent performance of your solution while providing end-users with a seamless web experience.',
        icon: { name: 'BotIcon', width: 26 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/26.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Ready to ',
      end: 'get started?'
    },
    meta: {
      title: 'Real Estate Development Services | Build Your Real Estate Platform — Dev8X | Dev8X: World-class digital products',
      description: 'Real Estate Development Services | Build Your Real Estate Platform — Dev8X | Dev8X: World-class digital products'
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
        href: 'https://www.linkedin.com/company/dev8xofficial/'
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
    ],
    testimonials: [
      {
        name: 'Sepand Hokmabadi',
        company: 'Total Health Dental Care',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: prefixed('/api/images/work/scheduler/mobile/7.png'),
        comment: 'As a non-technical founder, I searched for a tech partner I could trust. The Upsilon team was amazing and hands down the best specialists I could have asked for.'
      },
      {
        name: 'Devin Picciolini',
        company: 'Coral',
        bgColor: '#4C21E2',
        color: '#F0EBFF',
        transformOrigin: 'center top',
        image: prefixed('/api/images/work/honeydu/desktop/24.png'),
        comment: 'Their team had an ease of communication, but the most impressive thing about them is each member`s integrity and work ethic.'
      }
    ]
  }
];

export default OFFERS;
