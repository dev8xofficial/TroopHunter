import { OffersContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';

const OFFERS: OffersContent[] = [
  {
    slug: 'real-estate',
    variant: 'green',
    tagText: 'For Tech Founders',
    heading: 'Custom Mobile Applications',
    paragraph: 'Upsilon is a reliable tech partner with proven experience in building responsive and innovative mobile apps. We will help you make a unique, highly-customized mobile solution that responds to the market challenges while meeting your business objectives and overall strategy.Leveraging our company`s core strength and strategic approach to mobile application development, we support you from a discovery phase to deployment, treating your app launch as our own.',
    image: prefixed('/api/images/work/totalhealthdentalcare/mobile/1.png'),
    iconCards: {
      title: 'Highlights of Our Custom Mobile Apps',
      paragraph: 'We develop, customize, and implement all kinds of features to build the best possible application that best serves your brand and caters to your missions.',
      items: [
        {
          title: 'Truly native UI',
          description: 'React Native lets you develop interactive and user-friendly interfaces without compromising your users’ experiences. Your mobile app will truly have native look and feel.',
          icon: { name: 'RefreshIcon', width: 28 }
        },
        {
          title: 'Live updates',
          description: 'An application built with React Native can be updated over-the-air - directly on users’ devices. That accelerates the feedback gathering cycle and allows to deliver customer value faster.',
          icon: { name: 'BackendIcon', width: 26 }
        },
        {
          title: '‍Cost-effective',
          description: '‍By opting for React Native technology, you can save time and money receiving top-grade mobile solutions simultaneously on iOS and Android.',
          icon: { name: 'AIBrainIcon', width: 26 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Online Art Marketplace for Collectors',
        paragraph: '13 weeks to MVP | 10M+ auction data points',
        icon: { name: 'HomeIcon', width: 26 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Collection Management Software for Art and Culture',
        paragraph: '10 yearsof partnership | Artindustry',
        icon: { name: 'MapPinIcon', width: 24 },
        image: prefixed('/api/images/work/honeydu/desktop/10.png')
      },
      {
        title: 'Retail Store Customer Tracking Software',
        paragraph: '7 monthstime to market | $330Kproject budget',
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
    faqs: [
      {
        title: '1. What are MVP development services?',
        description:
          'By opting for MVP development services, startups can build a product`s test version allowing them to see their idea in action and determine how well it resonates with potential customers. MVP development services for startups imply a certain sequence of activities, including market research; goal & main user identification; design; feature creation & implementation; testing; deployment; and receiving feedback.Whether you need help with MVP development, let Upsilon be your guide to uncovering valuable insights and feedback that will help you build a product tailored just right for customers` needs.  '
      },
      {
        title: '2. Why is MVP development important for startups?',
        description: `By developing an MVP, you might avoid a larger initial investment in software development and reduce the risk when entering the market. Here are the main benefits of building an MVP for startups:

• Faster time-to-market within a tight budget  
• Getting early feedback from the target audience for making data-driven effective decisions  
• Feature prioritization: understanding what functions should be added or removed  
• Gaining the first traction from early adopters and building a user base  
• Possibility to attract investors

Need to build an MVP? We will be happy to assist.`
      },
      {
        title: '3. How to choose the right MVP development company?',
        description: 'For over 10 years, we’ve been helping progressive companies bring their ideas to life faster, more effectively, and with minimal risk. So if you need expert help with MVP development, feel free to reach out to Upsilon.'
      },
      {
        title: '4. What is the best pricing model for building an MVP?',
        description: 'Today’s pricing models in the field of MVP development range from the traditional fixed-price and time & material models to agile options like hiring a dedicated team. As an expert MVP development company, we use a sprint-based approach that has proven flexibility, cost-effectiveness, and transparency. Sprint is a 2-week working period during which a development team completes a set amount of work. The final cost depends on the number of sprints. To learn more about this model and why it may be a perfect match for your project, please visit our “Pricing” page.'
      },
      {
        title: '5. What if I need more listings or upgrades later?',
        description: 'You can add new pages, listings, SEO, or automation anytime — all structures are built for easy scaling.'
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
    capabilitiesHeading: "Our capabilities are centred around our ability to deliver world-class mobile applications. We're 100% in-house and work end-to-end, ensuring each project is delivered to the highest standard.",
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
          { name: 'React Native', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35ca0bed669b2a390257_react.webp' },
          { name: 'Expo', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637f3ecb64e4c467e07a8e77_expo.png' }
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
    video: prefixed(`/videos/header/header.mp4`)
  }
];

export default OFFERS;
