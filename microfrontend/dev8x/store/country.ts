import { atom } from 'jotai';

export const countryAtom = atom<string>('PK');

export const countryInitializedAtom = atom<boolean>(false);