import { OffersContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';

const CTO: OffersContent[] = [
  {
    slug: '',
    variant: 'blue',
    tagText: '',
    heading: 'CTO as a Service for Non-Technical Founders',
    paragraph: 'Get C-level tech guidance for your product`s success and achieve your business goals with more confidence.',
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
    image: prefixed('/api/images/work/totalhealthdentalcare/mobile/1.png'),
    iconCards: {
      title: 'When do I need CTO as a Service?',
      paragraph: 'CTOs are in demand and startups need to compete against FAANG to attract top talent.',
      items: [
        {
          title: '$140K/yr',
          description: 'You know WHAT kind of product you want to build but have no idea HOW it can be developed from the tech perspective.',
          icon: { name: 'RefreshIcon', width: 28 }
        },
        {
          title: '26%',
          description: 'You are seeking funding for your startup and need to show investors you’re backed by a professional guiding the technical direction.',
          icon: { name: 'BackendIcon', width: 26 }
        },
        {
          title: '<4 years',
          description: `Your past experience with low-cost developers has been disappointing and you don't want this scenario to happen again.`,
          icon: { name: 'AIBrainIcon', width: 26 }
        },
        {
          title: 'Transparent Reporting',
          description: `You are putting all efforts into strategy, networking, marketing, and sales and need someone who will fully take care of the product's tech side.`,
          icon: { name: 'SeismometerIcon', width: 22 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Schedule a call',
        paragraph: 'Complete the form and pick the best time. Ask us for an NDA if required, and we are happy to provide one ',
        icon: { name: 'HomeIcon', width: 26 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Tell us what you’re building',
        paragraph: 'Give us an idea of what you are building and what specific skills you need. In a few days, we’ll roll out a team composition that perfectly matches your needs.',
        icon: { name: 'MapPinIcon', width: 24 },
        image: prefixed('/api/images/work/honeydu/desktop/10.png')
      },
      {
        title: 'Review the team and start',
        paragraph: 'Once you approve the team and sign a contract, we can start building your product together with no-risk.',
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
        title: '1. What Is CTO as a service?',
        description: 'CTO as a service refers to Chief Technology Officer-as-a-service. It’s a new way to think about the role of the CTO, where the CTO is brought in from outside and manages all technical aspects of product development. A company can hire the entire team led by a CTO or assign specific responsibilities to an external expert on a part-time consultancy basis.'
      },
      {
        title: '2. What are the CTO’s responsibilities in a startup?',
        description: 'The CTO oversees all technology decisions within the startup. They are responsible for ensuring that the used tech stack is scalable, efficient, and reliable. In addition, they help create and maintain a comprehensive technology roadmap that guides the startup’s future growth.'
      },
      {
        title: '3. When should a startup opt for CTO as a service?',
        description: 'CTO services are an excellent option for early-stage startups that can’t afford to hire an in-house CTO. It can also be beneficial for fast-growing companies that already have a CTO but need additional support in managing and scaling their products.'
      },
      {
        title: '4. How much do CTO services cost at Upsilon?',
        description: 'CTO services fees are determined on a case-by-case basis. However, our team is committed to offering these services to a diverse range of startups, regardless of their industry or the technology that will be used on the project.'
      }
      // {
      //   title: '5. What if I need more listings or upgrades later?',
      //   description: 'CTO services fees are determined on a case-by-case basis. However, our team is committed to offering these services to a diverse range of startups, regardless of their industry or the technology that will be used on the project.'
      // },
      // {
      //   title: '6. How do you ensure quality and reliability?',
      //   description: 'We use tested templates, clean code, speed checks, responsive design, and QA reviews on every project.'
      // },
      // {
      //   title: '7. Where is your team based?',
      //   description: 'Our engineering team operates from Pakistan with U.S.-aligned hours and b written communication.'
      // },
      // {
      //   title: '8. What’s your pricing and payment model?',
      //   description: 'Flat-rate pricing per service. Pay via Stripe, Wise, or bank transfer. Discounts available for bundles.'
      // },
      // {
      //   title: '9. Do you handle NDAs and ownership?',
      //   description: 'Yes. You retain full ownership of all assets, domains, content, and code — with optional NDA protection.'
      // },
      // {
      //   title: '10. How do you compare to typical marketing agencies?',
      //   description: 'We deliver faster, cost less, and focus on real estate–specific assets built for immediate lead conversion.'
      // }
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
    capabilitiesHeading: 'Ambitious products deserve the best technologies. Here are the main tech skills our experts do possess:',
    capabilities: [
      {
        heading: 'Front-end developers',
        items: [
          { name: 'React', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35ca0bed669b2a390257_react.webp' },
          { name: 'Next JS', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35ca619e3e2ecd6da7a9_nextjs.webp' },
          { name: 'Gatsby', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35ca1e7cca2f317d6899_gatsby.webp' }
        ]
      },
      {
        heading: 'DevOps engineers',
        items: [
          { name: 'AWS', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6380e78377fad8513b4895d6_aws.webp' },
          { name: 'GitLab', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6380e58e9a64416b318c9d86_gitlab.webp' },
          { name: 'Kubernetes', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637278911e566587192317f2_kubernetes.webp' },
          { name: 'GitHub', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6380e58e992fec12274efa72_github.webp' },
          { name: 'Docker', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637278908332ff18aa459ce4_docker.webp' },
          { name: 'Jenkins', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6380e58e27ab56ec138c2ada_jenkins.webp' }
        ]
      },
      {
        heading: 'Mobile app developers',
        items: [
          { name: 'React Native', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35ca0bed669b2a390257_react.webp' },
          { name: 'Expo', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637f3ecb64e4c467e07a8e77_expo.png' }
        ]
      },
      {
        heading: 'Back-end developers',
        items: [
          { name: 'Python', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637278915e54a8355b3e1d52_python.webp' },
          { name: 'Django', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35caaa74ba0bc7d25c29_django.webp' },
          { name: 'Node JS', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35cb747fce613622812b_nodejs.webp' },
          { name: 'FastAPI', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637d35c954cf5c7584730437_fastapi.webp' }
        ]
      },
      {
        heading: 'Data scientists',
        items: [
          { name: 'TensorFlow', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637278939601cf4af694d79f_tensor-flow.webp' },
          { name: 'NLTK', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6380e58e6760cea14fc35c73_nltk.webp' },
          { name: 'DeepPavlov', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6380e58e2a93aa389e66cef7_deep-pavlov.webp' },
          { name: 'Scikit learn', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6380e58e06df40bbdb8c972c_scikit-learn.webp' },
          { name: 'Keras', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/63727891633738df2523a8ba_keras.webp' },
          { name: 'Gensim', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6380e58e27ab56bca98c2ad9_gensim.webp' },
          { name: 'Faiss', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6380e58e2a33782738b3c3fa_faiss.webp' },
          { name: 'SciPy', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6380e58e2d13f99cff54d001_scipy.webp' },
          { name: 'PyTorch', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/63727891d4d17683bbc11982_py-torch.webp' },
          { name: 'SpaCy', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6380e58ea4fc884273bd4df3_spacy.png' },
          { name: 'XGBoost', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6380e58e6760ce61e1c35c75_xgboost.webp' },
          { name: 'SimPy', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6380e58ed1140bba1d50576f_simpy.webp' }
        ]
      }
    ],
    video: prefixed(`/videos/header/header.mp4`)
  }
];

export default CTO;
