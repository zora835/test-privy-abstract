import NProgress from "nprogress"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { sleep } from "@/lib/utils"
import useAuthStore from "@/stores/auth"
import { useHasSignedIn } from "@/stores/auth/hooks"
import useWebAppStore from "@/stores/webApp"

export default function useOnStartup() {
    const { webApp, setWebApp, user, setUser, isReady, setReady } = useWebAppStore()
    const hasSignedIn = useHasSignedIn()
    const navigate = useNavigate()
    const location = useLocation()
    const { pathname, search } = location

    const startappParam = webApp?.initDataUnsafe.start_param

    useEffect(() => {
        /**
         * @description this effect helps decode the startapp param
         */
        if (isReady || !hasSignedIn || !webApp || !user) {
            return
        }

        // Remove hash params
        // We don't use hash params in this app
        // It's only used by TG
        const defaultPathName = pathname + search

        const func = async () => {
            navigate(defaultPathName, {
                replace: true,
            })

            setTimeout(() => {
                NProgress.done()
            }, 500)

            setTimeout(() => {
                setReady(true)
            }, 1_200)
        }

        func()
    }, [hasSignedIn, isReady, navigate, pathname, search, setReady, startappParam, user, webApp])

    useEffect(() => {
        const checkTelegramLoaded = () => {
            if (typeof window !== "undefined" && window.Telegram) {
                const _webApp = window?.Telegram?.WebApp

                /**
                 * @todo add `_webApp?.platform !== "unknown"` in dev environment
                 */
                if (
                    _webApp?.initDataUnsafe &&
                    _webApp?.initData !== "" &&
                    _webApp.initDataUnsafe.user
                ) {
                    setWebApp({
                        initData: _webApp.initData,
                        initDataUnsafe: _webApp.initDataUnsafe,
                    })
                }
            }
        }

        checkTelegramLoaded()
    }, [setUser, setWebApp])

    useEffect(() => {
        const func = async () => {
            if (!webApp || hasSignedIn) {
                return
            }

            try {
                await sleep(1_000)
                const jwtToken = "0x123456789"

                if (!jwtToken) {
                    throw new Error("jwtToken not found")
                }

                setUser({
                    id: String(webApp.initDataUnsafe.user!.id),
                    username: webApp.initDataUnsafe.user!.username!,
                })

                useAuthStore.getState().setJWT(jwtToken)
                return
            } catch (e) {
                console.log({
                    error: e,
                })
            }

            const text = "Login failed. Please close the app and try again."
            navigate(`/error?text=${encodeURIComponent(text)}`)
        }

        func()
    }, [hasSignedIn, navigate, setUser, webApp])
}
