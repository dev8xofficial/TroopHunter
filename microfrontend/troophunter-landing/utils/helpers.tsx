export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export const getTroopHunterPublicUrl = (): string => {
  return process.env.NEXT_TROOPHUNTER_PUBLIC_URL ?? 'https://troophunter.com';
};
