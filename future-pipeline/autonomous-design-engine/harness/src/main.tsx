import React from 'react';
import { createRoot } from 'react-dom/client';
import Section from './candidate/Section';

declare global {
  interface Window {
    __ADE_READY_ID__: string | undefined;
  }
}

const ADE_READY_ATTR = 'data-ade-ready';
const ADE_READY_TIMEOUT_MS = 10_000;

/**
 * C0.5: if the candidate declares `data-ade-ready` on any element at all
 * (i.e. it opted into signaling its own async readiness), wait for that
 * attribute's value to become "true" before the ready-nonce is set —
 * bounded so a candidate that sets the attribute but never flips it true
 * (a bug in the generated code) still eventually renders instead of
 * hanging the capture forever. If no element declares the attribute,
 * resolves immediately — synchronous sections are unaffected.
 */
function waitForAdeReadyAttribute(): Promise<void> {
  const hasAttr = () => document.querySelector(`[${ADE_READY_ATTR}]`) !== null;
  const isTrue = () => document.querySelector(`[${ADE_READY_ATTR}="true"]`) !== null;

  if (!hasAttr()) return Promise.resolve();
  if (isTrue()) return Promise.resolve();

  return new Promise(resolve => {
    const timer = setTimeout(() => {
      observer.disconnect();
      resolve();
    }, ADE_READY_TIMEOUT_MS);

    const observer = new MutationObserver(() => {
      if (isTrue()) {
        clearTimeout(timer);
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: [ADE_READY_ATTR] });
  });
}

function App() {
  const params = new URLSearchParams(window.location.search);
  const candidateId = params.get('cid') ?? 'unknown';

  React.useEffect(() => {
    // Wait for fonts + one animation frame, then set the per-candidate nonce.
    // This nonce match guarantees the screenshot is THIS candidate (F-EYE-02).
    //
    // C0.5: async-data components must ALSO signal their own readiness via
    // a `data-ade-ready="true"` attribute on any element — the nonce alone
    // only proves the SHELL mounted, not that async content (a simulated
    // fetch delay, a lazy image swap, etc.) actually settled. If the
    // candidate contains no such attribute at all, this is a no-op (the
    // common synchronous case is never made to wait for a signal it never
    // declares).
    const setup = async () => {
      await document.fonts.ready;
      await waitForAdeReadyAttribute();
      requestAnimationFrame(() => {
        window.__ADE_READY_ID__ = candidateId;
      });
    };
    setup();

    // Clear nonce on unmount so stale renders are never screenshotted
    return () => {
      window.__ADE_READY_ID__ = undefined;
    };
  }, [candidateId]);

  return (
    <React.StrictMode>
      <Section />
    </React.StrictMode>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
