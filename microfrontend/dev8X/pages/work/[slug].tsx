import Head from 'next/head';
import { FooterRevealPageWrap, Footer, Header, ProjectsFormModal, WorkDetail, WORK_PROJECTS } from '@repo/components';
import { getDev8xPublicUrl } from '../../utils/helpers';
import PageData from '../../data/work/index.d';

import LayoutStyles from '../../components/Surfaces/Layout/layout.module.css';

const WorkPage: React.FC<WorkDetail> = ({ slug, ...project }: WorkDetail): JSX.Element => {
  return (
    <>
      <Head>
        <title>{PageData.meta.title.replace('Our Work', project.title)}</title>
        <link rel="canonical" href={`${getDev8xPublicUrl()}/work/${slug}`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={PageData.meta.title.replace('Our Work', project.title)}></meta>
        <meta property="og:url" content={`${getDev8xPublicUrl()}/work/${slug}`}></meta>
        <meta property="og:image" content={`${getDev8xPublicUrl()}/logo-social.png`}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="Dev8X"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={PageData.meta.title.replace('Our Work', project.title)}></meta>
        <meta name="twitter:image" content={`${getDev8xPublicUrl()}/logo-social.png`}></meta>
        <meta name="twitter:site" content="@Dev8X"></meta>
      </Head>
      <FooterRevealPageWrap variant="frame">
        <Header />
        <FooterRevealPageWrap variant="page">
          <style jsx global>{`
            :root {
              --theme-primary: var(--default-primary);
              --theme-primary-text: var(--default-primary-text);
              --theme-secondary: var(--default-secondary);
              --theme-text: var(--default-text);
              --theme-background: var(--default-tertiary);
              --theme-logo: var(--default-secondary);
              --theme-header-face: var(--default-primary);
            }
          `}</style>
          {/* Main container with smooth-scrollbar */}
          <main className={LayoutStyles['work-page']}>
            <ProjectsFormModal {...project} />
          </main>
        </FooterRevealPageWrap>
        <Footer footerMainContent={PageData.footerMainContent} footerForm={PageData.footerForm} footerSocialLinks={PageData.footerSocialLinks} />
      </FooterRevealPageWrap>
    </>
  );
};

export default WorkPage;

export async function getStaticPaths() {
  const paths = WORK_PROJECTS.map((project) => ({
    params: { slug: project.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = WORK_PROJECTS.find((p) => p.slug === params.slug);
  const { slug, title, websiteUrl, industry, shortIntro, overview, approach, impact, keyContributions } = project;

  if (!project) {
    return { notFound: true };
  }

  return {
    props: { slug, title, websiteUrl, industry, shortIntro, overview, approach, impact, keyContributions }
  };
}
