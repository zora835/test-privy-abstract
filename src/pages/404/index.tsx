import { useNavigate } from "react-router-dom"

import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"

function Text404() {
    return (
        <div className="min-w-[480px] flex items-center justify-center gap-6">
            {["4", "0", "4"].map((text, i) => {
                return (
                    <div
                        key={i}
                        className="size-[160px] flex items-center justify-center rounded-full bg-[#f1ae1b] text-black text-[100px] font-bold"
                    >
                        {text}
                    </div>
                )
            })}
        </div>
    )
}

function NotFoundPage() {
    const navigate = useNavigate()

    return (
        <Layout className="flex flex-col items-center justify-center">
            <Text404 />
            <span className="mt-8 mb-2 text-2xl font-semibold text-[#888888]">Page not found</span>
            <Button
                variant="primary"
                onClick={() => {
                    navigate("/")
                }}
            >
                Go home
            </Button>
        </Layout>
    )
}

export default NotFoundPage
