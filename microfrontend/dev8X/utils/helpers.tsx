export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const getDev8xPublicUrl = (): string => {
  return process.env.NEXT_PUBLIC_DEV8X_URL ?? 'https://dev8x.com';
};
