import { OffersContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';

const OFFERS: OffersContent[] = [
  {
    slug: 'real-estate',
    variant: 'green',
    tagText: 'For Tech Founders',
    heading: 'SaaS Application Development Services',
    paragraph: 'Leveraging the advantage of the Software-as-a-service (SaaS) model, Upsilon will help you build a secret weapon - a cloud-based solution with central hosting that will definitely boost your company’s bottom line. Whether you need to develop certain SaaS components like APIs or implement integrations like Stripe, our developers are at your service',
    image: prefixed('/api/images/work/totalhealthdentalcare/mobile/1.png'),
    iconCards: {
      title: 'SaaS Products in Business Portfolio',
      paragraph: 'We know firsthand how to design, build, implement and deploy fail-safe SaaS as we have successfully launched and continue maintaining and enhancing our own products. We have a deep comprehension of the specifics of the SaaS and, as the product owners, we always look beyond ‘blind coding’ when working on clients’ projects.',
      items: [
        {
          title: 'Web, Mobile and Desktop Apps',
          description: 'Whatever platform you target - web, mobile, desktop or all three of them - our team can build a SaaS app of any complexity and covering all the features you require.',
          icon: { name: 'RefreshIcon', width: 28 }
        },
        {
          title: 'Product Website',
          description: 'We design and build highly personalized, user-friendly and full-featured product websites that help your business build deeper relationship with its audience.',
          icon: { name: 'BackendIcon', width: 26 }
        },
        {
          title: 'API Development',
          description: 'Our back-end development team will help you build an API that will scale on demand, perform fast, and provide secure and reliable data storage for your SaaS.',
          icon: { name: 'AIBrainIcon', width: 26 }
        },
        {
          title: 'CI/CD',
          description: 'By setting up CI/CD pipelines, our team will allow you to make more frequent improvements to your product and efficiently test and deploy those changes.',
          icon: { name: 'SeismometerIcon', width: 22 }
        },
        {
          title: 'Build & Deployment System',
          description: 'By leveraging the advantages of Docker and Kubernetes, we create systems that allow to automate and speed up the process of application building, deployment, scaling, and management.',
          icon: { name: 'SeismometerIcon', width: 22 }
        },
        {
          title: 'Third-party Integrations',
          description: 'From connecting external data sources to integrating payment gateways, we help you connect your SaaS app with 3rd party solutions..',
          icon: { name: 'SeismometerIcon', width: 22 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Knowledge Management Platform',
        paragraph: 'A platform that helps your team to collect valuable internal information and access it anywhere.',
        icon: { name: 'HomeIcon', width: 26 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Task Management App for Slack',
        paragraph: 'A productivity and task tracking app that allows individuals and teams organize, and prioritize their tasks without leaving Slack.',
        icon: { name: 'MapPinIcon', width: 24 },
        image: prefixed('/api/images/work/honeydu/desktop/10.png')
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
    faqs: [
      {
        title: '1. What is a SaaS development company?',
        description: 'A SaaS development company is an organization that provides cloud-based software to customers on a subscription-based or a flat rate model. SaaS companies may build, maintain, update and deliver their software by themselves, or they can delegate the development of their product to an outsourcing tech partner while focusing on hosting, distribution, and customer support. '
      },
      {
        title: '2. What are SaaS application development services?',
        description: `SaaS application development services cover the creation of documentation, design, development, testing, and maintenance of software solutions with multi-tenant architecture, their hosting in the cloud, and deployment on the servers.`
      },
      {
        title: '3. How to build a SaaS application?',
        description: 'Basically, the process of SaaS application development includes the following stages:Ideation, the definition of the value the SaaS will bring to users, and USP formulationOutlining the primary functionalitiesSelection of the tech stackDetermination of a most suitable pricing modelHiring a reliable SaaS development company'
      },
      {
        title: '4. How much does it cost to develop a SaaS application?',
        description: 'Based on the estimate and our experience, we can say that the cost of a SaaS application will start from $50,000. Here we talk about the subscription functionality, which is the core of the SaaS product. The price of a complete, fully-featured solution will be around $150,000-200,000 and more.To get a closer look at the SaaS cost breakdown, please read our SaaS Application Development Guide.'
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
    capabilitiesHeading: "Integrations Our Clients Benefit From:",
    capabilities: [
      {
        items: [
          { name: 'Stripe', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/638d048cf5c38d73f0140038_stripe.webp' },
          { name: 'PayPal', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/638d048d346ec742399635de_paypal.webp' },
          { name: 'Google Analytics', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/638d048c2e5f78530668f95b_google-analytics.webp' },
          { name: 'Skylight', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/638d0f8c9a16189ebdbb26b0_skylight.webp' },
        ]
      },
      {
        items: [
          { name: 'Mobile', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/638d048dfbd74d4571851528_mobile.webp' },
          { name: 'Hotjar', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/638d048d0787c7285eead1cc_hotjar.webp' },
          { name: 'Mailchimp', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/638d048d1f96aba06263f132_mailchimp.webp' }
        ]
      },
      {
        items: [
          { name: 'HubSpot', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/638d048dfbd74de55c851527_hubspot.webp' },
          { name: 'UptimeRobot', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/638d048db9a23c8cd5d9e390_uptime-robot.webp' },
          { name: 'Sentry', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/638d048c81318f470045d0b8_sentry.webp' }
        ]
      },

    ],
    video: prefixed(`/videos/header/header.mp4`)
  }
];

export default OFFERS;
