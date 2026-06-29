/**
 * ADE — Agent SDK Provider (dev default)
 *
 * Wraps @anthropic-ai/claude-agent-sdk for Pro credit usage.
 * Must NOT read ANTHROPIC_API_KEY — its presence forces API billing.
 *
 * NOTE: The Agent SDK is an *agentic* framework (tool loop, sessions),
 * not a chat-completions client. This adapter drives it as a single-shot
 * completer. If vision is unavailable on the credit path, route Critic
 * vision to api/local.
 *
 * @module providers/agentSdk
 */

import type { Config } from '../config.js';
import type { ModelProvider, CompletionRequest, CompletionResult } from '../model.js';
import { withRetry } from '../model.js';

export function createAgentSdkProvider(cfg: Config): ModelProvider {
  // NOTE: Actual Agent SDK integration depends on the 0.0 spike result.
  // This is a placeholder that falls back to the API provider until the
  // spike is completed and the adapter proven.

  console.warn(
    '⚠ agent-sdk provider: Agent SDK adapter not yet proven by spike 0.0.\n' +
    '  Falling back to api provider. Run the spike first: npm run spike\n'
  );

  const provider: ModelProvider = {
    id: `agent-sdk:${cfg.modelId}`,

    async complete(req: CompletionRequest): Promise<CompletionResult> {
      return withRetry(async () => {
        // TODO: Replace with actual Agent SDK integration after spike 0.0
        // For now, this is a skeleton that will be filled after we prove
        // the SDK can be driven as a single-shot completer.
        throw new Error(
          'Agent SDK provider not yet implemented. ' +
          'Run the 0.0 spike first, or use ADE_PROVIDER=api with an ANTHROPIC_API_KEY.'
        );
      }, `agent-sdk:${cfg.modelId}`);
    },
  };

  return provider;
}
