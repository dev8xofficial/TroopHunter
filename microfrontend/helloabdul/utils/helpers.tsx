export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const getHelloabdulPublicUrl = (): string => {
  return process.env.NEXT_PUBLIC_HELLOABDUL_URL ?? 'https://helloabdul.com';
};
