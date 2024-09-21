// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_TROOPHUNTER_PUBLIC_URL: string;
  readonly VITE_TROOPHUNTER_APP_URL: string;
  readonly VITE_TROOPHUNTER_AUTH_APP_URL: string;
  readonly VITE_ENCRYPTION_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
