import AnsibleIcon from '@repo/components/src/Icons/Ansible';
import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import MonitorIcon from '@repo/components/src/Icons/Monitor';
import PuzzlePieceIcon from '@repo/components/src/Icons/PuzzlePiece';
import ShieldIcon from '@repo/components/src/Icons/Shield';
import React from 'react';

const PageData = {
  IconCardsItems: [
    {
      title: 'Effortless Automation',
      description: 'Streamline your infrastructure management with Ansible, automating server configurations and deployment processes for consistency and reliability at scale.',
      icon: <AnsibleIcon width="26" />
    },
    {
      title: 'Optimised for Scalability',
      description: "Whether you're managing a handful of servers or a complex, multi-tier environment, we ensure your web server setup is optimised for performance, security, and scalability.",
      icon: <MonitorIcon width="24" />
    },
    {
      title: 'Seamless Integrations',
      description: 'Integrate your web servers with existing tools and services seamlessly. Our Ansible-based solutions simplify integration, from databases to cloud platforms, to ensure your environment functions smoothly.',
      icon: <PuzzlePieceIcon width="28" />
    },
    {
      title: 'Secure and Reliable',
      description: 'Our solutions focus on securing your web servers, automating patches and updates, and ensuring that best practices are always followed for a bulletproof deployment pipeline.',
      icon: <ShieldIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Automate Infrastructure with Ansible',
      paragraph: "Leverage the power of Ansible to automate your infrastructure and streamline server management. With efficient playbooks and modules, we ensure your environments are consistent, repeatable, and scalable, saving you time and reducing human error. Whether you're deploying web servers, databases, or complex multi-tier applications, Ansible makes it easy to manage and configure at scale.",
      icon: <AnsibleIcon width="64" />
    },
    {
      title: 'Scalable Web Server Management',
      paragraph: "Optimise and scale your web servers with streamlined configuration management. We implement industry best practices for configuring and maintaining web servers, ensuring high availability, load balancing, and secure deployment. From Nginx to Apache, we tailor configurations to meet your application's specific needs, ensuring maximum performance and reliability.",
      icon: <AnsibleIcon width="64" />
    },
    {
      title: 'Seamless Deployment & Orchestration',
      paragraph: 'From automated deployment to orchestration across multiple environments, Ansible integrates seamlessly into your CI/CD pipeline. We help you automate every stage of your development lifecycle, from testing and staging to production. With Ansible’s simple yet powerful playbooks, you can deploy, configure, and manage your web servers with minimal effort and maximum efficiency.',
      icon: <AnsibleIcon width="64" />
    },
    {
      title: 'Secure, Reliable, and Efficient',
      paragraph: 'Security and reliability are at the core of our approach. With Ansible, we implement robust security measures across your web servers, including automated patch management, firewall configuration, and secure communications. Our solutions ensure your infrastructure is protected and your web servers remain highly available, resilient, and efficient.',
      icon: <AnsibleIcon width="64" />
    },
    {
      title: 'Your Infrastructure, Our Expertise',
      paragraph: 'Leverage our deep expertise in Ansible and web server management to optimise your infrastructure and deployment strategies. Our team works closely with you to understand your specific requirements, tailoring solutions that scale with your business. We guide you through every step, from initial configuration to ongoing management, ensuring that your infrastructure evolves smoothly and efficiently as your business grows.',
      icon: <AnsibleIcon width="64" />
    }
  ],
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
      title: (
        <>
          <s>Twitter</s> X
        </>
      ),
      icon: <AsteriskIcon width="13" />,
      href: 'https://x.com/dev8x'
    },
    {
      title: 'Instagram',
      icon: <AsteriskIcon width="13" />,
      href: 'https://instagram.com/dev8x'
    },
    {
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/company/dev8x/posts/'
    }
  ],
  testimonials: [
    {
      name: 'Henry Luong',
      company: 'Unios',
      bgColor: '#ffffff',
      color: '#111111',
      transformOrigin: 'center top',
      image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
      comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Humaan.'
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
      comment: 'From conception through to launch, the Humaan team has been nothing short of amazing. I wouldn’t hesitate to recommend Humaan to any business.'
    }
  ]
};

export default PageData;
