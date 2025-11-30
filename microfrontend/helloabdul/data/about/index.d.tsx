import { AboutContent } from '@repo/components';

const PageData: AboutContent = {
  meta: {
    title: 'Frontend Made Fearless! — Abdul',
    description: 'I craft fast, accessible, and scalable web experiences that feel effortless for users and reliable for engineering teams. From React to real-world product thinking — I ship code that ships businesses forward.'
  },
  aboutSections: [
    "I believe the best digital experiences start with empathy — for users, teammates, and the people who'll actually ship the product. Every interface I build has one job: make someone’s day a little easier and a little cooler.",
    "For 6+ years, I've been shipping frontend solutions across the US tech ecosystem — from small startups to high-growth SaaS — solving real problems with React, Next.js, and a sprinkle of product thinking.",
    'I design, build, and optimize websites and apps that load fast, behave predictably, and scale effortlessly. End-to-end frontend engineering is my playground.',
    'Above all, I value collaboration, quality, and a sense of humor — code should work, teams should laugh, and users should smile.'
  ],
  capabilities: [
    {
      heading: 'Strategy & UX',
      items: ['User Research', 'Product Thinking', 'User Flows & Journeys', 'Wireframing & Prototyping', 'Accessibility-first Design']
    },
    {
      heading: 'Design',
      items: ['Interaction Design', 'UI Components', 'Design Systems', 'Animations & Microinteractions', 'Pixel-perfect Layouts']
    },
    {
      heading: 'Frontend Development',
      items: ['React.js', 'Next.js', 'TypeScript', 'State Management (Redux, Zustand, Jotai)', 'SSR & SSG']
    },
    {
      heading: 'Full-stack Collaboration',
      items: ['Node.js / Express.js', 'API Integration', 'GraphQL / REST', 'Database Collaboration (PostgreSQL, Supabase)', 'CI/CD for Frontend']
    },
    {
      heading: 'Performance & Optimisation',
      items: ['Core Web Vitals', 'Lazy Loading & Code Splitting', 'A/B Testing', 'SEO & Accessibility Optimisation', 'Ongoing Improvements']
    },
    {
      heading: 'Dev Tools & Workflow',
      items: ['Git & GitHub Workflows', 'Docker for Dev Environments', 'Testing (Jest, RTL, Cypress)', 'VSCode & Browser DevTools', 'Automation & Linters']
    }
  ],
  whatWeDo: [
    {
      heading: 'What I do',
      items: ['Ship production-grade React apps', 'Solve tricky UI problems', 'Bridge design and code seamlessly', 'Optimize performance obsessively', 'Collaborate like a pro', 'Keep learning and experimenting', 'Have fun while coding']
    },
    {
      heading: "What I don't",
      items: ['Ship buggy code', 'Ignore accessibility', 'Overcomplicate solutions', 'Skip code reviews', 'Work weekends unnecessarily', 'Sacrifice maintainability']
    }
  ],
  testimonials: ['“Abdul is a unique professional. His pristine work ethics and adjustability made my transition incredibly smooth and comfortable. Thanks a lot for going out of your way to help!”', "“I highly endorse Abdul as a skilled React developer. He's a strong collaborator and works efficiently with modern front-end tools.”"],
  authors: [
    { name: 'Adil Peter', position: 'Full Stack JavaScript Engineer, Adil Peter' },
    { name: 'Zubair Mahboob', position: 'CEO, Worko Dev' }
  ],
  footerMainContent: {
    link: '/contact',
    start: 'Let’s build',
    end: 'something that actually ships 🚀'
  },
  footerData: {
    global: {
      heading: 'I work globally',
      email: 'contact@helloabdul.com',
      buttonText: 'Hire me'
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
    //   heading: 'We’re Growing – Join Our Team',
    //   description: 'Let’s build the future, together.',
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
    { title: 'LinkedIn', icon: { name: 'AsteriskIcon', size: 10 }, href: 'https://www.linkedin.com/in/helloabdul/' },
    { title: 'Instagram', icon: { name: 'AsteriskIcon', size: 10 }, href: 'https://www.instagram.com/dev8xofficial/' },
    { title: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61569289660818' }
  ]
};
export default PageData;
