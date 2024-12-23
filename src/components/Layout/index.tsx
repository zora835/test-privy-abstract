import { cn } from "@/lib/utils"

type LayoutProps = React.PropsWithChildren<{
    className?: string
}>
export default function Layout({ children, className }: LayoutProps) {
    return <div className={cn("relative w-full min-h-full bg-black", className)}>{children}</div>
}
