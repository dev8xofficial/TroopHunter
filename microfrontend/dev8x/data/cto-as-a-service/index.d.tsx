import { OffersContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';

const CTO: OffersContent[] = [
  {
    slug: '',
    variant: 'blue',
    tagText: 'For Non-Technical Founders',
    heading: 'CTO Guidance On Demand',
    paragraph: 'Dev8X provides part-time or full-time CTO expertise, ensuring your product’s tech strategy is scalable, reliable, and investor-ready.',
    heroButtons: [
      {
        label: 'See Pricing',
        href: prefixed('/pricing/tech-founders'),
        target: '_self'
      },
      {
        label: 'Schedule a Call',
        modalType: 'schedulecall'
      }
    ],
    image: prefixed('/api/images/services/cto-as-a-service/1.png'),
    iconCards: {
      title: 'When CTO as a Service Helps',
      paragraph: 'Startups gain access to executive-level guidance without hiring full-time, bridging strategy and technical execution.',
      items: [
        {
          title: '$140K/yr',
          description: 'You know WHAT to build but need guidance on HOW to develop it using the right tech stack.',
          icon: { name: 'RefreshIcon', size: 24 }
        },
        {
          title: '26%',
          description: 'Seeking investment? A professional CTO ensures your technical decisions inspire investor confidence.',
          icon: { name: 'BackendIcon', size: 24 }
        },
        {
          title: '<4 years',
          description: 'Past experiences with low-cost developers disappointed you. Dev8X ensures high-quality, maintainable solutions.',
          icon: { name: 'AIBrainIcon', size: 24 }
        },
        {
          title: 'Transparent Reporting',
          description: 'Focus on strategy, marketing, and sales while Dev8X handles all tech decisions with clear reporting.',
          icon: { name: 'SeismometerIcon', size: 24 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Schedule a Call',
        paragraph: 'Select a time. NDAs available for confidential discussions.',
        icon: { name: 'HomeIcon', size: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Describe Your Vision',
        paragraph: 'Share your product concept and required skills. Dev8X proposes an optimal technical leadership plan quickly.',
        icon: { name: 'MapPinIcon', size: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/10.png')
      },
      {
        title: 'Review & Approve',
        paragraph: 'Approve the strategy and contract to start your product development immediately with senior-level guidance.',
        icon: { name: 'BotIcon', size: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/26.png')
      }
    ],
    whyWeAreDifferentContent: {
      heading: 'Why Dev8X CTO Service',
      qa: [
        {
          title: 'Strategic Leadership',
          paragraph: 'Our CTOs align with your business goals, shaping technology choices, architecture, and scalable roadmap planning.'
        },
        {
          title: 'Experienced Team',
          paragraph: 'Teams deliver using React.js, Next.js, Node.js, PostgreSQL, Docker, and modern cloud DevOps practices.'
        },
        {
          title: 'Agile Execution',
          paragraph: 'We combine CI/CD, Git feature branching, and sprint-based agile methods to implement strategies efficiently.'
        },
        {
          title: 'Full Transparency',
          paragraph: 'Regular reports, KPIs, and meetings keep founders informed while maintaining technical excellence across projects.'
        }
      ]
    },
    footerMainContent: {
      link: '/contact',
      start: 'Ready to ',
      end: 'get started?'
    },
    meta: {
      title: 'CTO as a Service | Dev8X | Strategic Tech Leadership',
      description: 'Dev8X provides part-time/full-time CTO expertise for non-technical founders, guiding scalable, reliable, and investor-ready product development.'
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
        href: 'https://www.linkedin.com/company/dev8xofficial/'
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
        title: '1. What Is CTO as a Service?',
        description: 'An external CTO manages technical aspects, either leading a full team or consulting part-time, ensuring strategic and operational alignment.'
      },
      {
        title: '2. CTO Responsibilities in Startups',
        description: 'Oversees tech decisions, designs scalable architecture, implements reliable stacks, and maintains roadmaps to support business growth.'
      },
      {
        title: '3. When to Hire CTO Service?',
        description: 'Ideal for early-stage startups without a CTO or fast-growing companies needing additional tech leadership and strategy.'
      },
      {
        title: '4. CTO Service Cost',
        description: 'Fees vary per project. Dev8X ensures flexible pricing across industries and tech stacks to support diverse startup needs.'
      },
      {
        title: '5. How CTO Works With Teams',
        description: 'CTOs coordinate with existing teams using agile workflows, Jira, KPIs, and sprint reviews for seamless collaboration and delivery.'
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
    capabilitiesHeading: 'Key Skills Our CTOs Apply',
    capabilities: [
      {
        heading: 'Front-end Developers',
        items: [
          { name: 'React.js', iconName: 'ReactjsIcon' },
          { name: 'Next.js', iconName: 'NextjsIcon' }
        ]
      },
      {
        heading: 'DevOps Engineers',
        items: [
          { name: 'AWS', iconName: 'AwsIcon' },
          { name: 'Kubernetes', iconName: 'KubernetesIcon' },
          { name: 'GitHub', iconName: 'GithubIcon' },
          { name: 'Docker', iconName: 'DockerIcon' },
          { name: 'Jenkins', iconName: 'JenkinsIcon' }
        ]
      },
      {
        heading: 'Mobile App Developers',
        items: [
          { name: 'Flutter', iconName: 'FlutterIcon' },
          { name: 'Dart', iconName: 'DartIcon' }
        ]
      },
      {
        heading: 'Back-end Developers',
        items: [
          { name: 'Node.js', iconName: 'NodejsIcon' },
          { name: 'Express.js', iconName: 'BackendIcon' },
          { name: 'REST APIs', iconName: 'RestApiIcon' },
          { name: 'PostgreSQL', iconName: 'PostgresqlIcon' }
        ]
      },
      {
        heading: 'Cross-Functional Skills',
        items: [
          { name: 'Microservices Architecture', iconName: 'ArchitectureIcon' },
          { name: 'Authentication & Authorization', iconName: 'AuthenticationIcon' },
          { name: 'Performance Optimization', iconName: 'PerformanceIcon' },
          { name: 'Testing & Debugging', iconName: 'TestingIcon' },
          { name: 'CI/CD Pipelines', iconName: 'InfinityIcon' },
          { name: 'Containerization', iconName: 'DockerIcon' },
          { name: 'Full-Stack Development', iconName: 'FullStackIcon' },
          { name: 'End-to-End Ownership', iconName: 'OwernshipIcon' }
        ]
      }
    ],
    footerCta: {
      heading: 'Your Project Starts Here',
      buttonText: "Let's Go"
    },
    video: prefixed(`/videos/header/header.mp4`)
  }
];

export default CTO;
