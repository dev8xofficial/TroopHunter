import { OffersContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';

const WEBSITE: OffersContent[] = [
  {
    slug: '',
    variant: 'pink',
    tagText: '',
    heading: 'Custom web applications',
    paragraph: 'Upsilon is a web app development company that builds high-tech web-based solutions of any complexity - from two-sided marketplaces to AI/ML applications.Our experts leverage superior market know-how and the best-in-class technologies for web application design and development. Our solutions will raise your brand awareness, increase conversions, boost customer engagement and help your digital business get ahead of competition.',
    heroButtons: [
      {
        label: 'See Pricing',
        href: prefixed('/pricing/tech-founders'),
        target: '_blank'
      },
      {
        label: 'Schedule a Call',
        modalType: 'schedulecall'
      }
    ],
    image: prefixed('/api/images/services/web-applications/1.png'),
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
    ],
    capabilitiesHeading: 'Technologies We Use for Web Application Development',
    capabilities: [
      {
        heading: 'Back-end',
        items: [
          { name: 'Python', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637278915e54a8355b3e1d52_python.webp' },
          { name: 'Django', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35caaa74ba0bc7d25c29_django.webp' },
          { name: 'Node JS', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35cb747fce613622812b_nodejs.webp' },
          { name: 'FastAPI', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35c954cf5c7584730437_fastapi.webp' }
        ]
      },
      {
        heading: 'Front-end developers',
        items: [
          { name: 'React', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35ca0bed669b2a390257_react.webp' },
          { name: 'Next JS', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35ca619e3e2ecd6da7a9_nextjs.webp' },
          { name: 'Gatsby', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35ca1e7cca2f317d6899_gatsby.webp' }
        ]
      },
      {
        heading: 'Deployment',
        items: [
          { name: 'Amazon EC2', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35c9aa74ba9c36d25c28_amazon-ec2.webp' },
          { name: 'AWS CloudFront', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35ca6899cd0701fc956c_aws-cloudront.webp' },
          { name: 'Amazon S3', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35ca673ed8ae5439f724_amazon-s3.webp' },
          { name: 'Amazon RDS', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35ca1e7cca441a7d6898_amazon-rds.webp' },
          { name: 'AWS ECS ECR', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35ca94ff56ceb4d8fba2_aws-ecs-ecr.webp' },
          { name: 'AWS Lambda', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35ca673ed8896539f723_aws-labda.webp' },
          { name: 'Google Cloud Platform', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35ca0d186164f4793f22_google-cloud-platform.webp' }
        ]
      }
    ],
    faqs: [
      { title: '1. How fast can we kick off?', description: 'Most clients start within 5–7 days. We shortlist vetted engineers, align on goals, and integrate directly into your workflow — no hiring lag.' },
      { title: '2. Are your developers fully dedicated?', description: 'Yes. Every engineer works full-time (160 hrs/month) on your product — no multitasking or shared bandwidth.' },
      { title: '3. How do we communicate and manage work?', description: 'You’ll collaborate in Slack or Teams, track tasks in ClickUp or Jira, and review code in GitHub — full visibility, async-friendly.' },
      { title: '4. Can I manage the developer directly?', description: 'Absolutely. You get direct control, or choose optional tech lead supervision for managed oversight and quality assurance.' },
      { title: '5. What if I need to scale or pivot quickly?', description: 'You can add more developers or upgrade to a Mini Squad within 72 hours — same vetting, same standards, zero onboarding friction.' },
      { title: '6. How do you ensure code quality and reliability?', description: 'Every developer works under senior supervision, with daily code reviews, automated CI/CD pipelines, and strict documentation practices.' },
      { title: '7. Where are your developers based?', description: 'All engineers are based in Pakistan, working U.S.-aligned hours with fluent written English and clear communication standards.' },
      { title: '8. What’s your pricing and payment model?', description: 'Flexible monthly contracts — no lock-ins. Pay via Stripe, Wise, or bank transfer. Choose bi-weekly billing or quarterly prepay discounts.' },
      { title: '9. Do you handle NDAs and IP ownership?', description: 'Yes. Every engagement includes NDA, IP transfer, and confidentiality clauses — your code and IP remain fully yours.' },
      { title: '10. How do you compare to freelance platforms or agencies?', description: 'We’re not a marketplace. All engineers are pre-vetted employees, trained for consistency, velocity, and startup-grade execution.' }
    ]
  }
];

export default WEBSITE;
