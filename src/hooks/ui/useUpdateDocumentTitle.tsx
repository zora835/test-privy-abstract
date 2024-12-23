import { useEffect } from "react"

export default function useUpdateDocumentTitle(pageTitle: string) {
    useEffect(() => {
        document.title = "Test | " + pageTitle
    }, [pageTitle])
}

function UpdateDocumentTitle({ pageTitle }: { pageTitle: string }) {
    useUpdateDocumentTitle(pageTitle)
    return null
}

export function withDocumentTitle(Component: React.ReactNode, pageTitle: string) {
    return (
        <>
            {Component}
            <UpdateDocumentTitle pageTitle={pageTitle} />
        </>
    )
}
