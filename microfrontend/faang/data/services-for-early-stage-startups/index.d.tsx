import { OffersContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';

const MVP: OffersContent[] = [
  {
    slug: '',
    variant: 'cyan',
    tagText: 'For Tech Founders',
    heading: 'LANUCH YOUR MVP WITHIN 3 MONTHS',
    paragraph: 'Work with a long-term tech partner that will help you build an MVP to gain traction from early adopters and raise money from investors.',
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
      title: 'Together from an Idea to the First Funding and Beyond',
      paragraph: 'Only by releasing an MVP to market, and testing it on real customers, you can find out if you’ve chosen the right problem to solve.',
      items: [
        {
          title: 'Test the core idea',
          description: 'Validate your business idea in the early stage without developing a full-fledged product.',
          icon: { name: 'RefreshIcon', width: 28 }
        },
        {
          title: 'Attract investors',
          description: 'Show investors that they are not funding just an idea, but a product that has already gained traction.',
          icon: { name: 'BackendIcon', width: 26 }
        },
        {
          title: 'Collect feedback',
          description: 'Determine what features to add or remove and how to improve your product to meet the customer`s needs.',
          icon: { name: 'AIBrainIcon', width: 26 }
        },
        {
          title: 'Choose the right technologies',
          description: 'Select the best tools for your MVP to ensure scalability and performance.',
          icon: { name: 'SeismometerIcon', width: 22 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Long-Term Partner That Shares Your Vision',
        paragraph: 'We love diving deep into the project’s specifics, generating ideas, and testing hypotheses. With Upsilon, your startup will get a reliable team who lives and breathes your product 24/7.',
        icon: { name: 'HomeIcon', width: 26 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Senior Developers, Not Amateurs',
        paragraph: 'Keeping abreast of modern technologies and following the best development practices and standards, we build products that truly change the game.',
        icon: { name: 'MapPinIcon', width: 24 },
        image: prefixed('/api/images/work/honeydu/desktop/10.png')
      },
      {
        title: 'Quick Starters, Agile Riders',
        paragraph: `We understand your time is limited and have teams ready for deployment within 1-2 weeks. Adhering to agile practices, we help clients deliver value to their customers faster and with fewer headaches.`,
        icon: { name: 'BotIcon', width: 26 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/26.png')
      },
      {
        title: 'Uncompromising Achievers',
        paragraph: `With Upsilon, you can be 100% sure that your project will never be left halfway down the road. We always work at full capacity striving to help your product achieve all goals you have set.`,
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
    whyDev8XContent: {
      heading: 'Why Dev8X',
      para1: 'We believe that meaningful design starts with empathy. Every product we create is centered around improving real lives—helping people achieve more with less friction.',
      para2: 'By combining strategy, creativity, and technology, we unlock opportunities, transform businesses, and make experiences that truly matter. As an independent team, our agility and passion shape every project into something exceptional.',
      image: 'https://a-us.storyblok.com/f/1017006/1200x1400/dc71890964/humaanpeople.jpg/m/450x548/filters:quality(80)',
      stats: [
        { title: '100%', span: ['In-house ', '& ', 'independent'] },
        { title: '6+', span: ['Years ', 'crafting ', 'digital ', 'experiences'] },
        { title: '20+', span: ['Digital ', 'solutions ', 'launched ', 'worldwide'] }
      ]
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
    video: prefixed(`/videos/header/header.mp4`)
  }
];

export default MVP;
