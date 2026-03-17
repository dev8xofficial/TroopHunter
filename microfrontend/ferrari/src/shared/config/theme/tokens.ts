import { semanticTokens, type SemanticTokenKey } from '@/shared/styles/tokens/semantic/semantic.tokens';
import { adminTheme, clientTheme, ferrariTheme } from '@/shared/styles/themes';

export type BrandId = 'ferrari' | 'admin' | 'client';

export type SemanticColorKey = Extract<
  SemanticTokenKey,
  `color${string}`
>;

export type SemanticSpacingKey = Extract<
  SemanticTokenKey,
  `spacing${string}`
>;

export type BrandTokenMap = Record<SemanticTokenKey, string>;

export const BRAND_TOKENS: Record<BrandId, BrandTokenMap> = {
  ferrari: ferrariTheme,
  admin: adminTheme,
  client: clientTheme
};

export const DEFAULT_SEMANTIC_TOKENS = semanticTokens;
