export const globalTypographyTokens = {
  fontFamilySans: "var(--font-inter), Inter, system-ui, sans-serif",
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  fontWeightBold: 700,

  fontSizeXs: '0.75rem',
  fontSizeSm: '0.875rem',
  fontSizeBase: '1rem',
  fontSizeLg: '1.125rem',
  fontSizeXl: '1.25rem',

  lineHeightTight: 1.1,
  lineHeightNormal: 1.5
} as const;

export type GlobalTypographyToken = keyof typeof globalTypographyTokens;
