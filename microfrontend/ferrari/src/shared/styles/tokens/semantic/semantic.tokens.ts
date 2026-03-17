import { globalColorTokens } from '../global/color.tokens';
import { globalSpacingTokens } from '../global/spacing.tokens';

export const semanticTokens = {
  // Surfaces / text
  colorBgPrimary: globalColorTokens.white,
  colorSurfacePrimary: globalColorTokens.white,
  colorTextPrimary: globalColorTokens.gray900,
  colorTextMuted: globalColorTokens.gray600,
  colorBorderMuted: globalColorTokens.gray200,

  // Brand / accents
  colorBrandPrimary: globalColorTokens.red600,
  colorFocusRing: globalColorTokens.gray900,
  colorDanger: globalColorTokens.red600,

  // Components: Button (starter set)
  colorBtnPrimaryBg: globalColorTokens.gray900,
  colorBtnPrimaryText: globalColorTokens.white,
  colorBtnSecondaryBg: globalColorTokens.white,
  colorBtnSecondaryText: globalColorTokens.gray900,
  colorBtnSecondaryBorder: globalColorTokens.gray200,
  colorBtnSecondaryHoverBg: globalColorTokens.gray50,
  colorBtnGhostText: globalColorTokens.gray900,
  colorBtnGhostHoverBg: globalColorTokens.gray100,

  // Components: Input (starter set)
  colorInputBg: globalColorTokens.white,
  colorInputBorder: globalColorTokens.gray200,
  colorInputRing: globalColorTokens.gray900,
  colorInputBorderError: globalColorTokens.red600,
  colorInputRingError: globalColorTokens.red600,

  // Components: Card
  shadowCard: '0 1px 2px rgba(0, 0, 0, 0.06)',

  // Layout
  spacingPageGutter: globalSpacingTokens[5]
} as const;

export type SemanticTokenKey = keyof typeof semanticTokens;
