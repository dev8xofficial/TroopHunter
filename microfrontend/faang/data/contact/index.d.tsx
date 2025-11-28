import { ContactContent } from '@repo/components';

const PageData: ContactContent = {
  meta: {
    title: 'Contact Us — Dev8X | Dev8X: World class digital products',
    description: "Ready to create something extraordinary? We've got a great feeling about this. Lets get started! "
  },
  paragraph: "We've got a great feeling about this",
  buttonText: 'Submit a brief',
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
  ]
};

export default PageData;
