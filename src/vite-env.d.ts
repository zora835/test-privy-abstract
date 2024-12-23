/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare const __BUILD_TIME__: string

interface ImportMetaEnv {
    readonly VITE_APP_URL: string
    readonly VITE_BOT_USERNAME: string
    readonly VITE_BOT_APP_ID: string
    readonly VITE_PRIVY_APP_ID: string
    readonly VITE_PRIVY_CLIENT_ID: string
    // more variables here...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
