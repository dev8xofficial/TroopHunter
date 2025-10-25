// store/smoothModalAtom.ts
import { atom } from 'jotai';

export type ModalType = 'none' | 'project' | 'contact' | 'career' | 'developers' | 'minisquads' | 'schedulecall';

export interface ModalState {
  type: ModalType;
  data?: any;
}

export const openSmoothModalAtom = atom<ModalState>({ type: 'none' });

export const toggleSmoothModalAtom = atom(null, (get, set, modal: ModalType, data?: any) => {
  const current = get(openSmoothModalAtom);
  if (current.type === modal) {
    set(openSmoothModalAtom, { type: 'none' });
  } else {
    set(openSmoothModalAtom, { type: modal, data });
  }
});

export const closeSmoothModalAtom = atom(null, (get, set) => {
  set(openSmoothModalAtom, { type: 'none' });
});
