import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md font-uncut text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 select-none",
    {
        variants: {
            variant: {
                none: "",
                default:
                    "bg-[#313131] text-white shadow hover:bg-[#414141] disabled:text-[#888888] disabled:bg-[#313131] rounded-lg",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline:
                    "border border-[#505050] bg-[#333333] shadow-sm hover:bg-accent hover:text-accent-foreground disabled:text-[#888888] disabled:bg-[#313131]",
                secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                primary:
                    "bg-[#8569E6] text-black font-semibold text-base shadow hover:bg-[#6d51d1] disabled:text-[#888888] disabled:bg-[#313131] rounded-full",
                action: "bg-[#202227] text-[#90EC05] font-semibold text-base hover:bg-[#25272c] hover:text-[#85dc03] disabled:text-[#888888] disabled:bg-[#313131] rounded-full",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 px-3 text-xs",
                lg: "h-10 px-8",
                xl: "h-[60px] w-full px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
