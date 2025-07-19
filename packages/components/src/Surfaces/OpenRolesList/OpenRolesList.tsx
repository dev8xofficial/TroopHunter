import React from 'react';
import { atom, useSetAtom } from 'jotai';
import { toggleSmoothModalAtom } from '../../../../..//microfrontend/dev8X/store/smoothModalAtom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Button } from '../Button/Button';
import RightArrowIcon from '../../Icons/RightArrow';
import CaretDownIcon from '../../Icons/CaretDown';
import CaretUpIcon from '../../Icons/CaretUp';
import { useMediaQuery } from 'react-responsive';

import styles from './index.module.css';

type Role = {
  title: string;
  type: string;
  salary: string;
  location: string;
  description: React.ReactNode;
};
/**
 * Sequence of Roles by Departments
 *  - UI/UX Design
 *  - Flutter Development
 *  - Frontend Development
 *  - Backend Development
 *  - DevOps Engineering
 *  - AI Engineering
 *  - Business Development
 *  - Customer Support
 *  - Human Resources
 */

const roles: Role[] = [
  {
    title: 'UI/UX Designer Internship',
    type: 'Internship',
    salary: 'Unpaid',
    location: 'Remote / Lahore',
    description: (
      <div>
        <p>
          <strong>Start Your Design Career with Dev8X – Remote UI/UX Internship Opportunity!</strong>
        </p>
        <p>Are you passionate about crafting delightful user experiences and elegant user interfaces? Looking to gain hands-on experience in real-world projects that users love?</p>
        <p>
          <strong>Dev8X</strong> invites you to be part of an exciting <strong>6 month remote UI/UX Designer internship</strong> where you'll grow, build, and innovate alongside a talented team!
        </p>

        <h4>What's in it for you?</h4>
        <ul>
          <li>Work on real client projects with full UI/UX design cycle experience</li>
          <li>Enhance your design portfolio with modern web and mobile UIs</li>
          <li>Learn how to think like a product designer and solve real user problems</li>
          <li>Collaborate closely with developers and leadership in a remote team</li>
        </ul>

        <h4>Internship Details:</h4>
        <ul>
          <li>
            <strong>Position:</strong> UI/UX Designer Intern
          </li>
          <li>
            <strong>Duration:</strong> 6 Months
          </li>
          <li>
            <strong>Location:</strong> Remote / Lahore
          </li>
          <li>
            <strong>Timings:</strong> 7:00 PM to 1:00 AM (PKT)
          </li>
          <li>
            <strong>Internship Type:</strong> Unpaid
          </li>
        </ul>

        <h4> Key Responsibilities:</h4>
        <ul>
          <li>Design intuitive and elegant user interfaces for mobile and web</li>
          <li>Create wireframes, mockups, and interactive prototypes in Figma or Adobe XD</li>
          <li>Conduct user research and apply findings to UX design</li>
          <li>Collaborate with developers to ensure accurate design implementation</li>
          <li>Participate in product discussions and suggest UX improvements</li>
        </ul>

        <h4> Requirements:</h4>
        <ul>
          <li>
            <strong>Tools:</strong> Figma (must), Adobe XD, Illustrator (bonus)
          </li>
          <li>
            <strong>Skills:</strong> Design systems, typography, layout, color theory
          </li>
          <li>Good sense of aesthetics and attention to detail</li>
          <li>A portfolio or Dribbble/Behance link showing past design work</li>
          <li>Proactive attitude and willingness to learn</li>
        </ul>

        <h4> Why Join Dev8X?</h4>
        <ul>
          <li>Design for real products, not just concepts</li>
          <li>Receive 1-on-1 design feedback and mentorship</li>
          <li>Build a job-ready portfolio and gain confidence in real-world UI/UX</li>
          <li>Internship certificate, recommendation letter, and a potential path to full-time</li>
        </ul>
      </div>
    )
  },
  {
    title: 'Flutter Developer Internship',
    type: 'Internship',
    salary: 'Unpaid',
    location: 'Remote / Lahore',
    description: (
      <div>
        <p>
          <strong>Kickstart Your Career with Dev8X – Remote Flutter Developer Internship Opportunity!</strong>
        </p>
        <p>Are you a Flutter enthusiast with a passion for building beautiful, high-performance mobile apps? Looking to take your cross-platform development skills to the next level in a real-world setting?</p>
        <p>
          <strong>Dev8X</strong> invites you to be part of an exciting <strong>6 month remote Flutter internship</strong> where you'll grow, build, and innovate alongside a talented team!
        </p>

        <h4>What's in it for you?</h4>
        <ul>
          <li>Work on real-world mobile applications using Flutter & Dart</li>
          <li>Strengthen your portfolio and sharpen your coding skills</li>
          <li>Collaborate with a supportive, forward-thinking remote team</li>
        </ul>

        <h4>Internship Details:</h4>
        <ul>
          <li>
            <strong>Position:</strong> Flutter Developer Intern
          </li>
          <li>
            <strong>Duration:</strong> 6 Months
          </li>
          <li>
            <strong>Location:</strong> Remote / Lahore
          </li>
          <li>
            <strong>Timings:</strong> 7:00 PM to 1:00 AM (PKT)
          </li>
          <li>
            <strong>Internship Type:</strong> Unpaid
          </li>
        </ul>

        <h4> Key Responsibilities:</h4>
        <ul>
          <li>Design, develop, and test cross-platform mobile applications using Flutter</li>
          <li>Optimize app performance and resolve bugs</li>
          <li>Participate in team discussions and contribute innovative solutions</li>
          <li>Stay updated with the latest Flutter & Dart trends and best practices</li>
        </ul>

        <h4> Requirements:</h4>
        <ul>
          <li>
            <strong>Location:</strong> Open to remote applicants
          </li>
          <li>
            <strong>Skills:</strong> Proficient in Flutter, Dart, and Git
          </li>
          <li>Familiarity with tools like Android Studio, VS Code, Cursor or other Flutter development environments</li>
          <li>A proactive attitude and genuine passion for mobile development</li>
        </ul>

        <h4> Why Join Dev8X?</h4>
        <ul>
          <li>Work on meaningful, real-world projects</li>
          <li>Receive mentorship and constructive feedback from experienced developers</li>
          <li>Build a standout portfolio to launch your career in tech</li>
          <li>Internship certificate, recommendation letter, and a potential path to full-time</li>
        </ul>
      </div>
    )
  },
  {
    title: 'Frontend Developer Internship',
    type: 'Internship',
    salary: 'Unpaid',
    location: 'Remote / Lahore',
    description: (
      <div>
        <p>
          <strong>Kickstart Your Career with Dev8X – Remote Frontend Developer Internship Opportunity!</strong>
        </p>
        <p>Are you passionate about crafting sleek, responsive web interfaces with React and Next.js? Ready to sharpen your skills in a real-world development environment?</p>
        <p>
          <strong>Dev8X</strong> invites you to be part of an exciting <strong>6 month remote Frontend Development internship</strong> where you'll grow, build, and innovate alongside a talented team!
        </p>

        <h4>What's in it for you?</h4>
        <ul>
          <li>Build and enhance modern web applications using React.js, Next.js, and TailwindCSS</li>
          <li>Strengthen your portfolio with real-world projects</li>
          <li>Collaborate with a skilled, remote-first development team</li>
        </ul>

        <h4>Internship Details:</h4>
        <ul>
          <li>
            <strong>Position:</strong> Web Frontend Developer Intern
          </li>
          <li>
            <strong>Duration:</strong> 6 Months
          </li>
          <li>
            <strong>Location:</strong> Remote / Lahore
          </li>
          <li>
            <strong>Timings:</strong> 8:00 PM to 2:00 AM (PKT)
          </li>
          <li>
            <strong>Internship Type:</strong> Unpaid
          </li>
        </ul>

        <h4>Key Responsibilities:</h4>
        <ul>
          <li>Develop responsive UI components with React.js and Next.js</li>
          <li>Style web applications using TailwindCSS</li>
          <li>Work closely with backend developers and designers to implement new features</li>
          <li>Fix UI/UX bugs and optimize frontend performance</li>
          <li>Stay updated on the latest frontend trends and tools</li>
        </ul>

        <h4>Requirements:</h4>
        <ul>
          <li>
            <strong>Location:</strong> Open to remote applicants
          </li>
          <li>
            <strong>Skills:</strong> Strong understanding of React.js, Next.js, TailwindCSS, and Git
          </li>
          <li>Familiarity with component-based design and modern web standards</li>
          <li>
            <strong>Soft Skills:</strong> Self-driven, detail-oriented, and eager to learn
          </li>
          <li>Portfolio or GitHub projects showcasing your frontend work (preferred)</li>
        </ul>

        <h4>Why Join Dev8X?</h4>
        <ul>
          <li>Contribute to impactful, user-facing web applications</li>
          <li>Receive hands-on mentorship from experienced frontend engineers</li>
          <li>Build a standout portfolio for your future in web development</li>
          <li>Internship certificate, recommendation letter, and a potential path to full-time</li>
        </ul>
      </div>
    )
  },
  {
    title: 'Backend Developer Internship',
    type: 'Internship',
    salary: 'Unpaid',
    location: 'Remote / Lahore',
    description: (
      <div>
        <p>
          <strong>Kickstart Your Career with Dev8X – Remote Backend Developer Internship Opportunity!</strong>
        </p>
        <p>Are you passionate about building robust and scalable backend systems using Node.js and PostgreSQL? Ready to dive deep into real-world backend development with modern ORMs like Sequelize and Prisma?</p>
        <p>
          <strong>Dev8X</strong> invites you to be part of an exciting <strong>6 month remote Backend Development internship</strong> where you'll grow, build, and innovate alongside a talented team!
        </p>

        <h4>What's in it for you?</h4>
        <ul>
          <li>Work on real-world web applications using Node.js, PostgreSQL, and modern ORMs</li>
          <li>Enhance your coding skills and contribute to meaningful backend systems</li>
          <li>Collaborate with a passionate, fast-paced remote team</li>
        </ul>

        <h4>Internship Details:</h4>
        <ul>
          <li>
            <strong>Position:</strong> Web Backend Developer Intern
          </li>
          <li>
            <strong>Duration:</strong> 6 Months
          </li>
          <li>
            <strong>Location:</strong> Remote / Lahore
          </li>
          <li>
            <strong>Timings:</strong> 8:00 PM to 2:00 AM (PKT)
          </li>
          <li>
            <strong>Internship Type:</strong> Unpaid
          </li>
        </ul>

        <h4>Key Responsibilities:</h4>
        <ul>
          <li>Design and develop RESTful APIs and backend services using Node.js</li>
          <li>Model and manage relational data in PostgreSQL using Sequelize or Prisma</li>
          <li>Fix bugs, optimize database performance, and write clean, maintainable code</li>
          <li>Collaborate in code reviews, planning discussions, and sprints</li>
          <li>Stay updated with best practices in backend architecture and database design</li>
        </ul>

        <h4>Requirements:</h4>
        <ul>
          <li>
            <strong>Location:</strong> Open to remote applicants
          </li>
          <li>
            <strong>Skills:</strong> Proficient in Node.js, PostgreSQL, and Git
          </li>
          <li>Experience with at least one ORM (Sequelize or Prisma)</li>
          <li>Familiarity with Express.js and backend development tools</li>
          <li>A passion for clean code, learning, and solving real-world problems</li>
          <li>Portfolio or GitHub showcasing backend work (preferred)</li>
        </ul>

        <h4>Why Join Dev8X?</h4>
        <ul>
          <li>Work on impactful backend systems used by real users</li>
          <li>Gain mentorship from skilled engineers and receive practical feedback</li>
          <li>Build a strong backend portfolio that gets attention in the tech industry</li>
          <li>Internship certificate, recommendation letter, and a potential path to full-time</li>
        </ul>
      </div>
    )
  },
  {
    title: 'AI Engineer Internship',
    type: 'Internship',
    salary: 'Unpaid',
    location: 'Remote / Lahore',
    description: (
      <div>
        <p>
          <strong>Kickstart Your Career with Dev8X – Remote AI Engineer Internship Opportunity!</strong>
        </p>
        <p>Are you passionate about AI, automation, and building intelligent agents that solve real-world problems? Looking to get hands-on experience with cutting-edge tools like OpenAI and n8n?</p>
        <p>
          <strong>Dev8X</strong> invites you to be part of an exciting <strong>6 month remote AI Engineer internship</strong> where you'll grow, build, and innovate alongside a talented team!
        </p>

        <h4>What's in it for you?</h4>
        <ul>
          <li>Build AI agents for customer support and business automation</li>
          <li>Work with real-world tools like n8n, OpenAI, and LangChain</li>
          <li>Enhance your portfolio with impactful AI automation projects</li>
          <li>Collaborate with a supportive, remote-first engineering team</li>
        </ul>

        <h4>Internship Details:</h4>
        <ul>
          <li>
            <strong>Position:</strong> AI Engineer Intern
          </li>
          <li>
            <strong>Duration:</strong> 6 Months
          </li>
          <li>
            <strong>Location:</strong> Remote / Lahore
          </li>
          <li>
            <strong>Timings:</strong> 7:00 PM to 1:00 AM (PKT)
          </li>
          <li>
            <strong>Internship Type:</strong> Unpaid
          </li>
        </ul>

        <h4> Key Responsibilities:</h4>
        <ul>
          <li>Design and implement AI agents to handle customer queries and internal workflows</li>
          <li>Integrate APIs such as OpenAI, LinkedIn, and SMTP for personalized communication</li>
          <li>Build automation pipelines using n8n and custom scripting (Node.js or Python)</li>
          <li>Develop systems to send messages to job applicants and post content on LinkedIn</li>
          <li>Maintain and optimize workflows with error handling and logging</li>
        </ul>

        <h4> Requirements:</h4>
        <ul>
          <li>
            <strong>Location:</strong> Open to remote applicants
          </li>
          <li>
            <strong>Skills:</strong> Familiarity with APIs, automation platforms, and AI/LLM tools
          </li>
          <li>Experience with n8n, OpenAI, LangChain, Node.js, or Python</li>
          <li>Knowledge of Webhooks, REST APIs, OAuth is a plus</li>
          <li>A proactive attitude and strong interest in automation & AI systems</li>
        </ul>

        <h4> Why Join Dev8X?</h4>
        <ul>
          <li>Work on meaningful, production-level automation projects</li>
          <li>Learn directly from experienced engineers and AI developers</li>
          <li>Build a standout portfolio to launch your AI/Automation career</li>
          <li>Internship certificate, recommendation letter, and a potential path to full-time</li>
        </ul>
      </div>
    )
  },
  {
    title: 'Business Development Internship',
    type: 'Internship',
    salary: 'Unpaid',
    location: 'Remote / Lahore',
    description: (
      <div>
        <p>
          <strong>Launch Your Career in Tech Sales with Dev8X – Remote Business Development Internship Opportunity!</strong>
        </p>
        <p>Are you a persuasive communicator with a passion for connecting with people and growing businesses? Looking to gain hands-on experience in client acquisition, outreach, and tech sales?</p>
        <p>
          <strong>Dev8X</strong> invites you to be part of an exciting <strong>6 month remote Business Development internship</strong> where you'll grow, build, and innovate alongside a talented team!
        </p>

        <h4>What's in it for you?</h4>
        <ul>
          <li>Get real-world experience in B2B tech sales and lead generation</li>
          <li>Learn how to pitch, negotiate, and close deals</li>
          <li>Build a solid portfolio of sales strategies and client engagement work</li>
          <li>Collaborate with a growth-driven and supportive remote team</li>
        </ul>

        <h4>Internship Details:</h4>
        <ul>
          <li>
            <strong>Position:</strong> Business Development Intern
          </li>
          <li>
            <strong>Duration:</strong> 6 Months
          </li>
          <li>
            <strong>Location:</strong> Remote / Lahore
          </li>
          <li>
            <strong>Timings:</strong> 7:00 PM to 1:00 AM (PKT)
          </li>
          <li>
            <strong>Internship Type:</strong> Unpaid
          </li>
        </ul>

        <h4> Key Responsibilities:</h4>
        <ul>
          <li>Identify, research, and qualify potential leads</li>
          <li>Write and send winning proposals on Upwork</li>
          <li>Connect with decision-makers on LinkedIn and build lasting relationships</li>
          <li>Launch and manage cold email campaigns using tools like Mailshake or Instantly</li>
          <li>Conduct cold calls and introductory meetings with potential clients</li>
          <li>Maintain CRM data, track responses, and report weekly performance</li>
        </ul>

        <h4> Requirements:</h4>
        <ul>
          <li>
            <strong>Location:</strong> Open to remote applicants (preferably Pakistan-based)
          </li>
          <li>
            <strong>Skills:</strong> Excellent written and verbal English communication
          </li>
          <li>Confident in making cold calls and presenting over video meetings</li>
          <li>Familiar with Upwork, LinkedIn, or other B2B platforms</li>
          <li>Knowledge of CRM tools, email outreach platforms, or lead-gen tools is a bonus</li>
          <li>Eagerness to learn and a results-driven mindset</li>
        </ul>

        <h4> Why Join Dev8X?</h4>
        <ul>
          <li>Work on real client acquisition projects from Day 1</li>
          <li>Receive 1-on-1 mentorship from seasoned business developers</li>
          <li>Learn end-to-end sales workflows in the IT services space</li>
          <li>Build a portfolio that makes you stand out in tech business roles</li>
          <li>Internship certificate, recommendation letter, and a potential path to full-time</li>
        </ul>
      </div>
    )
  }
];

// Atoms
export const selectedRoleAtom = atom<string | null, [string | null], void>(null, (get, set, newValue) => set(selectedRoleAtom, newValue));
export const selectedRoleFirstParagraphAtom = atom<string | null, [string | null], void>(null, (get, set, newValue) => set(selectedRoleFirstParagraphAtom, newValue));
export const selectedRoleThirdParagraphAtom = atom<string | null, [string | null], void>(null, (get, set, newValue) => set(selectedRoleThirdParagraphAtom, newValue));

// Helper: extract paragraph with <strong>Dev8X</strong>
const firstRoleDescription = (description: React.ReactNode): string => {
  if (React.isValidElement(description)) {
    const children = React.Children.toArray(description.props.children);
    const firstMatchingParagraph = children.find((child) => React.isValidElement(child) && child.type === 'p' && React.Children.toArray(child.props.children).some((content) => React.isValidElement(content) && content.type === 'strong' && String(content.props.children).includes('Dev8X')));
    if (firstMatchingParagraph && React.isValidElement(firstMatchingParagraph)) {
      const extractText = (children: React.ReactNode): string => {
        if (typeof children === 'string') return children;
        if (Array.isArray(children)) return children.map(extractText).join('');
        if (React.isValidElement(children) && children.props?.children) return extractText(children.props.children);
        return '';
      };
      return extractText(firstMatchingParagraph.props.children);
    }
  }
  return '';
};

// Helper: extract third <p>
const extractRoleDescription = (description: React.ReactNode): string => {
  if (React.isValidElement(description)) {
    const children = React.Children.toArray(description.props.children);
    const thirdParagraph = children.find((child, idx) => idx === 2 && React.isValidElement(child) && child.type === 'p');
    if (thirdParagraph && React.isValidElement(thirdParagraph)) {
      const extractText = (children: React.ReactNode): string => {
        if (typeof children === 'string') return children;
        if (Array.isArray(children)) return children.map(extractText).join('');
        if (React.isValidElement(children) && children.props?.children) return extractText(children.props.children);
        return '';
      };
      return extractText(thirdParagraph.props.children);
    }
  }
  return '';
};

// Format role title nicely
const formatRoleTitle = (title: string) => {
  return title
    .replace(/Internship/i, '')
    .trim()
    .split(' ')
    .map((word) => {
      const upper = word.toUpperCase();
      if (['UI/UX', 'AI', 'HR'].includes(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};
export const OpenRolesList: React.FC = () => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const setSelectedRole = useSetAtom(selectedRoleAtom);
  const setFirstParagraph = useSetAtom(selectedRoleFirstParagraphAtom);
  const setThirdParagraph = useSetAtom(selectedRoleThirdParagraphAtom);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1199px)' });

  const handleApplyClick = (roleTitle: string) => {
    const cleanTitle = formatRoleTitle(roleTitle);
    const role = roles.find((r) => r.title === roleTitle);

    setSelectedRole(cleanTitle);

    if (role) {
      setFirstParagraph(firstRoleDescription(role.description));
      setThirdParagraph(extractRoleDescription(role.description));
    }

    toggleModal('career');
  };

  return (
    <section className={styles['rolesSection']}>
      <div className={styles['rolesContainer']}>
        {roles.map((role, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <DisclosureButton as="div" className={styles['roleCard']} aria-label={open ? 'Collapse details' : 'Expand details'}>
                  <p className={styles['roleLabel']}>OPEN ROLES</p>

                  <div className={styles['roleHeader']}>
                    <h3 className={styles['roleTitle']}>{role.title}</h3>

                    <div className={styles['roleHeaderInner']}>
                      <button type="button" className={styles['toggleButton']}>
                        {open ? <CaretUpIcon width={24} height={24} className={styles['buttonIcon']} /> : <CaretDownIcon width={24} height={24} className={styles['buttonIcon']} />}
                      </button>

                      <Button
                        variant="secondary"
                        context="contact"
                        endIcon={<RightArrowIcon width="14" className={styles['button--icon']} />}
                        spanClassName={styles['contact-button']}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleApplyClick(role.title);
                        }}
                      >
                        {!isTabletOrMobile && 'Submit Application'}
                      </Button>
                    </div>
                  </div>

                  <div className={styles['roleDetails']}>
                    <span>{role.type}</span>
                    <span>
                      <svg width="11" height="auto" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M38.8737 0.00621275H31.1263V25.6217L13.0221 7.51132L7.54238 12.991L25.6839 31.1263H0V38.8737H25.6776L7.54238 57.009L13.0221 62.4887L31.1201 44.3907V70H38.8675V44.3286L57.0276 62.4887L62.5073 57.009L44.3721 38.8737H70V31.1325H44.3907L62.526 12.9972L57.0462 7.51753L38.8737 25.6901V0.00621275Z" fill="currentColor"></path>
                      </svg>
                    </span>
                    <span>{role.salary}</span>
                    <span>
                      <svg width="11" height="auto" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M38.8737 0.00621275H31.1263V25.6217L13.0221 7.51132L7.54238 12.991L25.6839 31.1263H0V38.8737H25.6776L7.54238 57.009L13.0221 62.4887L31.1201 44.3907V70H38.8675V44.3286L57.0276 62.4887L62.5073 57.009L44.3721 38.8737H70V31.1325H44.3907L62.526 12.9972L57.0462 7.51753L38.8737 25.6901V0.00621275Z" fill="currentColor"></path>
                      </svg>
                    </span>
                    <span>{role.location}</span>
                  </div>
                </DisclosureButton>

                <DisclosurePanel className={`${styles['jobDescriptionWrapper']} ${open ? styles['expanded'] : ''}`}>
                  <div className={styles['jobDescription']}>{role.description}</div>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </section>
  );
};
