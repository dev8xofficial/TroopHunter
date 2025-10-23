import { ExpertiseContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';

const OFFERS: ExpertiseContent[] = [
  {
    slug: 'totalhealthdentalcare',
    variant: 'cyan',
    tagText: 'Website',
    heading: 'One Video, One Offer \n THDC, This is for You',
    image: '',
    iconCards: {
      title: 'Remarkable digital experiences',
      paragraph: "We focus on what we do best: For more than 6 years, we've been imagining, crafting, and launching inspiring work on the web.",
      items: [
        {
          title: 'Idea to Execution',
          description: 'An entire product delivered in-house, from initial strategy to the end result. This means everything we do is fit for purpose, produced to the highest quality.',
          icon: { name: 'VoltageIcon', width: 18 }
        },
        {
          title: 'Full Stack',
          description: 'An entire product delivered in-house, from initial strategy to the end result. This means we everything we do is fit for purpose, produced to the highest quality.',
          icon: { name: 'BackendIcon', width: 28 }
        },
        {
          title: 'Technology Neutral',
          description: 'The best technology is the one that works. We continually listen and observe, so we can recommend the optimal solution for your business problem.',
          icon: { name: 'MonitorIcon', width: 22 }
        },
        {
          title: 'Integrated',
          description: 'We put your website at the heart of your digital ecosystem, providing secure API integrations and automated solutions across your business systems',
          icon: { name: 'PieChartIcon', width: 26 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Elevate your brand',
        paragraph: 'We blend innovative design, cutting-edge technology, and strategic content to deliver websites that are visually appealing and highly functional. Harness the power of deeply engaging digital experiences to take your brand to the next level.',
        icon: { name: 'PointerIcon', width: 64 }
      },
      {
        title: 'Human experiences',
        paragraph: 'Offer an immersive user experience that captures the essence of your brand and resonates with your target audience. From intuitive navigation to immersive storytelling, every website is meticulously crafted to command attention and leave a lasting impression.',
        icon: { name: 'PointerIcon', width: 64 }
      },
      {
        title: 'Robust, Secure, Flexible',
        paragraph: 'Every website we build is backed by secure and performant infrastructure, tailored to the needs of the organisation. This ensures that your digital presence can scale with demand and offer flexibility to meet the needs of your business over time.',
        icon: { name: 'PointerIcon', width: 64 }
      },
      {
        title: 'Rewarding partnerships',
        paragraph: 'Behind every best-in-class website is a collaborative agency–client partnership. We work in close collaboration with you to ensure outcomes that offer extraordinary experiences while delivering results. Awards are nice, but your success means so much more.',
        icon: { name: 'PointerIcon', width: 64 }
      }
    ],
    meta: {
      title: 'Offer — Dev8X | Dev8X: World class digital products',
      description: 'World-class digital products, idea to execution.'
    },
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    footerForm: {
      privacy: {
        year: '2025',
        text: 'Privacy'
      },
      button: {
        text: 'Submit a brief'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8x/'
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
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
      },
      {
        name: 'Paula McCarville',
        company: 'Curtin University',
        bgColor: '#4C21E2',
        color: '#F0EBFF',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/4c0927054c/curtin-open-day.jpg',
        comment: 'From the very beginning, it was evident that the team truly grasped our brief and vision, effectively translating it into a remarkable reality.'
      },
      {
        name: 'Steph Jojart',
        company: 'Schrole',
        bgColor: '#1665A3',
        color: '#E8F5FF',
        transformOrigin: 'top center',
        image: 'https://a-us.storyblok.com/f/1017006/3488x3224/f6a5e2a115/schrole-1744px-x-1612px.jpg',
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: '',
    variant: 'green',
    tagText: 'For SaaS Founder',
    heading: 'One Team. One Process. \n Build Your SaaS faster - \n from $600/month',
    paragraph: 'Vetted React & Next.js developers — or plug-in mini-squads — supervised by senior leads. Start in 7 days with US-friendly overlap and transparent delivery.',
    image: prefixed('/api/images/work/totalhealthdentalcare/mobile/1.png'),
    iconCards: {
      title: 'Start Small Scale Fast',
      paragraph: "Begin with a single developer and upgrade to a full squad when you're ready. Our onboarding and managed support makes the transition seamless.",
      items: [
        {
          title: 'Replacement Guarantee',
          description: 'Not the right fit? We’ll provide a vetted replacement developer within 5 business days — no downtime.',
          icon: { name: 'RefreshIcon', width: 28 }
        },
        {
          title: 'Full Code Ownership',
          description: 'You own 100% of the code, repositories, and documentation — we just help you build it faster and cleaner.',
          icon: { name: 'BackendIcon', width: 26 }
        },
        {
          title: 'Technical Supervision',
          description: 'Every developer is guided by a senior tech lead ensuring code quality, scalability, and architectural consistency.',
          icon: { name: 'AIBrainIcon', width: 26 }
        },
        {
          title: 'Transparent Reporting',
          description: 'Stay in control with weekly sprint reports, live Git access, and real-time task tracking in ClickUp or Jira.',
          icon: { name: 'SeismometerIcon', width: 22 }
        },
        {
          title: 'Quick Onboarding',
          description: 'Start working within 7 days. We handle setup, tools, and environment so you can focus on product outcomes.',
          icon: { name: 'VoltageIcon', width: 18 }
        },
        {
          title: 'US Timezone Overlap',
          description: 'Collaborate smoothly with guaranteed 4-hour overlap with U.S. Eastern Time — perfect for daily syncs and reviews.',
          icon: { name: 'PlanetRingIcon', width: 26 }
        },
        {
          title: 'Flexible Payments',
          description: 'Choose your comfort — pay bi-weekly for flexibility or prepay 3 months and enjoy instant savings.',
          icon: { name: 'CreditCardIcon', width: 26 }
        },
        {
          title: 'Scalable Engagement',
          description: 'Start with one developer and grow to a full squad anytime — without changing your workflow or vendor.',
          icon: { name: 'ScaleIcon', width: 26 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Vetted Talent',
        paragraph: 'Our developers are carefully selected through multi-stage assessments for skill, reliability, and communication. Each one is fluent in English and trained to collaborate seamlessly with U.S. startup teams.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Technical Supervision',
        paragraph: 'Every developer works under the guidance of senior engineers who ensure code quality, scalability, and best practices. This hands-on mentorship keeps projects efficient, maintainable, and future-ready.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/mobile/1.png')
      },
      {
        title: 'Fast Onboarding',
        paragraph: 'Skip the lengthy hiring process. Share your needs, review vetted profiles, and begin development within a week. Our streamlined onboarding ensures your team starts strong and integrates smoothly.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/26.png')
      },
      {
        title: 'Full Code Ownership',
        paragraph: 'We believe in complete transparency and control. You own 100% of your code, repositories, and documentation — with full IP rights securely transferred at every project milestone.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/goldendao/desktop/14.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Ready to ',
      end: 'get started?'
    },
    meta: {
      title: 'SaaS Development Services | Build Your SaaS Product — Dev8X | Dev8X: World class digital products',
      description: 'SaaS Development Services | Build Your SaaS Product — Dev8X | Dev8X: World class digital products'
    },
    footerForm: {
      privacy: {
        year: '2025',
        text: 'Privacy'
      },
      button: {
        text: 'Submit a brief'
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
        comment: 'They simplified the entire process and made tech feel less overwhelming. Really happy with the results.'
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
      { title: '1. How quickly can I start working with a developer or team?', description: 'Most clients begin within 7 days of signing up. Our onboarding process is designed for speed — once we understand your goals, we match you with the right talent and set up your development environment immediately.' },
      { title: '2. What makes your developers “100% vetted”?', description: 'Every developer goes through a multi-stage assessment, including technical interviews, live coding tests, and communication evaluations. Only top-performing professionals with proven track records and strong English communication skills are approved.' },
      { title: '3. Do I retain full ownership of the work?', description: 'Absolutely. You maintain 100% ownership and intellectual property rights to all code, assets, and deliverables created during the project — no hidden clauses or shared rights.' }
    ],
    offersSlider: [
      {
        id: '1',
        heading: 'Junior Developer',
        price: '$600',
        description: 'Perfect for MVPs and quick iterations.',
        features: ['1–2 years experience', 'Daily progress updates', 'Tech lead supervision'],
        categories: ['Mobile Apps', 'Web Design', 'UI/UX', 'Framer Development', 'Brand Design', 'Logos', 'Slide Decks', 'Brand Guides', 'Social Media'],
        buttonText: 'Hire Junior',
        package: 'developers'
      },
      {
        id: '2',
        heading: 'Mid Developer',
        price: '$900',
        description: 'Reliable full-stack React/Next.js dev.',
        features: ['3–5 years experience', 'API integration & unit tests', 'Weekly sprint reviews'],
        categories: ['Mobile Apps', 'Web Design', 'UI/UX', 'Framer Development', 'Brand Design', 'Logos', 'Slide Decks', 'Brand Guides', 'Social Media'],
        buttonText: 'Hire Mid',
        package: 'developers'
      },
      {
        id: '3',
        heading: 'Senior Developer',
        price: '$1,500',
        description: 'Architecture, performance & leadership.',
        features: ['5–8 years experience', 'Mentorship & code reviews', 'System design support'],
        categories: ['Mobile Apps', 'Web Design', 'UI/UX', 'Framer Development', 'Brand Design', 'Logos', 'Slide Decks', 'Brand Guides', 'Social Media'],
        buttonText: 'Hire Senior',
        package: 'developers'
      },
      {
        id: '4',
        heading: 'MVP Squad',
        price: '$4,500',
        description: '2 Developers + QA + PM',
        features: ['Build & launch your MVP in sprints', '4-hour U.S. overlap', 'Managed Agile sprints'],
        categories: ['Mobile Apps', 'Web Design', 'UI/UX', 'Framer Development', 'Brand Design', 'Logos', 'Slide Decks', 'Brand Guides', 'Social Media'],
        buttonText: 'Book a Squad Discovery Call',
        package: 'mini-squads'
      },
      {
        id: '5',
        heading: 'Growth Squad',
        price: '$5,500',
        description: '2 Full-stack Devs + Designer + QA + PM',
        features: ['Feature scaling & UX improvements', 'Designer-led UI upgrades', 'Continuous delivery (CI/CD)'],
        categories: ['Mobile Apps', 'Web Design', 'UI/UX', 'Framer Development', 'Brand Design', 'Logos', 'Slide Decks', 'Brand Guides', 'Social Media'],
        buttonText: 'Start Growth Squad',
        package: 'mini-squads'
      },
      {
        id: '6',
        heading: 'Pro Squad',
        price: '$7,000',
        description: '3 Devs + QA + PM + Senior Lead',
        features: ['High-velocity delivery & architecture', 'Full-stack support + DevOps', 'Dedicated PM & weekly roadmaps'],
        categories: ['Mobile Apps', 'Web Design', 'UI/UX', 'Framer Development', 'Brand Design', 'Logos', 'Slide Decks', 'Brand Guides', 'Social Media'],
        buttonText: 'Start Pro Squad',
        package: 'mini-squads'
      }
    ],
    video: prefixed(`/videos/header/header.mp4`)
  }
];

export default OFFERS;
