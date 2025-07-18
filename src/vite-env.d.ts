/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TAVUS_API_KEY: string
  readonly VITE_DEMO_USERNAME: string
  readonly VITE_DEMO_PASSWORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
