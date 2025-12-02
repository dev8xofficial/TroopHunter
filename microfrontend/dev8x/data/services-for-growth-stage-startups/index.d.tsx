import { OffersContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';

const AUGMENTATION: OffersContent[] = [
  {
    slug: '',
    variant: 'pink',
    tagText: 'For Tech Founders',
    heading: 'Scale Faster With Expert Teams',
    paragraph: 'Dev8X provides senior-level talent to expand your development capacity, accelerate product delivery, and fill critical skill gaps efficiently.',
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
    image: prefixed('/api/images/services/services-for-growth-stage-startups/1.png'),
    iconCards: {
      title: 'Meet Your Future A-Players',
      paragraph: 'We assemble teams that match your product needs, skill requirements, and timeline goals for maximum impact.',
      items: [
        {
          title: 'Senior Developer',
          description: 'Leads architecture, chooses tech stack, reviews code, and supervises the team to ensure scope delivery.',
          icon: { name: 'RefreshIcon', size: 24 }
        },
        {
          title: 'Middle Developer',
          description: 'Executes development tasks, integrates design and backend, and deploys features efficiently.',
          icon: { name: 'BackendIcon', size: 24 }
        },
        {
          title: 'UX/UI Designer',
          description: 'Creates interfaces aligned with user journeys to ensure an intuitive and visually appealing experience.',
          icon: { name: 'AIBrainIcon', size: 24 }
        },
        {
          title: 'QA Specialist',
          description: 'Detects bugs, validates feature quality, and signs off releases for deployment.',
          icon: { name: 'SeismometerIcon', size: 24 }
        },
        {
          title: 'Product Manager',
          description: 'Coordinates development, prioritizes tasks, and ensures deadlines are met while aligning with product vision.',
          icon: { name: 'SeismometerIcon', size: 24 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Schedule a Call',
        paragraph: 'Pick a time that works. NDAs available upon request for confidential discussions.',
        icon: { name: 'UserIcon', size: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/8.png')
      },
      {
        title: 'Define Your Needs',
        paragraph: 'Share project goals and required skills. Dev8X proposes a precise team composition within days.',
        icon: { name: 'HomeIcon', size: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Review & Start',
        paragraph: 'Approve the team and contract to start building your product with no-risk, immediate deployment.',
        icon: { name: 'BotIcon', size: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/26.png')
      }
    ],
    whyWeAreDifferentContent: {
      heading: 'Why Dev8X Stands Out',
      qa: [
        {
          title: 'Long-Term Partner',
          paragraph: 'We align deeply with your product vision, generating ideas and testing hypotheses collaboratively.'
        },
        {
          title: 'Senior Developers Only',
          paragraph: 'Teams deliver with React.js, Next.js, TypeScript, and follow modern standards for robust outcomes.'
        },
        {
          title: 'Quick Deployment',
          paragraph: 'Teams ready in 1–2 weeks, leveraging CI/CD, feature branching, and sprint-based agile practices.'
        },
        {
          title: 'Reliable Delivery',
          paragraph: 'Projects never stall. Full-capacity teams ensure goals are achieved efficiently and consistently.'
        }
      ]
    },
    footerMainContent: {
      link: '/contact',
      start: 'Ready to ',
      end: 'get started?'
    },
    meta: {
      title: 'Team Augmentation Services — Dev8X | Scale Your Tech Team',
      description: 'Dev8X provides senior-level developers, designers, QA, and PMs to scale your team and accelerate product delivery.'
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
        title: '1. What are IT staff augmentation services?',
        description: 'Hire vetted specialists temporarily or permanently to fill skill gaps, boost capacity, and accelerate project delivery.'
      },
      {
        title: '2. When do I need team augmentation?',
        description: 'When your team lacks expertise, faces tight deadlines, or wants to retain full control while scaling quickly.'
      },
      {
        title: '3. IT staff augmentation vs managed services?',
        description: 'Staff augmentation keeps control in-house. Managed services outsource project oversight to external teams with predictable costs.'
      },
      {
        title: '4. How will my team interact with augmented staff?',
        description: 'Agile teams use Jira, KPIs, standups, weekly meetings, and sprint reviews for efficient collaboration across time zones.'
      },
      {
        title: '5. How much do team augmentation services cost?',
        description: 'Pricing is hourly per specialist. Dev8X provides skilled experts at competitive rates. See the Pricing page for details.'
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
    capabilitiesHeading: '50+ Experts Ready to Join',
    capabilities: [
      {
        heading: 'Product Management',
        items: [
          { name: 'ClickUp', iconName: 'ClickUpIcon' },
          { name: 'Slack', iconName: 'SlackIcon' }
        ]
      },
      {
        heading: 'UX/UI Design',
        items: [
          { name: 'Figma', iconName: 'FigmaIcon' },
          { name: 'Canva', iconName: 'CanvaIcon' },
          { name: 'Adobe', iconName: 'AdobeIcon' }
        ]
      },
      {
        heading: 'Development',
        items: [
          { name: 'TypeScript ', iconName: 'TypeScriptIcon' },
          { name: 'Node.js ', iconName: 'NodejsIcon' },
          { name: 'React.js ', iconName: 'ReactjsIcon' },
          { name: 'Next.js ', iconName: 'NextjsIcon' }
        ]
      },

      {
        heading: 'DevOps',
        items: [
          { name: 'Terraform', iconName: 'TerraformIcon' },
          { name: 'Docker', iconName: 'DockerIcon' },
          { name: 'Kubernetes', iconName: 'KubernetesIcon' }
        ]
      },
      {
        heading: 'QA',
        items: [{ name: 'Selenium', iconName: 'SeleniumIcon' }]
      }
    ],
    footerCta: {
      heading: 'Your Project Starts Here',
      buttonText: "Let's Go"
    },
    footerCtaSecondary: {
      heading: 'Got questions? We’re here to help',
      buttonText: 'Scheldule Call'
    },
    video: prefixed(`/videos/header/header.mp4`)
  }
];

export default AUGMENTATION;
