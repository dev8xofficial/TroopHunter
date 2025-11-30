import { AboutContent } from '@repo/components';

const PageData: AboutContent = {
  meta: {
    title: 'About Us — Dev8X | Dev8X: Digital Craft Real Impact',
    description: 'Discover how Dev8X crafts, launches, and scales impactful digital solutions for ambitious businesses. 100% independent and purpose-driven, we design with empathy to transform ideas into meaningful experiences.'
  },
  aboutSections: [
    'Human-focused experiences shape everything we create – from how we collaborate as a team, to the partnerships we build, and the digital solutions we deliver. This belief lives in our culture, fuels our curiosity, and drives how we approach every project from start to finish.',
    'Since 2019 we’ve been working with amazing clients to create meaningful impact and compelling experiences.',
    'Our capabilities are centred around our ability to deliver world-class websites and apps. We’re 100% in-house and work end-to-end, ensuring each project is delivered to the highest standard.',
    'Above all, we believe in human relationships, exceptional outcomes, and having fun along the way.'
  ],
  capabilities: [
    {
      heading: 'Strategy & UX',
      items: ['Digital Strategy', 'User Research', 'User Journey Mapping', 'Information Architecture', 'Wireframing']
    },
    {
      heading: 'Design',
      items: ['Interaction Design', 'User Interface Design', 'Design Systems', 'Prototyping & Animation', 'Accessibility']
    },
    {
      heading: 'Development',
      items: ['Websites', 'eCommerce', 'Web Applications', 'Mobile Apps (iOS & Android)', 'Platform Integrations']
    },
    {
      heading: 'Technology',
      items: ['React.js', 'Next.js', 'Node.js', 'Express.js / Nest.js', 'Supabase']
    },
    {
      heading: 'Backend & Databases',
      items: ['Backend', 'Real-Time Apps', 'SaaS', 'PostgreSQL', 'ORM (Sequelize, Prisma)']
    },
    {
      heading: 'DevOps & Cloud',
      items: ['Docker', 'Virtualization', 'Ansible & Web Servers', 'AWS, Vercel, DigitalOcean', 'CI/CD']
    },
    {
      heading: 'Optimisation',
      items: ['Website / App Review', 'Performance Optimisation', 'Conversion Optimisation', 'A/B Testing', 'Ongoing Enhancements']
    },
    {
      heading: 'Support',
      items: ['Project Management', 'Website Hosting', 'Website Maintenance', 'Performance & Security', '3rd Party Integrations']
    }
  ],
  whatWeDo: [
    {
      heading: 'What we do',
      items: ['World-className', 'Expect creativity', 'Celebrate success', 'Obsess over detail', 'Pub lunch Fridays', 'Embrace change', 'Unlock potential', 'High-five', 'Outstanding service', 'Value relationships', 'Exceed expectations', 'Party']
    },
    {
      heading: "What we don't",
      items: ['Work weekends', 'Outsource', 'Resist cake', 'Lose at Mario Kart', '‘Make it pop’', 'Free pitches', 'Sacrifice quality', 'Egos', 'Overpromise', 'Cut corners', 'Accept mediocrity', 'Decaf']
    }
  ],
  testimonials: ['“They simplified the entire process and made tech feel less overwhelming. Really happy with the results.”', '“We had a vague idea — they turned it into a working solution without any stress. Great experience!”'],
  authors: [
    { name: 'Sepand Hokmabadi', position: 'CEO, Total Health Dental Care' },
    { name: 'Devin Picciolini', position: 'CEO, Coral' }
  ],
  footerMainContent: {
    link: '/contact',
    start: 'Let’s make',
    end: 'something wonderful'
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
      icon: { name: 'AsteriskIcon', size: 10 },
      href: 'https://www.linkedin.com/company/dev8x/'
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
  ]
};

export default PageData;
