import { OffersContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';

const WEBSITE: OffersContent[] = [
  {
    slug: '',
    variant: 'pink',
    tagText: 'Enterprise-Grade Web Apps',
    heading: 'Custom Web Applications',
    paragraph: 'Dev8X builds advanced, scalable web applications using modern tech stacks, enabling measurable impact on conversions, engagement, and digital growth.',
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
      title: 'Why Our Web Apps Excel',
      paragraph: 'We deliver high-performance, secure, and scalable web apps designed to solve real business challenges.',
      items: [
        {
          title: 'High Performance',
          description: 'Utilizing React.js, Next.js, and TypeScript, Dev8X ensures web apps handle heavy loads with fast, glitch-free performance.',
          icon: { name: 'RefreshIcon', width: 28 }
        },
        {
          title: 'Integration Ready',
          description: 'Web apps integrate seamlessly with RESTful APIs, third-party services, and microservices for feature-rich, connected experiences.',
          icon: { name: 'BackendIcon', width: 26 }
        },
        {
          title: 'End-to-End Security',
          description: 'Dev8X implements authentication, authorization, and encryption standards, ensuring data integrity and enterprise-grade protection.',
          icon: { name: 'AIBrainIcon', width: 26 }
        },
        {
          title: 'Scalable Architecture',
          description: 'Apps are architected using PostgreSQL, Sequelize ORM, and modular backend patterns, ready to scale with your business growth.',
          icon: { name: 'SeismometerIcon', width: 22 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Web Portals',
        paragraph: 'Dev8X crafts enterprise-grade web portals, optimized for heavy traffic, vendor integrations, and seamless user experiences across all devices.',
        icon: { name: 'HomeIcon', width: 26 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Progressive Web Apps',
        paragraph: 'Our PWAs leverage service workers and offline capabilities, delivering near-native performance, push notifications, and cross-platform reliability.',
        icon: { name: 'HomeIcon', width: 26 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Single-Page Applications',
        paragraph: 'Using SPA architectures with React.js and Next.js, we create fast, flexible applications with smooth navigation and minimal reloads.',
        icon: { name: 'BotIcon', width: 26 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/26.png')
      },
      {
        title: 'Marketplace & AI Apps',
        paragraph: 'Dev8X builds complex two-sided marketplaces and AI/ML-powered applications with optimized backend APIs, responsive interfaces, and end-to-end workflows.',
        icon: { name: 'BotIcon', width: 26 },
        image: prefixed('/api/images/work/scheduler/desktop/29.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Ready to ',
      end: 'get started?'
    },
    meta: {
      title: 'Custom Web Applications | Dev8X — Scalable Web Solutions',
      description: 'Dev8X delivers enterprise-grade custom web applications. Our solutions use Next.js, React.js, Node.js, TypeScript, PostgreSQL, and modern DevOps for performance, security, and scalability.'
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
        comment: '“They simplified the entire process and made tech feel less overwhelming. Really happy with the results.”'
      },
      {
        name: 'Devin Picciolini',
        company: 'Coral',
        bgColor: '#4C21E2',
        color: '#F0EBFF',
        transformOrigin: 'center top',
        image: prefixed('/api/images/work/honeydu/desktop/24.png'),
        comment: '“We had a vague idea — they turned it into a working solution without any stress. Great experience!”'
      }
    ],
    faqs: [
      {
        title: '1. How fast can we start?',
        description: 'Most clients kick off within 5–7 days, with vetted engineers integrated directly into your workflow.'
      },
      {
        title: '2. Are developers fully dedicated?',
        description: 'Yes, each engineer works 160 hours per month exclusively on your product — no multitasking or shared bandwidth.'
      },
      {
        title: '3. How do we manage communication?',
        description: 'Collaboration happens via Slack or Teams, task tracking in ClickUp or Jira, and code reviews in GitHub.'
      },
      {
        title: '4. Can I directly manage developers?',
        description: 'Absolutely. Direct management is standard, with optional tech lead supervision available for oversight.'
      },
      {
        title: '5. Can we scale quickly?',
        description: 'Add developers or upgrade to a Mini Squad within 72 hours, maintaining same standards and vetting.'
      }
    ],
    capabilitiesHeading: 'Technologies & Expertise',
    capabilities: [
      {
        heading: 'Frontend',
        items: [
          { name: 'React.js', image: '' },
          { name: 'Next.js', image: '' },
          { name: 'TypeScript', image: '' },
          { name: 'Redux Thunk', image: '' },
          { name: 'HTML5', image: '' },
          { name: 'TailwindCSS', image: '' },
          { name: 'GSAP', image: '' },
          { name: 'Responsive & Mobile-first', image: '' }
        ]
      },
      {
        heading: 'Backend & Databases',
        items: [
          { name: 'Node.js', image: '' },
          { name: 'Express.js', image: '' },
          { name: 'RESTful APIs', image: '' },
          { name: 'PostgreSQL', image: '' },
          { name: 'Sequelize ORM', image: '' },
          { name: 'Authentication', image: '' },
          { name: 'Authorization', image: '' },
          { name: 'Microservices Patterns', image: '' }
        ]
      },
      {
        heading: 'DevOps & Cloud',
        items: [
          { name: 'Docker', image: '' },
          { name: 'CI/CD Pipelines', image: '' },
          { name: 'Kubernetes', image: '' },
          { name: 'Terraform', image: '' }
        ]
      },
      {
        heading: 'Code Quality & Workflow',
        items: [
          { name: 'ESLint', image: '' },
          { name: 'Prettier', image: '' },
          { name: 'Git Feature Branching', image: '' },
          { name: 'GitHub Pull Requests', image: '' },
          { name: 'TurboRepo', image: '' },
          { name: 'Monorepo Architecture', image: '' },
          { name: 'Testing & Debugging', image: '' },
          { name: 'Performance Optimization', image: '' }
        ]
      },
      {
        heading: 'Full-Stack & Delivery',
        items: [
          { name: 'End-to-End Ownership', image: '' },
          { name: 'Cross-Functional Collaboration', image: '' },
          { name: 'Scalable Architecture', image: '' },
          { name: 'Rapid Deployment', image: '' },
          { name: 'Maintenance & Support', image: '' },
          { name: 'High Availability', image: '' },
          { name: 'Analytics & Reporting', image: '' },
          { name: 'Secure Integrations', image: '' }
        ]
      }
    ]
  }
];

export default WEBSITE;
