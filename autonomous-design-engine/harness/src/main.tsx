import React from 'react';
import { createRoot } from 'react-dom/client';
import Section from './candidate/Section';

declare global {
  interface Window {
    __ADE_READY_ID__: string | undefined;
  }
}

function App() {
  const params = new URLSearchParams(window.location.search);
  const candidateId = params.get('cid') ?? 'unknown';

  React.useEffect(() => {
    // Wait for fonts + one animation frame, then set the per-candidate nonce.
    // This nonce match guarantees the screenshot is THIS candidate (F-EYE-02).
    const setup = async () => {
      await document.fonts.ready;
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
