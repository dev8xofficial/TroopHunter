import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';
import { toggleSmoothModalAtom, closeSmoothModalAtom } from '../store/smoothModalAtom';

export const useProjectModal = () => {
  const router = useRouter();
  const [modalSlug, setModalSlug] = useState<string | null>(null);
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const closeModal = useSetAtom(closeSmoothModalAtom);

  // Keep track of previous path to go back on close
  const prevPathRef = useRef<string>(router.asPath);

  useEffect(() => {
    if (router.query.project) {
      setModalSlug(router.query.project as string);
    } else {
      setModalSlug(null);
    }
  }, [router.query.project]);

  const openModal = (slug: string) => {
    setModalSlug(slug);
    prevPathRef.current = router.asPath; // store current URL

    // Determine new path
    let newPath = '';
    if (router.asPath === '/') {
      newPath = `/work/${slug}`;
    } else if (router.asPath === '/work') {
      newPath = `/work/${slug}`;
    } else {
      // fallback in case user is already deep linked
      newPath = `/work/${slug}`;
    }

    router.push(
      {
        pathname: router.pathname,
        query: { project: slug }
      },
      newPath,
      { shallow: true }
    );

    toggleModal('project');
  };

  const closeProjectModal = () => {
    setModalSlug(null);

    // Go back to previous path
    const fallbackPath = prevPathRef.current || '/';
    router.push(
      {
        pathname: router.pathname,
        query: {}
      },
      fallbackPath,
      { shallow: true }
    );

    closeModal();
  };

  return { modalSlug, openModal, closeProjectModal };
};
