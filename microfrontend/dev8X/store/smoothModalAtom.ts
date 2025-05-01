import { atom } from 'jotai';

export const isSmoothModalOpenAtom = atom(false);
export const toggleSmoothModalAtom = atom(
  (get) => get(isSmoothModalOpenAtom),
  (get, set) => set(isSmoothModalOpenAtom, !get(isSmoothModalOpenAtom))
);
