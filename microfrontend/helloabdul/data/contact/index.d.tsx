import { ContactContent } from '@repo/components';
import { COPYRIGHT_YEAR } from '../constants';

const PageData: ContactContent = {
  meta: {
    title: 'Contact Me — Abdul | Frontend Dev, US Tech Ready',
    description: "Got a frontend challenge? I love turning pixels into experiences that actually work. Let's chat and build something that doesn't just look good—it ships."
  },
  paragraph: "We've got a great feeling about this",
  buttonText: 'Send a message',
  footerMainContent: {
    link: '/contact',
    start: 'Let’s make',
    end: 'your frontend fearless!'
  },
  footerData: {
    global: {
      heading: 'I work globally',
      email: 'contact@helloabdul.com',
      buttonText: 'Hire me'
    },
    offices: [
      {
        country: 'Pakistan (Base)',
        city: 'Lahore, Punjab',
        phone: '+92 (329) 294-7777'
      },
      {
        country: 'USA (Focus)',
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
      year: COPYRIGHT_YEAR,
      text: 'Privacy Policy',
      privacyLink: '/privacy'
    }
  },
  footerSocialLinks: [
    {
      title: 'LinkedIn',
      // icon: { name: 'AsteriskIcon', size: 10 },
      href: 'https://www.linkedin.com/in/helloabdul/'
    },
    // {
    //   title: 'Instagram',
    //   icon: { name: 'AsteriskIcon', size: 10 },
    //   href: 'https://www.instagram.com/reh.m.an/'
    // },
    // {
    //   title: 'Facebook',
    //   href: 'https://www.facebook.com/share/15PGxbroKkm/'
    // }
  ]
};

export default PageData;
