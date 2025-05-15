import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';
import { toggleSmoothModalAtom, closeSmoothModalAtom } from '../store/smoothModalAtom';

export const useProjectModal = () => {
  const router = useRouter();
  const [modalSlug, setModalSlug] = useState<string | null>(null);
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const closeModal = useSetAtom(closeSmoothModalAtom);

  useEffect(() => {
    if (router.query.project) {
      setModalSlug(router.query.project as string);
    } else {
      setModalSlug(null);
    }
  }, [router.query.project]);

  const openModal = (slug: string) => {
    setModalSlug(slug);
    router.push(`/work?project=${slug}`, `/work/${slug}`, { shallow: true });
    toggleModal('project');
  };

  const closeProjectModal = () => {
    setModalSlug(null);
    router.push('/work', undefined, { shallow: true });
    closeModal();
  };

  return { modalSlug, openModal, closeProjectModal };
};
