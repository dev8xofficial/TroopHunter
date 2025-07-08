import { useState } from 'react';
import { Button } from '../Button/Button';
import RightArrowIcon from '../../Icons/RightArrow';
import CaretDownIcon from '../../Icons/CaretDown';
import CaretUpIcon from '../../Icons/CaretUp';

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
 *  - Product Design
 *  - Application Development
 *  - Frontend Development
 *  - Backend Development
 *  - DevOps Engineering
 *  - AI Engineering
 *  - Business Development
 *  - Marketing & Sales
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
          <strong>Dev8X</strong> invites you to join our team as a <strong>UI/UX Designer Intern</strong> for a 3–6 month remote internship where you'll sharpen your design skills, contribute to exciting product interfaces, and work with developers & product teams in a real-world setup.
        </p>

        <h4>What’s in it for you?</h4>
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
            <strong>Duration:</strong> 3–6 Months
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
          <strong>Dev8X</strong> invites you to be part of an exciting <strong>3–6 month remote Flutter internship</strong> where you’ll grow, build, and innovate alongside a talented team!
        </p>

        <h4>What’s in it for you?</h4>
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
            <strong>Duration:</strong> 3–6 Months
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
          <strong>Dev8X</strong> invites you to be part of an exciting <strong>3–6 month remote AI internship</strong> where you’ll innovate, automate, and grow alongside a forward-thinking tech team!
        </p>

        <h4>What’s in it for you?</h4>
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
            <strong>Duration:</strong> 3–6 Months
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
          <li>Get a recommendation letter and internship certificate upon completion</li>
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
          <strong>Dev8X</strong> invites you to be part of an exciting <strong>3–6 month remote Business Development internship</strong>, where you'll work directly with the leadership team to drive new growth opportunities across platforms like Upwork, LinkedIn, Email, and Cold Calling!
        </p>

        <h4>What’s in it for you?</h4>
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
            <strong>Duration:</strong> 3–6 Months
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
          <li>Get an internship certificate, recommendation letter, and potential for full-time hiring</li>
        </ul>
      </div>
    )
  }
];
export const OpenRolesList: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles['rolesSection']}>
      <div className={styles['rolesContainer']}>
        {roles.map((role, index) => {
          const isExpanded = activeIndex === index;

          return (
            <>
              <div key={index} className={styles['roleCard']}>
                <p className={styles['roleLabel']}>OPEN ROLES</p>

                <div className={styles['roleHeader']}>
                  <h3 className={styles['roleTitle']}>{role.title}</h3>

                  <div className={styles['roleHeaderInner']}>
                    <button type="button" aria-label={isExpanded ? 'Collapse details' : 'Expand details'} onClick={() => handleToggle(index)} className={styles['toggleButton']}>
                      {isExpanded ? <CaretUpIcon width={24} height={24} className={styles['buttonIcon']} /> : <CaretDownIcon width={24} height={24} className={styles['buttonIcon']} />}
                    </button>

                    <Button variant="secondary" context="contact" endIcon={<RightArrowIcon width="14" className={styles['button--icon']} />} spanClassName={styles['contact-button']}>
                      Submit Application
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
              </div>
              <div className={`${styles['jobDescriptionWrapper']} ${isExpanded ? styles['expanded'] : styles['collapsed']}`}>{isExpanded && <div className={styles['jobDescription']}>{role.description}</div>}</div>
            </>
          );
        })}
      </div>
    </section>
  );
};
