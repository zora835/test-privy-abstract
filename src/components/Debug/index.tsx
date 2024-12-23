import { CheckIcon, CopyIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const initialURL = window.location.href
const initialParams = initialURL.replace(window.location.origin, "").replace(/^\//, "")

export default function Debug() {
    const [visible, setVisible] = useState(false)

    const currentURL = window.location.href
    const user = window?.Telegram?.WebApp?.initDataUnsafe?.user
    const platform = window?.Telegram?.WebApp?.platform

    return (
        <>
            <Button
                className="fixed z-[100] bottom-2 left-2 p-2"
                onClick={() => {
                    setVisible((v) => !v)
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                >
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </Button>
            {visible && (
                <div className="fixed z-[10] top-0 left-0 w-[100dvw] h-[100dvh] py-16 flex flex-col text-sm text-white bg-[#161616]/90 border-4 border-red-500 overflow-hidden">
                    <div className="p-4 w-full max-h-full grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 overflow-y-auto">
                        <Label>Build time</Label>
                        <Value>{new Date(Number(__BUILD_TIME__)).toString()}</Value>

                        <span />
                        <div className="flex items-center gap-2">
                            <CopyButton content={initialURL}>Copy URL</CopyButton>
                            <CopyButton content={initialParams}>Copy params</CopyButton>
                        </div>

                        <Label>Initial URL</Label>
                        <Value>{initialURL}</Value>

                        {initialURL !== currentURL && (
                            <>
                                <Label>Current URL</Label>
                                <Value>{currentURL}</Value>
                            </>
                        )}

                        {user && (
                            <>
                                <Label>user</Label>
                                <Value>{JSON.stringify(user)}</Value>
                            </>
                        )}

                        {platform && (
                            <>
                                <Label>platform</Label>
                                <Value>{platform}</Value>
                            </>
                        )}

                        <Label>window.innerWidth</Label>
                        <Value>{window.innerWidth}</Value>

                        <Label>window.innerHeight</Label>
                        <Value>{window.innerHeight}</Value>

                        <Label>document.clientWidth</Label>
                        <Value>{document.documentElement.clientWidth}</Value>

                        <Label>document.clientHeight</Label>
                        <Value>{document.documentElement.clientHeight}</Value>
                    </div>

                    <div className="absolute left-0 top-4 w-full px-4 flex gap-8">
                        <div className="flex-1 flex flex-wrap gap-4" />

                        <div className="flex-none">
                            <Button onClick={() => setVisible(false)}>Close</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

function Label({ children, className }: React.PropsWithChildren<{ className?: string }>) {
    return <span className={cn("text-right whitespace-nowrap", className)}>{children}</span>
}

function Value({ children }: React.PropsWithChildren) {
    return <span className="font-medium break-all">{children}</span>
}

function CopyButton({ content, children }: React.PropsWithChildren<{ content: string }>) {
    const [copied, setCopied] = useState(false)
    return (
        <Button
            onClick={async () => {
                await navigator.clipboard.writeText(content)
                setCopied(true)
                setTimeout(() => {
                    setCopied(false)
                }, 500)
            }}
            className="h-7 w-fit flex-none gap-2"
        >
            {children}
            {copied ? (
                <CheckIcon className={cn("flex-none w-4 h-4 stroke-[4]")} />
            ) : (
                <CopyIcon className={cn("flex-none w-4 h-4 stroke-[4]")} />
            )}
        </Button>
    )
}
