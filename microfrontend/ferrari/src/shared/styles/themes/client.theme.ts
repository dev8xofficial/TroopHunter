import { ferrariTheme } from './ferrari.theme';
import type { SemanticTokenKey } from '../tokens/semantic/semantic.tokens';

export const clientTheme: Record<SemanticTokenKey, string> = {
  ...ferrariTheme
};
