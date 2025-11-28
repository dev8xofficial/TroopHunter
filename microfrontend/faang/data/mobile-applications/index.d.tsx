import { OffersContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';

const MOBILE: OffersContent[] = [
  {
    slug: '',
    variant: 'purple',
    tagText: 'End-to-End Mobile Solutions',
    heading: 'Custom Mobile Applications',
    paragraph: 'Dev8X delivers high-performance mobile apps using Flutter and the Dart ecosystem, producing native experiences for iOS and Android from a single codebase.',
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
    image: prefixed('/api/images/services/mobile-applications/1.png'),
    iconCards: {
      title: 'Highlights of Our Mobile Apps',
      paragraph: 'Our team builds fully responsive, cross-platform mobile solutions with scalable architecture, robust performance, and seamless user experiences.',
      items: [
        {
          title: 'Native Performance',
          description: 'Apps are developed with Flutter to ensure fast, smooth, and fully native performance across both iOS and Android devices.',
          icon: { name: 'RefreshIcon', width: 28 }
        },
        {
          title: 'Cross-Platform Efficiency',
          description: 'Using a single Dart codebase reduces development time and cost while maintaining platform-specific design and interactions.',
          icon: { name: 'BackendIcon', width: 26 }
        },
        {
          title: 'Live Updates',
          description: 'We implement over-the-air updates to deliver immediate enhancements and bug fixes, accelerating feedback loops and improving user satisfaction.',
          icon: { name: 'AIBrainIcon', width: 26 }
        },
        {
          title: 'Scalable Architecture',
          description: 'Our apps are designed with modular architecture and microservices patterns, enabling future expansion, integrations, and feature upgrades.',
          icon: { name: 'CardIcon', width: 26 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Cross-Platform Development',
        paragraph: 'We leverage Flutter for building versatile apps that run on multiple platforms while maintaining a native look and feel.',
        icon: { name: 'HomeIcon', width: 26 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Types of Mobile Apps',
        paragraph: 'From internal business apps to customer-facing solutions, Dev8X creates apps that drive productivity, engagement, and operational efficiency.',
        icon: { name: 'MapPinIcon', width: 24 },
        image: prefixed('/api/images/work/honeydu/desktop/10.png')
      },
      {
        title: 'UI/UX Excellence',
        paragraph: 'Our team focuses on responsive design, GSAP animations, and mobile-first engineering to deliver interfaces that delight users.',
        icon: { name: 'MagicWandIcon', width: 26 }
      },
      {
        title: 'Secure & Reliable',
        paragraph: 'With Node.js, Express.js, and PostgreSQL, we build backends that ensure security, authorization, authentication, and reliable data storage.',
        icon: { name: 'MapPinIcon', width: 24 },
        image: prefixed('/api/images/work/coral/desktop/10.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Ready to ',
      end: 'get started?'
    },
    meta: {
      title: 'Mobile Application Development Services | Dev8X | World-Class Apps',
      description: 'Dev8X builds high-performance, cross-platform mobile applications using Flutter and Dart, delivering scalable, native experiences for iOS and Android.'
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
        comment: 'They simplified the entire process and made tech feel less overwhelming\. Really happy with the results\.'
      },
      {
        name: 'Devin Picciolini',
        company: 'Coral',
        bgColor: '#4C21E2',
        color: '#F0EBFF',
        transformOrigin: 'center top',
        image: prefixed('/api/images/work/honeydu/desktop/24.png'),
        comment: 'We had a vague idea — they turned it into a working solution without any stress. Great experience!'
      }
    ],
    faqs: [
      {
        title: '1. What is a custom mobile application?',
        description: 'A custom mobile application is a tailored software solution built for specific business requirements, offering optimized performance and unique user experience.'
      },
      {
        title: '2. Why choose Flutter for app development?',
        description: 'Flutter enables cross-platform development with a single Dart codebase, delivering native performance, fast updates, and consistent UI on iOS and Android.'
      },
      {
        title: '3. How does Dev8X ensure app quality?',
        description: 'Through CI/CD pipelines, testing, code reviews, ESLint, Prettier, and automated deployment, ensuring reliable and maintainable applications.'
      },
      {
        title: '4. What types of apps can Dev8X build?',
        description: 'We deliver business productivity apps, customer-facing platforms, internal tools, and high-performance enterprise solutions, tailored to your workflows and objectives.'
      },
      {
        title: '5. How much does a mobile app cost?',
        description: 'Costs vary by complexity, integrations, and features. Typical projects range from $50,000 for MVPs to $200,000+ for fully-featured enterprise apps.'
      }
    ],
    offersSlider: [
      {
        id: '1',
        heading: 'Modern Real Estate Website',
        price: '$500',
        description: 'Responsive, high-conversion site for listings and agents',
        features: ['Property pages', 'Agent profiles', 'Testimonials', 'Contact forms'],
        categories: ['Website', 'Branding', 'SEO', 'Lead Capture', 'Fast Delivery', 'Responsive'],
        buttonText: 'Launch My Website',
        package: 'Website & Portal'
      },
      {
        id: '2',
        heading: 'Property Dashboard',
        price: '$280',
        description: 'Track listings, leads, and conversion performance',
        features: ['Charts & KPIs', 'Leads data', 'Traffic insights', 'Revenue trends'],
        categories: ['Analytics', 'Dashboard', 'Insights', 'Growth', 'Data'],
        buttonText: 'Install Analytics',
        package: 'Website & Portal'
      },
      {
        id: '3',
        heading: 'Hosting & Security Setup',
        price: '$200',
        description: 'Domain, SSL, and cloud deployment with backups',
        features: ['Domain setup', 'SSL config', 'Cloud hosting', 'Speed optimization'],
        categories: ['Hosting', 'Security', 'Cloud', 'Performance', 'Reliability'],
        buttonText: 'Set Up Hosting',
        package: 'Website & Portal'
      },
      {
        id: '4',
        heading: 'Listings Automation',
        price: '$450',
        description: 'Dynamic property listings synced from CMS or Sheets',
        features: ['Auto-updating listings', 'CMS integration', 'Filters & search', 'Map view'],
        categories: ['Automation', 'Listings', 'CMS', 'Dynamic', 'Real Estate', 'Efficiency'],
        buttonText: 'Automate My Listings',
        package: 'Automation & Lead Capture'
      },
      {
        id: '5',
        heading: 'Smart Lead Form + CRM',
        price: '$300',
        description: 'Capture and sync leads into your CRM instantly',
        features: ['Custom forms', 'CRM integration', 'Auto-responses', 'Notifications'],
        categories: ['Leads', 'CRM', 'Automation', 'Email', 'Conversion'],
        buttonText: 'Install Lead Capture',
        package: 'Automation & Lead Capture'
      },
      {
        id: '6',
        heading: 'Online Booking System',
        price: '$350',
        description: 'Let buyers schedule viewings or calls online',
        features: ['Calendar sync', 'Agent availability', 'Reminders', 'Integrations'],
        categories: ['Booking', 'Calendar', 'Automation', 'Scheduling', 'Lead Flow'],
        buttonText: 'Activate Booking',
        package: 'Automation & Lead Capture'
      },
      {
        id: '7',
        heading: 'Email & SMS Automation',
        price: '$250',
        description: 'Auto follow-ups for inquiries and cold leads',
        features: ['SMS & email triggers', 'Templates', 'Follow-up rules', 'CRM sync'],
        categories: ['Automation', 'SMS', 'Email', 'Retention', 'Leads'],
        buttonText: 'Activate Automation',
        package: 'Automation & Lead Capture'
      },
      {
        id: '8',
        heading: 'Property Inquiry Chatbot',
        price: '$400',
        description: '24/7 AI chatbot for property leads via WhatsApp & web.',
        features: ['AI + predefined responses', 'Multi-language support', 'CRM / database storage', 'Simple dashboard for agents', 'WhatsApp & web widget'],
        categories: ['Automation', 'Lead Capture', 'AI', 'CRM', 'Property Inquiries'],
        buttonText: 'Activate Chatbot',
        package: 'Automation & Lead Capture'
      },
      {
        id: '9',
        heading: 'Google Business & SEO',
        price: '$300',
        description: 'Rank higher for “Homes in [City]” searches',
        features: ['Local SEO', 'Google Business setup', 'On-page fixes', 'Keyword insights'],
        categories: ['SEO', 'Visibility', 'Local', 'Google', 'Ranking'],
        buttonText: 'Boost My SEO',
        package: 'Marketing'
      },
      {
        id: '10',
        heading: 'Google Reviews Widget',
        price: '$120',
        description: 'Showcase live client reviews for trust & SEO',
        features: ['Live reviews', 'Auto-update', 'SEO boost', 'Easy embed'],
        categories: ['Reviews', 'Trust', 'Social Proof', 'SEO', 'Credibility'],
        buttonText: 'Add Review Widget',
        package: 'Marketing'
      },
      {
        id: '11',
        heading: 'Speed Optimization',
        price: '$200',
        description: 'Faster load times for better conversion & SEO',
        features: ['Lighthouse fixes', 'Caching', 'Image compression', 'Performance tuning'],
        categories: ['Speed', 'Performance', 'SEO', 'Optimization'],
        buttonText: 'Optimize Speed',
        package: 'Performance'
      },
      {
        id: '12',
        heading: 'Monthly Support Plan',
        price: '$250/mo',
        description: 'Ongoing maintenance, backups, and uptime checks',
        features: ['24/7 monitoring', 'Monthly updates', 'Daily backups', 'Security audits'],
        categories: ['Support', 'Maintenance', 'Security', 'Monitoring', 'DevOps'],
        buttonText: 'Start Monthly Plan',
        package: 'Performance'
      },
      {
        id: '13',
        heading: '360° Virtual Tours',
        price: '$550',
        description: 'Interactive property galleries and walkthroughs',
        features: ['3D viewer', 'Image gallery', 'Video embeds', 'Mobile ready'],
        categories: ['Media', 'Virtual Tour', 'Gallery', 'Showcase', 'Modern UX'],
        buttonText: 'Add Virtual Tours',
        package: 'Media & Showcase'
      }
    ],
    primaryPlansItems: ['Dedicated Communication Channel via Slack or Email', 'Weekly Progress Updates & Revision Cycles', 'Full Project Visibility with Live Access to Assets', 'Flexible Payment Plans - Pay Per Project or Monthly'],
    secondaryPlansItems: [''],
    capabilitiesHeading: 'Dev8X Mobile Capabilities',
    capabilities: [
      {
        heading: 'Frontend',
        items: [
          { name: 'Flutter', image: '' },
          { name: 'Dart', image: '' },
          { name: 'React.js', image: '' },
          { name: 'Next.js', image: '' },
          { name: 'TypeScript', image: '' },
          { name: 'Redux Thunk', image: '' },
          { name: 'HTML5', image: '' },
          { name: 'TailwindCSS', image: '' }
        ]
      },
      {
        heading: 'Backend & DB',
        items: [
          { name: 'Node.js', image: '' },
          { name: 'Express.js', image: '' },
          { name: 'RESTful APIs', image: '' },
          { name: 'PostgreSQL', image: '' },
          { name: 'Sequelize ORM', image: '' },
          { name: 'Authentication', image: '' },
          { name: 'Authorization', image: '' },
          { name: 'Database Optimization', image: '' }
        ]
      },
      {
        heading: 'DevOps & Cloud',
        items: [
          { name: 'Docker', image: '' },
          { name: 'Kubernetes', image: '' },
          { name: 'CI/CD Pipelines', image: '' },
          { name: 'Terraform', image: '' }
        ]
      },
      {
        heading: 'Performance & Testing',
        items: [
          { name: 'Performance Optimization', image: '' },
          { name: 'Debugging', image: '' },
          { name: 'End-to-End Testing', image: '' },
          { name: 'Unit Testing', image: '' },
          { name: 'Cross-Platform QA', image: '' },
          { name: 'Load Testing', image: '' },
          { name: 'Mobile Responsiveness', image: '' },
          { name: 'Accessibility Audits', image: '' }
        ]
      },
      {
        heading: 'Project Workflow',
        items: [
          { name: 'ESLint & Prettier', image: '' },
          { name: 'Git Feature Branching', image: '' },
          { name: 'GitHub Pull Requests', image: '' },
          { name: 'TurboRepo', image: '' },
          { name: 'Monorepo Architecture', image: '' },
          { name: 'Agile Delivery', image: '' },
          { name: 'Cross-functional Collaboration', image: '' },
          { name: 'End-to-End Ownership', image: '' }
        ]
      }
    ],
    footerCta: {
      heading: 'Ready to get started?',
      buttonText: 'Contact Us'
    },
    footerCtaSecondary: {
      heading: 'Got questions? We’re here to help',
      buttonText: 'Scheldule Call'
    },
    video: prefixed(`/videos/header/header.mp4`)
  }
];

export default MOBILE;
