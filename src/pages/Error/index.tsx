import { useSearchParams } from "react-router-dom"

import Layout from "@/components/Layout"

function ErrorPage() {
    const [searchParams] = useSearchParams()
    const errorText = decodeURIComponent(searchParams.get("text") || "Something went wrong")

    return (
        <Layout className="flex flex-col items-center justify-center gap-4">
            <span className="font-bold text-sm">Error</span>
            <span className="max-w-full px-4 text-xl font-semibold text-[#888888] text-balance text-center">
                {errorText}
            </span>
        </Layout>
    )
}

export default ErrorPage
