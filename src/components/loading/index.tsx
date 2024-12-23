import NProgress from "nprogress"
import { useEffect } from "react"

import useOnStartup from "@/hooks/useOnStartup"
import { useHasSignedIn } from "@/stores/auth/hooks"
import useWebAppStore from "@/stores/webApp"

type PageLoadingProps = {
    children?: React.ReactNode
}

export function FullPageLoading({ children }: PageLoadingProps) {
    const { webApp, isReady } = useWebAppStore()
    const hasSignedIn = useHasSignedIn()

    useOnStartup()

    if (isReady && !!webApp && hasSignedIn) {
        return children
    }

    return (
        <div className="relative w-full min-h-full flex flex-col items-center justify-center text-center bg-black">
            <div className="z-[2] relative w-full flex-none flex flex-col items-center justify-center text-center">
                <span>Icon goes here</span>
                <span className="mt-6 text-[54px] font-semibold tracking-tight leading-none">
                    <span>Logo goes here</span>
                </span>

                <ProgressBar />
            </div>
        </div>
    )
}

const progressClassName = "h-3 bg-[#ace669]"
function ProgressBar() {
    useEffect(() => {
        NProgress.configure({
            easing: "ease",
            speed: 500,
            parent: "#progress-bar",
            template: `<div class="${progressClassName}" role="bar"><div class="peg"></div></div>`,
        })
        NProgress.start()
    }, [])

    return (
        <div
            id="progress-bar"
            className="mt-6 relative flex-none w-[240px] h-3 rounded-full overflow-hidden bg-[#bcbcbc]/30"
        />
    )
}

export function withFullPageLoading(Component: React.ReactNode) {
    return <FullPageLoading>{Component}</FullPageLoading>
}
