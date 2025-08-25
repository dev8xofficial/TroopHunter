// store/smoothModalAtom.ts
import { atom } from 'jotai';

export type ModalType = 'none' | 'project' | 'contact' | 'career';

export const openSmoothModalAtom = atom<ModalType>('none');

export const toggleSmoothModalAtom = atom(null, (get, set, modal: ModalType) => {
  set(openSmoothModalAtom, (current) => (current === modal ? 'none' : modal));
});

export const closeSmoothModalAtom = atom(null, (get, set) => {
  set(openSmoothModalAtom, 'none');
});
