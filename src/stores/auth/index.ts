import { create } from "zustand"

import { now } from "@/lib/time"

export type AuthState = {
    updatedAt: number
    jwt: string | undefined
    setJWT: (value: string) => void
}

const useAuthStore = create<AuthState>()((set) => ({
    updatedAt: now(),
    jwt: undefined,
    setJWT(value) {
        set((state) => ({
            ...state,
            updatedAt: now(),
            jwt: value,
        }))
    },
}))

export default useAuthStore
