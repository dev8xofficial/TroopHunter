import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';
import { toggleSmoothModalAtom } from '../store/smoothModalAtom';

export const useProjectModal = () => {
  const router = useRouter();
  const [modalSlug, setModalSlug] = useState(null);
  const toggleModal = useSetAtom(toggleSmoothModalAtom);

  useEffect(() => {
    if (router.query.project) {
      setModalSlug(router.query.project as string);
    } else {
      setModalSlug(null);
    }
  }, [router.query.project, setModalSlug]);

  const openModal = (slug: string) => {
    setModalSlug(slug);
    router.push(`/work?project=${slug}`, `/work/${slug}`, { shallow: true });
    toggleModal();
  };

  const closeModal = () => {
    setModalSlug(null);
    router.push('/work', undefined, { shallow: true });
    toggleModal();
  };

  return { modalSlug, openModal, closeModal };
};
