export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export const getTroopHunterPublicUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_TROOPHUNTER_PUBLIC_URL ?? 'https://troophunter.com';
  }
  return process.env.NEXT_TROOPHUNTER_PUBLIC_URL ?? 'https://troophunter.com';
};
