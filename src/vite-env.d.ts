/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FARO_ENABLED?: string
  readonly VITE_FARO_URL?: string
  readonly VITE_FARO_APP_NAME?: string
  readonly VITE_FARO_APP_ENV?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare const __APP_VERSION__: string
declare const __GIT_COMMIT_SHA__: string
