import { RoleProject } from '../../Interfaces/Work/RoleProjectTypes';
import { prefixed } from '../../../utils/helpers';

import CaseStudySiderbarStyles from '../../Surfaces/CaseStudySidebar/index.module.css';
import WorkCardStyles from '../../Surfaces/WorkCard/index.module.css';
import ProjectContentStyles from '../../Surfaces/ProjectContents/index.module.css';
import styles from './../../Data display/OpenRolesList/index.module.css';

export const INTERNSHIP_ROLES: RoleProject[] = [
  /**
   * Sequence of Roles by Departments
   *  - Graphic Designer
   *  - UI/UX Design
   *  - ASO (App Store Optimization)
   *  - Flutter Development
   *  - Frontend Development
   *  - Backend Development
   *  - DevOps Engineering
   *  - AI Engineering
   *  - Business Development
   *  - Lead Generation
   *  - Upwork Bidder
   *  - Customer Support
   *  - Human Resources
   **/

  {
    subTitle: 'OPEN ROLES',
    title: 'Digital Marketing',
    type: 'Internship',
    salary: 'Unpaid',
    location: 'Remote / Lahore',
    description: (
      <div>
        <div className={`${CaseStudySiderbarStyles['sidebar__intro']}`}>
          <p>Launch Your Career with Dev8X – Remote Digital Marketing Internship Opportunity!</p>
        </div>
        <div className={`${CaseStudySiderbarStyles['sidebar__body']}`}>
          <p>Are you curious about how websites and mobile apps grow? Want to gain hands-on experience across SEO, ads, social media, and App Store Optimization (ASO) while working on real campaigns that drive leads, traffic, and app installs?</p>

          <p className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>Dev8X</caption> invites you to be part of an exciting <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>6 month remote Digital Marketing internship</caption> where you’ll learn how to manage multi-channel campaigns, optimize app visibility, and contribute to real-world growth projects! </p>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>What's in it for you?</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
              <li>Digital marketing mindset: SEO, SEM, SMM, Email, Content.</li>
              <li>Market research, competitor analysis, and consumer psychology.</li>
              <li>Content & campaign basics (blogs, social media, email).</li>
              <li>App market research & keyword strategy (SensorTower, AppTweak).</li>
              <li>Metadata optimization (titles, descriptions, keywords, localization).</li>
              <li>Creative optimization (icons, screenshots, videos).</li>
              <li>Reviews, ratings & reputation management.</li>
              <li>A/B testing & performance tracking for apps.</li>
              <li>Retention & lifecycle marketing (email flows, push notifications).</li>
              <li>Creative production for ads & app stores.</li>
              <li>Community building & review management.</li>
            </ul>
          </div>

          <div className={ProjectContentStyles['project-content__block-image']}>
            <div className={ProjectContentStyles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <div
                className="WorkCard_work-card-wrapper__DfwMI"
                style={
                  {
                    '--aspect-x': 1452,
                    '--aspect-y': 890,
                    opacity: 1,
                    transform: 'translateY(0px)'
                  } as React.CSSProperties
                }
              >
                <a className={`${WorkCardStyles['work-card']} ${WorkCardStyles['work-card--landscape']} ${styles['block-image-spacing']}`} href="/" target="_blank">
                  <div className={WorkCardStyles['work-card__thumbnail-wrapper']}>
                    <div className={`${WorkCardStyles['work-card__thumbnail-outer']} ${WorkCardStyles['bg--troophunter-light']}`} style={{ height: '200%' }}></div>
                    <div className={`${WorkCardStyles['work-card__thumbnail-inner']} undefined`}>
                      <picture className="Picture_picture__gpFzt WorkCard_work-card__picture__6Naim" style={{ height: '100%' }}>
                        <img src={prefixed('/api/images/placeholder/1080-transparent.png/m/312x178/filters:quality(80)')} loading="lazy" width={312} height={178} alt="AI Workflow Preview" draggable={false} />
                      </picture>
                      <video className={WorkCardStyles['work-card__video']} autoPlay loop playsInline src={prefixed('/videos/work/ai/1080.mp4')}></video>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Internship Details:</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']}`}>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Position:</caption> Digital Marketing Intern (Mobile Growth Focus)
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Duration:</caption> 6 Months
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Remote / Lahore
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Timings:</caption> 8:00 PM to 2:00 AM (PKT)
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Internship Type:</caption> Unpaid
              </li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Key Responsibilities:</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']}`}>
              <li>Assist in SEO, ads, content, and social media execution.</li>
              <li>Support app store optimization projects (keywords, creatives, reviews).</li>
              <li>Run market research & competitor benchmarking.</li>
              <li>Track & analyze performance using Google Analytics, Firebase, and app store consoles.</li>
              <li>Help design, test & optimize landing pages, creatives, and campaigns.</li>
              <li>Document results → build case studies for portfolio.</li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Requirements:</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']}`}>
              <li>Basic understanding of digital marketing concepts (SEO, social, ads).</li>
              <li>Interest in mobile app growth & ASO.</li>
              <li>Research skills and analytical mindset.</li>
              <li>Strong written communication & willingness to learn.</li>
              <li>Familiarity with GA4, Firebase, Ads Manager, SensorTower, AppTweak (a plus).</li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Why Join Dev8X?</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
              <li>Structured roadmap-based training → go from foundations to ASO to growth.</li>
              <li>Work on real apps & campaigns → not just theory.</li>
              <li>Mentorship from experienced growth marketers.</li>
              <li>Build a portfolio covering SEO, ASO, Ads, and Growth Marketing.</li>
              <li>Internship certificate, recommendation letter, and a potential path to full-time</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    subTitle: 'OPEN ROLES',
    title: 'UI/UX Designer',
    type: 'Internship',
    salary: 'Unpaid',
    location: 'Remote / Lahore',
    description: (
      <div>
        <div className={`${CaseStudySiderbarStyles['sidebar__intro']}`}>
          <p>Start Your Design Career with Dev8X – Remote UI/UX Internship Opportunity!</p>
        </div>
        <div className={`${CaseStudySiderbarStyles['sidebar__body']}`}>
          <p>Are you passionate about crafting delightful user experiences and elegant user interfaces? Looking to gain hands-on experience in real-world projects that users love?</p>

          <p className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>Dev8X</caption> invites you to be part of an exciting <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>6 month remote UI/UX Designer internship</caption> where you'll grow, build, and innovate alongside a talented team!
          </p>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>What's in it for you?</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
              <li>Work on real client projects with full UI/UX design cycle experience</li>
              <li>Enhance your design portfolio with modern web and mobile UIs</li>
              <li>Learn how to think like a product designer and solve real user problems</li>
              <li>Collaborate closely with developers and leadership in a remote team</li>
            </ul>
          </div>

          <div className={ProjectContentStyles['project-content__block-image']}>
            <div className={ProjectContentStyles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <div
                className="WorkCard_work-card-wrapper__DfwMI"
                style={
                  {
                    '--aspect-x': 1452,
                    '--aspect-y': 890,
                    opacity: 1,
                    transform: 'translateY(0px)'
                  } as React.CSSProperties
                }
              >
                <a className={`${WorkCardStyles['work-card']} ${WorkCardStyles['work-card--landscape']} ${styles['block-image-spacing']}`} href="https://roadmap.sh/r/3-month-uiux-roadmap-for-interns-weekly-focus-ux-basics-ui-tools-wireframes-prototyping-testing-tasks-kpis-format-in-table" target="_blank">
                  <div className={WorkCardStyles['work-card__thumbnail-wrapper']}>
                    <div className={`${WorkCardStyles['work-card__thumbnail-outer']} ${WorkCardStyles['bg--troophunter-light']}`} style={{ height: '200%' }}></div>
                    <div className={`${WorkCardStyles['work-card__thumbnail-inner']} undefined`}>
                      <picture className="Picture_picture__gpFzt WorkCard_work-card__picture__6Naim" style={{ height: '100%' }}>
                        <img src={prefixed('/api/images/placeholder/1080-transparent.png/m/312x178/filters:quality(80)')} loading="lazy" width={312} height={178} alt="AI Workflow Preview" draggable={false} />
                      </picture>
                      <video className={WorkCardStyles['work-card__video']} autoPlay loop playsInline src={prefixed('/videos/work/ai/1080.mp4')}></video>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Internship Details:</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']}`}>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Position:</caption> UI/UX Designer Intern
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Duration:</caption> 6 Months
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Remote / Lahore
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Timings:</caption> 8:00 PM to 2:00 AM (PKT)
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Internship Type:</caption> Unpaid
              </li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Key Responsibilities:</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']}`}>
              <li>Design intuitive and elegant user interfaces for mobile and web</li>
              <li>Create wireframes, mockups, and interactive prototypes in Figma or Adobe XD</li>
              <li>Conduct user research and apply findings to UX design</li>
              <li>Collaborate with developers to ensure accurate design implementation</li>
              <li>Participate in product discussions and suggest UX improvements</li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Requirements:</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']}`}>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Tools:</caption> Figma (must), Adobe XD, Illustrator (bonus)
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Skills:</caption> Design systems, typography, layout, color theory
              </li>
              <li>Good sense of aesthetics and attention to detail</li>
              <li>A portfolio or Dribbble/Behance link showing past design work</li>
              <li>Proactive attitude and willingness to learn</li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Why Join Dev8X?</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
              <li>Design for real products, not just concepts</li>
              <li>Receive 1-on-1 design feedback and mentorship</li>
              <li>Build a job-ready portfolio and gain confidence in real-world UI/UX</li>
              <li>Internship certificate, recommendation letter, and a potential path to full-time</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    subTitle: 'OPEN ROLES',
    title: 'Flutter Developer',
    type: 'Internship',
    salary: 'Unpaid',
    location: 'Remote / Lahore',
    description: (
      <div>
        <div className={`${CaseStudySiderbarStyles['sidebar__intro']}`}>
          <p>Kickstart Your Career with Dev8X – Remote Flutter Developer Internship Opportunity!</p>
        </div>

        <div className={`${CaseStudySiderbarStyles['sidebar__body']}`}>
          <p>Are you a Flutter enthusiast with a passion for building beautiful, high-performance mobile apps? Looking to take your cross-platform development skills to the next level in a real-world setting?</p>

          <p className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>Dev8X</caption> invites you to be part of an exciting <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>6 month remote Flutter internship</caption> where you'll grow, build, and innovate alongside a talented team!
          </p>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>What's in it for you?</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
              <li>Work on real-world mobile applications using Flutter & Dart</li>
              <li>Strengthen your portfolio and sharpen your coding skills</li>
              <li>Collaborate with a supportive, forward-thinking remote team</li>
            </ul>
          </div>

          {/* Optional Preview Section */}
          <div className={ProjectContentStyles['project-content__block-image']}>
            <div className={ProjectContentStyles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <div
                className="WorkCard_work-card-wrapper__DfwMI"
                style={
                  {
                    '--aspect-x': 1452,
                    '--aspect-y': 890,
                    opacity: 1,
                    transform: 'translateY(0px)'
                  } as React.CSSProperties
                }
              >
                <a className={`${WorkCardStyles['work-card']} ${WorkCardStyles['work-card--landscape']} ${styles['block-image-spacing']}`} href="https://roadmap.sh/flutter" target="_blank">
                  <div className={WorkCardStyles['work-card__thumbnail-wrapper']}>
                    <div className={`${WorkCardStyles['work-card__thumbnail-outer']} ${WorkCardStyles['bg--troophunter-light']}`} style={{ height: '200%' }}></div>
                    <div className={`${WorkCardStyles['work-card__thumbnail-inner']} undefined`}>
                      <picture className="Picture_picture__gpFzt WorkCard_work-card__picture__6Naim" style={{ height: '100%' }}>
                        <img src={prefixed('/api/images/placeholder/1080-transparent.png/m/312x178/filters:quality(80)')} loading="lazy" width={312} height={178} alt="Flutter Project Preview" draggable={false} />
                      </picture>
                      <video className={WorkCardStyles['work-card__video']} autoPlay loop playsInline src={prefixed('/videos/work/flutter/1080.mp4')}></video>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Internship Details:</h4>
            <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Position:</caption> Flutter Developer Intern
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Duration:</caption> 6 Months
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Remote / Lahore
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Timings:</caption> 8:00 PM to 2:00 AM (PKT)
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Internship Type:</caption> Unpaid
              </li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Key Responsibilities:</h4>
            <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
              <li>Design, develop, and test cross-platform mobile applications using Flutter</li>
              <li>Optimize app performance and resolve bugs</li>
              <li>Participate in team discussions and contribute innovative solutions</li>
              <li>Stay updated with the latest Flutter & Dart trends and best practices</li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Requirements:</h4>
            <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Tools:</caption> Android Studio, VS Code, Cursor (or any Flutter IDE)
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Skills:</caption> Flutter, Dart, Git
              </li>
              <li>Proactive attitude and genuine passion for mobile development</li>
              <li>Portfolio or GitHub link showing previous Flutter projects</li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Why Join Dev8X?</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
              <li>Work on meaningful, real-world projects</li>
              <li>Receive mentorship and constructive feedback from experienced developers</li>
              <li>Build a standout portfolio to launch your career in tech</li>
              <li>Internship certificate, recommendation letter, and a potential path to full-time</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    subTitle: 'OPEN ROLES',
    title: 'Frontend Developer',
    type: 'Internship',
    salary: 'Unpaid',
    location: 'Remote / Lahore',
    description: (
      <div>
        <div className={`${CaseStudySiderbarStyles['sidebar__intro']}`}>
          <p>Kickstart Your Career with Dev8X – Remote Frontend Developer Internship Opportunity!</p>
        </div>

        <div className={`${CaseStudySiderbarStyles['sidebar__body']}`}>
          <p>Are you passionate about crafting sleek, responsive web interfaces with React and Next.js? Ready to sharpen your skills in a real-world development environment?</p>

          <p className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>Dev8X</caption> invites you to be part of an exciting <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>6 month remote Frontend Development internship</caption> where you'll grow, build, and innovate alongside a talented team!
          </p>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>What's in it for you?</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
              <li>Build and enhance modern web applications using React.js, Next.js, and TailwindCSS</li>
              <li>Strengthen your portfolio with real-world projects</li>
              <li>Collaborate with a skilled, remote-first development team</li>
            </ul>
          </div>

          {/* Optional Preview Section */}
          <div className={ProjectContentStyles['project-content__block-image']}>
            <div className={ProjectContentStyles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <div
                className="WorkCard_work-card-wrapper__DfwMI"
                style={
                  {
                    '--aspect-x': 1452,
                    '--aspect-y': 890,
                    opacity: 1,
                    transform: 'translateY(0px)'
                  } as React.CSSProperties
                }
              >
                <a className={`${WorkCardStyles['work-card']} ${WorkCardStyles['work-card--landscape']} ${styles['block-image-spacing']}`} href="https://roadmap.sh/frontend" target="_blank">
                  <div className={WorkCardStyles['work-card__thumbnail-wrapper']}>
                    <div className={`${WorkCardStyles['work-card__thumbnail-outer']} ${WorkCardStyles['bg--troophunter-light']}`} style={{ height: '200%' }}></div>
                    <div className={`${WorkCardStyles['work-card__thumbnail-inner']} undefined`}>
                      <picture className="Picture_picture__gpFzt WorkCard_work-card__picture__6Naim" style={{ height: '100%' }}>
                        <img src={prefixed('/api/images/placeholder/1080-transparent.png/m/312x178/filters:quality(80)')} loading="lazy" width={312} height={178} alt="Frontend Preview" draggable={false} />
                      </picture>
                      <video className={WorkCardStyles['work-card__video']} autoPlay loop playsInline src={prefixed('/videos/work/frontend/1080.mp4')}></video>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Internship Details:</h4>
            <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Position:</caption> Web Frontend Developer Intern
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Duration:</caption> 6 Months
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Remote / Lahore
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Timings:</caption> 8:00 PM to 2:00 AM (PKT)
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Internship Type:</caption> Unpaid
              </li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Key Responsibilities:</h4>
            <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
              <li>Develop responsive UI components with React.js and Next.js</li>
              <li>Style web applications using TailwindCSS</li>
              <li>Work closely with backend developers and designers to implement new features</li>
              <li>Fix UI/UX bugs and optimize frontend performance</li>
              <li>Stay updated on the latest frontend trends and tools</li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Requirements:</h4>
            <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Tools:</caption> VS Code, GitHub, Figma (for collaboration)
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Skills:</caption> React.js, Next.js, TailwindCSS, Git
              </li>
              <li>Familiarity with component-based design and modern web standards</li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Soft Skills:</caption> Self-driven, detail-oriented, and eager to learn
              </li>
              <li>Portfolio or GitHub projects showcasing your frontend work (preferred)</li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Why Join Dev8X?</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
              <li>Contribute to impactful, user-facing web applications</li>
              <li>Receive hands-on mentorship from experienced frontend engineers</li>
              <li>Build a standout portfolio for your future in web development</li>
              <li>Internship certificate, recommendation letter, and a potential path to full-time</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    subTitle: 'OPEN ROLES',
    title: 'Backend Developer',
    type: 'Internship',
    salary: 'Unpaid',
    location: 'Remote / Lahore',
    description: (
      <div>
        <div className={`${CaseStudySiderbarStyles['sidebar__intro']}`}>
          <p>Kickstart Your Career with Dev8X – Remote Backend Developer Internship Opportunity!</p>
        </div>

        <div className={`${CaseStudySiderbarStyles['sidebar__body']}`}>
          <p>Are you passionate about building robust and scalable backend systems using Node.js and PostgreSQL? Ready to dive deep into real-world backend development with modern ORMs like Sequelize and Prisma?</p>

          <p className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>Dev8X</caption> invites you to be part of an exciting <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>6 month remote Backend Development internship</caption> where you'll grow, build, and innovate alongside a talented team!
          </p>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>What's in it for you?</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
              <li>Work on real-world web applications using Node.js, PostgreSQL, and modern ORMs</li>
              <li>Enhance your coding skills and contribute to meaningful backend systems</li>
              <li>Collaborate with a passionate, fast-paced remote team</li>
            </ul>
          </div>
          <div className={ProjectContentStyles['project-content__block-image']}>
            <div className={ProjectContentStyles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <div
                className="WorkCard_work-card-wrapper__DfwMI"
                style={
                  {
                    '--aspect-x': 1452,
                    '--aspect-y': 890,
                    opacity: 1,
                    transform: 'translateY(0px)'
                  } as React.CSSProperties
                }
              >
                <a className={`${WorkCardStyles['work-card']} ${WorkCardStyles['work-card--landscape']} ${styles['block-image-spacing']}`} href="https://roadmap.sh/backend" target="_blank">
                  <div className={WorkCardStyles['work-card__thumbnail-wrapper']}>
                    <div className={`${WorkCardStyles['work-card__thumbnail-outer']} ${WorkCardStyles['bg--troophunter-light']}`} style={{ height: '200%' }}></div>
                    <div className={`${WorkCardStyles['work-card__thumbnail-inner']} undefined`}>
                      <picture className="Picture_picture__gpFzt WorkCard_work-card__picture__6Naim" style={{ height: '100%' }}>
                        <img src={prefixed('/api/images/placeholder/1080-transparent.png/m/312x178/filters:quality(80)')} loading="lazy" width={312} height={178} alt="AI Workflow Preview" draggable={false} />
                      </picture>
                      <video className={WorkCardStyles['work-card__video']} autoPlay loop playsInline src={prefixed('/videos/work/ai/1080.mp4')}></video>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Internship Details:</h4>
            <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Position:</caption> Web Backend Developer Intern
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Duration:</caption> 6 Months
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Remote / Lahore
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Timings:</caption> 8:00 PM to 2:00 AM (PKT)
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Internship Type:</caption> Unpaid
              </li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Key Responsibilities:</h4>
            <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
              <li>Design and develop RESTful APIs and backend services using Node.js</li>
              <li>Model and manage relational data in PostgreSQL using Sequelize or Prisma</li>
              <li>Fix bugs, optimize database performance, and write clean, maintainable code</li>
              <li>Collaborate in code reviews, planning discussions, and sprints</li>
              <li>Stay updated with best practices in backend architecture and database design</li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Requirements:</h4>
            <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Open to remote applicants
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Skills:</caption> Proficient in Node.js, PostgreSQL, and Git
              </li>
              <li>Experience with at least one ORM (Sequelize or Prisma)</li>
              <li>Familiarity with Express.js and backend development tools</li>
              <li>A passion for clean code, learning, and solving real-world problems</li>
              <li>Portfolio or GitHub showcasing backend work (preferred)</li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Why Join Dev8X?</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
              <li>Work on impactful backend systems used by real users</li>
              <li>Gain mentorship from skilled engineers and receive practical feedback</li>
              <li>Build a strong backend portfolio that gets attention in the tech industry</li>
              <li>Internship certificate, recommendation letter, and a potential path to full-time</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    subTitle: 'OPEN ROLES',
    title: 'Business Development',
    type: 'Internship',
    salary: 'Unpaid',
    location: 'Remote / Lahore',
    description: (
      <div>
        <div className={`${CaseStudySiderbarStyles['sidebar__intro']}`}>
          <p>Launch Your Career in Tech Sales with Dev8X – Remote Business Development Internship Opportunity!</p>
        </div>

        <div className={`${CaseStudySiderbarStyles['sidebar__body']}`}>
          <p>Are you a persuasive communicator with a passion for connecting with people and growing businesses? Looking to gain hands-on experience in client acquisition, outreach, and tech sales?</p>

          <p className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>Dev8X</caption> invites you to be part of an exciting <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>6-month remote Business Development internship</caption> where you'll grow, build, and innovate alongside a talented team!
          </p>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>What's in it for you?</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
              <li>Get real-world experience in B2B tech sales and lead generation</li>
              <li>Learn how to pitch, negotiate, and close deals</li>
              <li>Build a solid portfolio of sales strategies and client engagement work</li>
              <li>Collaborate with a growth-driven and supportive remote team</li>
            </ul>
          </div>
          <div className={ProjectContentStyles['project-content__block-image']}>
            <div className={ProjectContentStyles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <div
                className="WorkCard_work-card-wrapper__DfwMI"
                style={
                  {
                    '--aspect-x': 1452,
                    '--aspect-y': 890,
                    opacity: 1,
                    transform: 'translateY(0px)'
                  } as React.CSSProperties
                }
              >
                <a className={`${WorkCardStyles['work-card']} ${WorkCardStyles['work-card--landscape']} ${styles['block-image-spacing']}`} href="https://roadmap.sh/r/3-month-bd-roadmap-for-interns-weekly-skills-sales-crm-outreach-research-client-comms-tasks-kpis-format-in-bullettable" target="_blank">
                  <div className={WorkCardStyles['work-card__thumbnail-wrapper']}>
                    <div className={`${WorkCardStyles['work-card__thumbnail-outer']} ${WorkCardStyles['bg--troophunter-light']}`} style={{ height: '200%' }}></div>
                    <div className={`${WorkCardStyles['work-card__thumbnail-inner']} undefined`}>
                      <picture className="Picture_picture__gpFzt WorkCard_work-card__picture__6Naim" style={{ height: '100%' }}>
                        <img src={prefixed('/api/images/placeholder/1080-transparent.png/m/312x178/filters:quality(80)')} loading="lazy" width={312} height={178} alt="AI Workflow Preview" draggable={false} />
                      </picture>
                      <video className={WorkCardStyles['work-card__video']} autoPlay loop playsInline src={prefixed('/videos/work/ai/1080.mp4')}></video>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Internship Details:</h4>
            <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Position:</caption> Business Development Intern
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Duration:</caption> 6 Months
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Remote / Lahore
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Timings:</caption> 8:00 PM to 2:00 AM (PKT)
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Internship Type:</caption> Unpaid
              </li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Key Responsibilities:</h4>
            <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
              <li>Identify, research, and qualify potential leads</li>
              <li>Write and send winning proposals on Upwork</li>
              <li>Connect with decision-makers on LinkedIn and build lasting relationships</li>
              <li>Launch and manage cold email campaigns using tools like Mailshake or Instantly</li>
              <li>Conduct cold calls and introductory meetings with potential clients</li>
              <li>Maintain CRM data, track responses, and report weekly performance</li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Requirements:</h4>
            <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Open to remote applicants (preferably Pakistan-based)
              </li>
              <li>
                <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Skills:</caption> Excellent written and verbal English communication
              </li>
              <li>Confident in making cold calls and presenting over video meetings</li>
              <li>Familiar with Upwork, LinkedIn, or other B2B platforms</li>
              <li>Knowledge of CRM tools, email outreach platforms, or lead-gen tools is a bonus</li>
              <li>Eagerness to learn and a results-driven mindset</li>
            </ul>
          </div>

          <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
            <h4 className={`${styles['mb-0']}`}>Why Join Dev8X?</h4>
            <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
              <li>Work on real client acquisition projects from Day 1</li>
              <li>Receive 1-on-1 mentorship from seasoned business developers</li>
              <li>Learn end-to-end sales workflows in the IT services space</li>
              <li>Build a portfolio that makes you stand out in tech business roles</li>
              <li>Internship certificate, recommendation letter, and a potential path to full-time</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },


  // {
  //   subTitle: 'OPEN ROLES',
  //   title: 'LinkedIn Lead Generation',
  //   type: 'Internship',
  //   salary: 'Unpaid',
  //   location: 'Remote / Lahore',
  //   description: (
  //     <div>
  //       <div className={`${CaseStudySiderbarStyles['sidebar__intro']}`}>
  //         <p>Kickstart your career in B2B Networking and Client Acquisition with Dev8X – Remote LinkedIn Lead Generation Internship!</p>
  //       </div>

  //       <div className={`${CaseStudySiderbarStyles['sidebar__body']}`}>
  //         <p>Are you passionate about building professional connections and identifying new business opportunities? This internship is your chance to gain real-world experience in LinkedIn-based lead generation and contribute directly to our growth journey?</p>

  //         <p className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>Dev8X</caption> invites you to be part of an exciting <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>6-month remote LinkedIn Lead Generation internship</caption> where you'll work directly with the sales and marketing team to identify, connect, and qualify potential clients on LinkedIn while driving new business opportunities.
  //         </p>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>What's in it for you?</h4>
  //           <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
  //             <li>Practical training in LinkedIn Sales Navigator and lead generation strategies</li>
  //             <li>Learn how to craft personalized outreach and connect with decision-makers </li>
  //             <li>Build your professional network in the global tech and business community</li>
  //             <li>Exposure to real B2B sales workflows and CRM tools</li>
  //             <li>Internship certificate and recommendation letter upon successful completion</li>
  //           </ul>
  //         </div>
  //         <div className={ProjectContentStyles['project-content__block-image']}>
  //           <div className={ProjectContentStyles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
  //             <div
  //               className="WorkCard_work-card-wrapper__DfwMI"
  //               style={
  //                 {
  //                   '--aspect-x': 1452,
  //                   '--aspect-y': 890,
  //                   opacity: 1,
  //                   transform: 'translateY(0px)'
  //                 } as React.CSSProperties
  //               }
  //             >
  //               <a className={`${WorkCardStyles['work-card']} ${WorkCardStyles['work-card--landscape']} ${styles['block-image-spacing']}`} href="/" target="_blank">
  //                 <div className={WorkCardStyles['work-card__thumbnail-wrapper']}>
  //                   <div className={`${WorkCardStyles['work-card__thumbnail-outer']} ${WorkCardStyles['bg--troophunter-light']}`} style={{ height: '200%' }}></div>
  //                   <div className={`${WorkCardStyles['work-card__thumbnail-inner']} undefined`}>
  //                     <picture className="Picture_picture__gpFzt WorkCard_work-card__picture__6Naim" style={{ height: '100%' }}>
  //                       <img src={prefixed('/api/images/placeholder/1080-transparent.png/m/312x178/filters:quality(80)')} loading="lazy" width={312} height={178} alt="AI Workflow Preview" draggable={false} />
  //                     </picture>
  //                     <video className={WorkCardStyles['work-card__video']} autoPlay loop playsInline src={prefixed('/videos/work/ai/1080.mp4')}></video>
  //                   </div>
  //                 </div>
  //               </a>
  //             </div>
  //           </div>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Internship Details:</h4>
  //           <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Position:</caption> LinkedIn Lead Generation Intern
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Duration:</caption> 6 Months
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Remote / Lahore
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Timings:</caption> 8:00 PM to 2:00 AM (PKT)
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Internship Type:</caption> Unpaid
  //             </li>
  //           </ul>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Key Responsibilities:</h4>
  //           <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
  //             <li>Use LinkedIn to identify and connect with potential leads in target industries</li>
  //             <li>Conduct market research to expand the pool of prospective clients</li>
  //             <li>Craft and send personalized outreach messages and connection requests</li>
  //             <li>Qualify leads by assessing their needs, interests, and decision-making processes</li>
  //             <li>Maintain and update a database of LinkedIn connections and leads</li>
  //             <li>Assist in LinkedIn content creation and engagement strategies</li>
  //             <li>Collaborate with sales and marketing teams to align lead generation efforts with company goals </li>
  //             <li>Provide regular reports and updates on lead generation activities and outcomes</li>
  //           </ul>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Requirements:</h4>
  //           <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Open to remote applicants (preferably Pakistan-based)
  //             </li>
  //             <li>
  //               Currently pursuing or recently completed a degree in Marketing, Business Administration, or a related field
  //             </li>
  //             <li>Familiarity with LinkedIn and its features, including Sales Navigator</li>
  //             <li>Strong research and analytical skills</li>
  //             <li>Proficiency in Microsoft Office Suite (Excel, Word, PowerPoint) and Google Workspace</li>
  //             <li>Excellent written and verbal communication skills</li>
  //             <li>Ability to work independently and manage time effectively</li>
  //             <li>High level of attention to detail and organization</li>
  //           </ul>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Why Join Dev8X?</h4>
  //           <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
  //             <li>Hands-on experience with international business development projects</li>
  //             <li>Learn modern lead generation strategies used by global sales teams</li>
  //             <li>Receive direct mentorship from industry professionals</li>
  //             <li>Build a portfolio that will strengthen your career in B2B sales and marketing</li>
  //             <li>Internship certificate, recommendation letter, and a potential path to full-time</li>
  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // },
  // {
  //   subTitle: 'OPEN ROLES',
  //   title: ' Upwork Bidder',
  //   type: 'Internship',
  //   salary: 'Unpaid',
  //   location: 'Remote / Lahore',
  //   description: (
  //     <div>
  //       <div className={`${CaseStudySiderbarStyles['sidebar__intro']}`}>
  //         <p>Kickstart Your Freelancing & Business Development Career with Dev8X – Remote Upwork Bidder Internship Opportunity!</p>
  //       </div>

  //       <div className={`${CaseStudySiderbarStyles['sidebar__body']}`}>
  //         <p>Are you someone who loves exploring freelancing platforms, spotting new opportunities, and building client relationships? Looking to gain real-world experience in proposals, bidding, and client acquisition?</p>

  //         <p className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>Dev8X</caption> invites you to be part of an exciting <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>6-month remote  Upwork Bidder internship</caption>where you’ll collaborate with our leadership team to explore new growth opportunities across platforms such as Upwork, LinkedIn, Email, and Cold Calling.
  //         </p>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>What's in it for you?</h4>
  //           <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
  //             <li>Hands-on training in Upwork bidding & proposal writing</li>
  //             <li>Learn how to research, pitch, and negotiate with clients globally</li>
  //             <li>Gain real experience in sales, lead generation, and CRM usage</li>
  //             <li>Work in a growth-driven, supportive, and international team environment</li>
  //             <li>Collaborate with a growth-driven and supportive remote team</li>
  //           </ul>
  //         </div>
  //         <div className={ProjectContentStyles['project-content__block-image']}>
  //           <div className={ProjectContentStyles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
  //             <div
  //               className="WorkCard_work-card-wrapper__DfwMI"
  //               style={
  //                 {
  //                   '--aspect-x': 1452,
  //                   '--aspect-y': 890,
  //                   opacity: 1,
  //                   transform: 'translateY(0px)'
  //                 } as React.CSSProperties
  //               }
  //             >
  //               <a className={`${WorkCardStyles['work-card']} ${WorkCardStyles['work-card--landscape']} ${styles['block-image-spacing']}`} href="/" target="_blank">
  //                 <div className={WorkCardStyles['work-card__thumbnail-wrapper']}>
  //                   <div className={`${WorkCardStyles['work-card__thumbnail-outer']} ${WorkCardStyles['bg--troophunter-light']}`} style={{ height: '200%' }}></div>
  //                   <div className={`${WorkCardStyles['work-card__thumbnail-inner']} undefined`}>
  //                     <picture className="Picture_picture__gpFzt WorkCard_work-card__picture__6Naim" style={{ height: '100%' }}>
  //                       <img src={prefixed('/api/images/placeholder/1080-transparent.png/m/312x178/filters:quality(80)')} loading="lazy" width={312} height={178} alt="AI Workflow Preview" draggable={false} />
  //                     </picture>
  //                     <video className={WorkCardStyles['work-card__video']} autoPlay loop playsInline src={prefixed('/videos/work/ai/1080.mp4')}></video>
  //                   </div>
  //                 </div>
  //               </a>
  //             </div>
  //           </div>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Internship Details:</h4>
  //           <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Position:</caption> Upwork Bidder Intern
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Duration:</caption> 6 Months
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Remote / Lahore
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Timings:</caption> 8:00 PM to 2:00 AM (PKT)
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Internship Type:</caption> Unpaid
  //             </li>
  //           </ul>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Key Responsibilities:</h4>
  //           <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
  //             <li>Research and analyze trends, competitor activity, and business opportunities on Upwork</li>
  //             <li>Confident in making cold calls and presenting over video meetings</li>
  //             <li>Stay updated on Upwork policies, pricing structures, and best practices</li>
  //             <li>Proactively identify and engage with potential clients on Upwork</li>
  //             <li>Develop and maintain a robust pipeline of Upwork projects</li>
  //             <li>Coordinate with the sales team for reporting and strategy building</li>
  //             <li>Negotiate contract terms with clients and communicate with stakeholders</li>
  //             <li>Update and manage CRM on a daily basis</li>
  //             <li>Prepare presentations and introduce Dev8X services to clients</li>
  //             <li>Track, identify, and add qualified prospects to sales pipeline</li>
  //             <li>Conduct regular cold calling and outreach activities</li>
  //             <li>Support the end-to-end sales process with business operations</li>
  //           </ul>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Requirements:</h4>
  //           <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Open to remote applicants (preferably Pakistan-based)
  //             </li>
  //             <li>Students / Fresh Graduates in Business, Marketing, IT, or related fields</li>
  //             <li>Excellent English communication skills (written & spoken)</li>
  //             <li>Familiarity with freelancing platforms (Upwork, Fiverr, LinkedIn) is a plus</li>
  //             <li>Confident, organized, and eager to grow in tech sales & client acquisition</li>
  //             <li>Comfortable with cold calls and direct client communication</li>
  //           </ul>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Why Join Dev8X?</h4>
  //           <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
  //             <li>Learn real Upwork bidding strategies and client acquisition workflows</li>
  //             <li>Direct exposure to international clients and IT service sales</li>
  //             <li>One-on-one mentorship from experienced professionals</li>
  //             <li>Build a portfolio that makes you stand out in freelancing & business roles</li>
  //             <li>Internship certificate, recommendation letter, and a potential path to full-time</li>
  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // },
  // {
  //   subTitle: 'OPEN ROLES',
  //   title: 'App Store Optimization (ASO)',
  //   type: 'Internship',
  //   salary: 'Unpaid',
  //   location: 'Remote / Lahore',
  //   description: (
  //     <div>
  //       <div className={`${CaseStudySiderbarStyles['sidebar__intro']}`}>
  //         <p>Kickstart Your Career with Dev8X – Remote ASO Specialist Internship Opportunity!</p>
  //       </div>
  //       <div className={`${CaseStudySiderbarStyles['sidebar__body']}`}>
  //         <p> Are you passionate about mobile apps, curious about how apps grow on the App Store & Google Play, and eager to learn real ASO strategies? Looking to gain hands-on experience in keyword research, competitor analysis, and app growth?</p>

  //         <p className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>Dev8X</caption> invites you to be part of an exciting <caption className={`${styles['inline-block']} ${styles['pb-0']}`}> 6-month remote ASO internship</caption> where you’ll learn how to boost app visibility, drive downloads, and contribute to real-world growth projects!
  //         </p>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>What's in it for you?</h4>
  //           <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
  //             <li>Work on real-world ASO projects with live apps on iOS & Android.</li>
  //             <li>Learn how to use top ASO tools (SensorTower, AppTweak, AppMagic, KeywordTool.io).</li>
  //             <li>Gain hands-on experience in keyword strategy, metadata optimization, and creative asset design.</li>
  //             <li>Build a strong ASO portfolio that makes you stand out in the mobile growth industry.</li>
  //             <li>Collaborate with a supportive, forward-thinking remote team.</li>
  //           </ul>
  //         </div>

  //         <div className={ProjectContentStyles['project-content__block-image']}>
  //           <div className={ProjectContentStyles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
  //             <div
  //               className="WorkCard_work-card-wrapper__DfwMI"
  //               style={
  //                 {
  //                   '--aspect-x': 1452,
  //                   '--aspect-y': 890,
  //                   opacity: 1,
  //                   transform: 'translateY(0px)'
  //                 } as React.CSSProperties
  //               }
  //             >
  //               <a className={`${WorkCardStyles['work-card']} ${WorkCardStyles['work-card--landscape']} ${styles['block-image-spacing']}`} href="/" target="_blank">
  //                 <div className={WorkCardStyles['work-card__thumbnail-wrapper']}>
  //                   <div className={`${WorkCardStyles['work-card__thumbnail-outer']} ${WorkCardStyles['bg--troophunter-light']}`} style={{ height: '200%' }}></div>
  //                   <div className={`${WorkCardStyles['work-card__thumbnail-inner']} undefined`}>
  //                     <picture className="Picture_picture__gpFzt WorkCard_work-card__picture__6Naim" style={{ height: '100%' }}>
  //                       <img src={prefixed('/api/images/placeholder/1080-transparent.png/m/312x178/filters:quality(80)')} loading="lazy" width={312} height={178} alt="AI Workflow Preview" draggable={false} />
  //                     </picture>
  //                     <video className={WorkCardStyles['work-card__video']} autoPlay loop playsInline src={prefixed('/videos/work/ai/1080.mp4')}></video>
  //                   </div>
  //                 </div>
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Internship Details:</h4>
  //           <ul className={`${CaseStudySiderbarStyles['custom-icon-list']}`}>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Position:</caption> ASO Specialist Intern
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Duration:</caption> 6 Months
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Remote / Lahore
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Timings:</caption> 8:00 PM to 2:00 AM (PKT)
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Internship Type:</caption> Unpaid
  //             </li>
  //           </ul>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Key Responsibilities:</h4>
  //           <ul className={`${CaseStudySiderbarStyles['custom-icon-list']}`}>
  //             <li>Conduct market & competitor analysis to find trending niches and opportunities.
  //             </li>
  //             <li>Perform keyword research & strategy using ASO tools.
  //             </li>
  //             <li>Draft metadata (titles, descriptions, subtitles) for iOS & Android apps.</li>
  //             <li>Assist in creating creative assets (icons, screenshots, feature graphics).
  //             </li>
  //             <li>Monitor reviews & ratings, track sentiment, and escalate feedback.
  //             </li>
  //             <li>Analyze user engagement & retention metrics.
  //             </li>
  //             <li>Support A/B testing experiments for app creatives & metadata.</li>
  //           </ul>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Requirements:</h4>
  //           <ul className={`${CaseStudySiderbarStyles['custom-icon-list']}`}>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Open to remote applicants
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Tools:</caption> SensorTower, AppTweak, AppMagic
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Skills:</caption> Basic understanding of mobile apps, strong research skills, and good written communication.
  //             </li>
  //             <li>Interest in mobile growth, marketing, or analytics.</li>
  //             <li>A proactive attitude and genuine curiosity for app marketing & ASO.</li>
  //           </ul>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Why Join Dev8X?</h4>
  //           <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
  //             <li>Work on meaningful ASO projects with real impact.
  //             </li>
  //             <li>Receive mentorship from experienced ASO specialists.
  //             </li>
  //             <li>Learn how to rank apps, optimize conversions, and manage app store presence.
  //             </li>
  //             <li>Internship certificate, recommendation letter, and a potential path to full-time.
  //             </li>
  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // },

  // {
  //   subTitle: 'OPEN ROLES',
  //   title: 'Graphic Designer',
  //   type: 'Internship',
  //   salary: 'Unpaid',
  //   location: 'Remote / Lahore',
  //   description: (
  //     <div>
  //       <div className={`${CaseStudySiderbarStyles['sidebar__intro']}`}>
  //         <p>Start Your Design Career with Dev8X – Remote Graphic Designer Internship Opportunity!</p>
  //       </div>
  //       <div className={`${CaseStudySiderbarStyles['sidebar__body']}`}>
  //         <p>Are you passionate about crafting delightful user experiences and elegant user interfaces? Looking to gain hands-on experience in real-world projects that users love?</p>

  //         <p className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>Dev8X</caption> invites you to be part of an exciting <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>6 month remote Graphic Designer internship</caption> where you'll grow, build, and innovate alongside a talented team!
  //         </p>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>What's in it for you?</h4>
  //           <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
  //             <li>Work on real client projects with full Graphic design cycle experience</li>
  //             <li>Enhance your portfolio with professional digital & print designs</li>
  //             <li>Learn how to design social media campaigns & posts for LinkedIn, Instagram, etc.</li>
  //             <li>Collaborate closely with developers and leadership in a remote team</li>
  //           </ul>
  //         </div>

  //         <div className={ProjectContentStyles['project-content__block-image']}>
  //           <div className={ProjectContentStyles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
  //             <div
  //               className="WorkCard_work-card-wrapper__DfwMI"
  //               style={
  //                 {
  //                   '--aspect-x': 1452,
  //                   '--aspect-y': 890,
  //                   opacity: 1,
  //                   transform: 'translateY(0px)'
  //                 } as React.CSSProperties
  //               }
  //             >
  //               <a className={`${WorkCardStyles['work-card']} ${WorkCardStyles['work-card--landscape']} ${styles['block-image-spacing']}`} href="https://roadmap.sh/r/graphic-designer-internship-roadmap--6-months" target="_blank">
  //                 <div className={WorkCardStyles['work-card__thumbnail-wrapper']}>
  //                   <div className={`${WorkCardStyles['work-card__thumbnail-outer']} ${WorkCardStyles['bg--troophunter-light']}`} style={{ height: '200%' }}></div>
  //                   <div className={`${WorkCardStyles['work-card__thumbnail-inner']} undefined`}>
  //                     <picture className="Picture_picture__gpFzt WorkCard_work-card__picture__6Naim" style={{ height: '100%' }}>
  //                       <img src={prefixed('/api/images/placeholder/1080-transparent.png/m/312x178/filters:quality(80)')} loading="lazy" width={312} height={178} alt="AI Workflow Preview" draggable={false} />
  //                     </picture>
  //                     <video className={WorkCardStyles['work-card__video']} autoPlay loop playsInline src={prefixed('/videos/work/ai/1080.mp4')}></video>
  //                   </div>
  //                 </div>
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Internship Details:</h4>
  //           <ul className={`${CaseStudySiderbarStyles['custom-icon-list']}`}>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Position:</caption> Graphic Designer Intern
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Duration:</caption> 6 Months
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Remote / Lahore
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Timings:</caption> 8:00 PM to 2:00 AM (PKT)
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Internship Type:</caption> Unpaid
  //             </li>
  //           </ul>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Key Responsibilities:</h4>
  //           <ul className={`${CaseStudySiderbarStyles['custom-icon-list']}`}>
  //             <li>Design visual assets for social media (LinkedIn posts, carousels, Instagram stories, banners, ads)</li>
  //             <li>Create branding materials like logos, icons, style guides, and pitch decks</li>
  //             <li>Develop marketing content such as brochures, infographics, and presentations</li>
  //             <li>Ensure brand consistency across all visual designs</li>
  //             <li>Collaborate with content writers and marketers for campaign creatives</li>
  //           </ul>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Requirements:</h4>
  //           <ul className={`${CaseStudySiderbarStyles['custom-icon-list']}`}>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Tools:</caption> Canva (must), Adobe Photoshop (basic), Illustrator (basic), Figma (bonus)
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Skills:</caption> Basic logo design, branding, social media post design , color theory, typography, content writing etc.
  //             </li>
  //             <li>Good sense of aesthetics and attention to detail</li>
  //             <li>A portfolio or Dribbble/Behance link showing past design work</li>
  //             <li>Proactive attitude and willingness to learn</li>
  //           </ul>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Why Join Dev8X?</h4>
  //           <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
  //             <li>Design for real products, not just concepts</li>
  //             <li>Receive 1-on-1 design feedback and mentorship</li>
  //             <li>Build a job-ready portfolio and gain confidence in real-world Graphic Designer</li>
  //             <li>Internship certificate, recommendation letter, and a potential path to full-time</li>
  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // },
  // {
  //   subTitle: 'OPEN ROLES',
  //   title: 'AI Engineer',
  //   type: 'Internship',
  //   salary: 'Unpaid',
  //   location: 'Remote / Lahore',
  //   description: (
  //     <div>
  //       <div className={`${CaseStudySiderbarStyles['sidebar__intro']}`}>
  //         <p>Kickstart Your Career with Dev8X – Remote AI Engineer Internship Opportunity!</p>
  //       </div>

  //       <div className={`${CaseStudySiderbarStyles['sidebar__body']}`}>
  //         <p>Are you passionate about AI, automation, and building intelligent agents that solve real-world problems? Looking to get hands-on experience with cutting-edge tools like OpenAI and n8n?</p>

  //         <p className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>Dev8X</caption> invites you to be part of an exciting <caption className={`${styles['inline-block']} ${styles['pb-0']}`}>6 month remote AI Engineer internship</caption> where you'll grow, build, and innovate alongside a talented team!
  //         </p>

  //         {/* Optional Preview Section */}

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>What's in it for you?</h4>
  //           <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
  //             <li>Build AI agents for customer support and business automation</li>
  //             <li>Work with real-world tools like n8n, OpenAI, and LangChain</li>
  //             <li>Enhance your portfolio with impactful AI automation projects</li>
  //             <li>Collaborate with a supportive, remote-first engineering team</li>
  //           </ul>
  //         </div>
  //         <div className={ProjectContentStyles['project-content__block-image']}>
  //           <div className={ProjectContentStyles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
  //             <div
  //               className="WorkCard_work-card-wrapper__DfwMI"
  //               style={
  //                 {
  //                   '--aspect-x': 1452,
  //                   '--aspect-y': 890,
  //                   opacity: 1,
  //                   transform: 'translateY(0px)'
  //                 } as React.CSSProperties
  //               }
  //             >
  //               <a className={`${WorkCardStyles['work-card']} ${WorkCardStyles['work-card--landscape']} ${styles['block-image-spacing']}`} href="https://roadmap.sh/ai-engineer" target="_blank">
  //                 <div className={WorkCardStyles['work-card__thumbnail-wrapper']}>
  //                   <div className={`${WorkCardStyles['work-card__thumbnail-outer']} ${WorkCardStyles['bg--troophunter-light']}`} style={{ height: '200%' }}></div>
  //                   <div className={`${WorkCardStyles['work-card__thumbnail-inner']} undefined`}>
  //                     <picture className="Picture_picture__gpFzt WorkCard_work-card__picture__6Naim" style={{ height: '100%' }}>
  //                       <img src={prefixed('/api/images/placeholder/1080-transparent.png/m/312x178/filters:quality(80)')} loading="lazy" width={312} height={178} alt="AI Workflow Preview" draggable={false} />
  //                     </picture>
  //                     <video className={WorkCardStyles['work-card__video']} autoPlay loop playsInline src={prefixed('/videos/work/ai/1080.mp4')}></video>
  //                   </div>
  //                 </div>
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Internship Details:</h4>
  //           <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Position:</caption> AI Engineer Intern
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Duration:</caption> 6 Months
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Remote / Lahore
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Timings:</caption> 8:00 PM to 2:00 AM (PKT)
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Internship Type:</caption> Unpaid
  //             </li>
  //           </ul>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Key Responsibilities:</h4>
  //           <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
  //             <li>Design and implement AI agents to handle customer queries and internal workflows</li>
  //             <li>Integrate APIs such as OpenAI, LinkedIn, and SMTP for personalized communication</li>
  //             <li>Build automation pipelines using n8n and custom scripting (Node.js or Python)</li>
  //             <li>Develop systems to send messages to job applicants and post content on LinkedIn</li>
  //             <li>Maintain and optimize workflows with error handling and logging</li>
  //           </ul>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Requirements:</h4>
  //           <ul className={CaseStudySiderbarStyles['custom-icon-list']}>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Location:</caption> Open to remote applicants
  //             </li>
  //             <li>
  //               <caption className={`${styles['flex']} ${styles['align-items-end']} ${styles['pb-0']}`}>Skills:</caption> Familiarity with APIs, automation platforms, and AI/LLM tools
  //             </li>
  //             <li>Experience with n8n, OpenAI, LangChain, Node.js, or Python</li>
  //             <li>Knowledge of Webhooks, REST APIs, OAuth is a plus</li>
  //             <li>A proactive attitude and strong interest in automation & AI systems</li>
  //           </ul>
  //         </div>

  //         <div className={`${CaseStudySiderbarStyles['sidebar__awards']}`}>
  //           <h4 className={`${styles['mb-0']}`}>Why Join Dev8X?</h4>
  //           <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${styles['mb-0']}`}>
  //             <li>Work on meaningful, production-level automation projects</li>
  //             <li>Learn directly from experienced engineers and AI developers</li>
  //             <li>Build a standout portfolio to launch your AI/Automation career</li>
  //             <li>Internship certificate, recommendation letter, and a potential path to full-time</li>
  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // },
];
