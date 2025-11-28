import { OffersContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';

const SAAS: OffersContent[] = [
  {
    slug: '',
    variant: 'green',
    tagText: 'Cloud-Based SaaS Solutions',
    heading: 'SaaS Application Development',
    paragraph: 'Dev8X builds scalable, cloud-hosted SaaS solutions, integrating APIs, payment systems, and seamless multi-platform experiences for measurable business impact.',
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
    image: prefixed('/api/images/services/saas-applications/1.png'),
    iconCards: {
      title: 'SaaS Expertise in Action',
      paragraph: 'Our team leverages first-hand SaaS product experience, ensuring client solutions go beyond coding, with maintainability, scalability, and high performance.',
      items: [
        {
          title: 'Web, Mobile, Desktop Apps',
          description: 'Dev8X develops SaaS apps for web, mobile, and desktop, covering all required features with responsive, mobile-first design and Next.js, React.js, Flutter, and Dart.',
          icon: { name: 'RefreshIcon', width: 28 }
        },
        {
          title: 'Product Websites',
          description: 'We create user-friendly, fully-featured websites for SaaS products using TailwindCSS, HTML5, and GSAP, fostering engagement and stronger audience connections.',
          icon: { name: 'BackendIcon', width: 26 }
        },
        {
          title: 'API Development',
          description: 'Back-end teams design scalable, secure RESTful APIs with Node.js, Express.js, and PostgreSQL, optimized for performance and multi-tenant SaaS environments.',
          icon: { name: 'AIBrainIcon', width: 26 }
        },
        {
          title: 'CI/CD Pipelines',
          description: 'We implement automated CI/CD workflows using Docker, Kubernetes, and pipeline orchestration to streamline testing, deployment, and continuous updates.',
          icon: { name: 'SeismometerIcon', width: 22 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Knowledge Management Platform',
        paragraph: 'A central hub for internal information, accessible securely anywhere, supporting collaboration and decision-making across distributed teams.',
        icon: { name: 'HomeIcon', width: 26 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Task Management App for Slack',
        paragraph: 'Productivity app integrating with Slack, enabling task prioritization, tracking, and team coordination without leaving the platform.',
        icon: { name: 'HomeIcon', width: 26 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      }
    ],
    whyWeAreDifferentContent: {
      heading: 'Why Dev8X SaaS Development',
      qa: [
        {
          title: 'Deep SaaS Experience',
          paragraph: 'Our team has launched and maintains internal SaaS products, giving real-world insight into scalability, uptime, and client requirements.'
        },
        {
          title: 'Full-Stack Expertise',
          paragraph: 'From Next.js, React.js, Node.js, to PostgreSQL and Docker, we handle end-to-end architecture, development, and deployment.'
        },
        {
          title: 'Cross-Platform Development',
          paragraph: 'We deliver SaaS solutions across web, mobile, and desktop platforms with responsive design and Flutter-powered native apps for iOS and Android.'
        },
        {
          title: 'Process-Driven Delivery',
          paragraph: 'Using agile workflows, CI/CD pipelines, code reviews, and automated testing, Dev8X ensures reliable, maintainable, and fast deployment cycles.'
        }
      ]
    },
    footerMainContent: {
      link: '/contact',
      start: 'Ready to ',
      end: 'get started?'
    },
    meta: {
      title: 'SaaS Application Development | Dev8X | Cloud-Based Solutions',
      description: 'Dev8X delivers scalable SaaS solutions, APIs, integrations, and multi-platform apps with cloud hosting, ensuring reliability, performance, and measurable business impact.'
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
        title: '1. What is a SaaS development company?',
        description: 'An organization creating cloud-based software delivered via subscription, handling hosting, distribution, updates, and optionally outsourcing development to experts like Dev8X.'
      },
      {
        title: '2. What are SaaS development services?',
        description: 'Covers design, development, testing, deployment, and maintenance of multi-tenant, cloud-hosted software with integrations, security, and scalability.'
      },
      {
        title: '3. How to build a SaaS application?',
        description: 'Stages include ideation, core functionality definition, tech stack selection, pricing model, and partnering with a reliable development team like Dev8X.'
      },
      {
        title: '4. How much does it cost to develop a SaaS app?',
        description: 'Core SaaS solutions start around $50,000; full-featured applications with advanced integrations range from $150,000–200,000+.'
      },
      {
        title: '5. What integrations are supported?',
        description: 'Dev8X connects SaaS apps with Stripe, PayPal, Google Analytics, Hotjar, HubSpot, Mailchimp, Skylight, Sentry, and UptimeRobot.'
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
    capabilitiesHeading: 'Integrations Our Clients Benefit From:',
    capabilities: [
      {
        heading: 'Payment & Analytics',
        items: [
          { name: 'Stripe', image: '' },
          { name: 'PayPal', image: '' },
          { name: 'Google Analytics', image: '' },
          { name: 'Skylight', image: '' }
        ]
      },
      {
        heading: 'Marketing & Monitoring',
        items: [
          { name: 'Hotjar', image: '' },
          { name: 'Mailchimp', image: '' },
          { name: 'HubSpot', image: '' }
        ]
      },
      {
        heading: 'Reliability & Security',
        items: [
          { name: 'UptimeRobot', image: '' },
          { name: 'Sentry', image: '' }
        ]
      },
      {
        heading: 'Frontend Stack',
        items: [
          { name: 'Next.js', image: '' },
          { name: 'React.js', image: '' },
          { name: 'TypeScript', image: '' },
          { name: 'Redux Thunk', image: '' },
          { name: 'HTML5', image: '' },
          { name: 'TailwindCSS', image: '' },
          { name: 'GSAP', image: '' },
          { name: 'Responsive Design', image: '' }
        ]
      },
      {
        heading: 'Backend & DevOps',
        items: [
          { name: 'Node.js', image: '' },
          { name: 'Express.js', image: '' },
          { name: 'PostgreSQL', image: '' },
          { name: 'Sequelize ORM', image: '' },
          { name: 'RESTful APIs', image: '' },
          { name: 'Docker', image: '' },
          { name: 'Kubernetes', image: '' },
          { name: 'CI/CD Pipelines', image: '' }
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

export default SAAS;
