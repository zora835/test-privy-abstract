import { create } from "zustand"

import { UserInfo } from "@/types/user"

export type WebAppState = {
    isReady: boolean
    setReady: (value: boolean) => void

    user: UserInfo | undefined
    setUser: (user: UserInfo) => void

    webApp: Pick<WebApp, "initData" | "initDataUnsafe"> | undefined
    setWebApp: (value: Pick<WebApp, "initData" | "initDataUnsafe">) => void
}

const useWebAppStore = create<WebAppState>()((set) => ({
    isReady: false,
    setReady(value) {
        set((state) => ({
            ...state,
            isReady: value,
        }))
    },

    user: undefined,
    setUser(user) {
        set((state) => ({
            ...state,
            user,
        }))
    },

    webApp: undefined,
    setWebApp(value) {
        set((state) => ({
            ...state,
            webApp: value,
        }))
    },
}))

export default useWebAppStore
