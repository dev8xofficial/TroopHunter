export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getTroopHunterPublicUrl(): string {
  return process.env.NEXT_PUBLIC_TROOPHUNTER_URL ?? '';
}
