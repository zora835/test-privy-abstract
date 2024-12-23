import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import duration from "dayjs/plugin/duration"
import localizedFormat from "dayjs/plugin/localizedFormat"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Debug from "@/components/Debug"
import Provider from "@/components/Provider"
import { withFullPageLoading } from "@/components/loading"
import { withDocumentTitle } from "@/hooks/ui/useUpdateDocumentTitle"
import NotFoundPage from "@/pages/404"
import ErrorPage from "@/pages/Error"
import HomePage from "@/pages/Home"

import "./index.css"
import "react-loading-skeleton/dist/skeleton.css"

dayjs.extend(advancedFormat)
dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(duration)
;(() => {
    import("eruda").then((eruda) => eruda.default.init())

    // Scrolling/swiping down may confuse TG to trigger minimizing the app, so disable it
    // TODO: remove conditional chaining in new versions of @types/telegram-web-app
    // @ts-ignore
    window.Telegram?.WebApp?.disableVerticalSwipes?.()
})()

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={withFullPageLoading(withDocumentTitle(<HomePage />, "Home"))}
                    />
                    <Route path="/error" element={withDocumentTitle(<ErrorPage />, "Error")} />
                    <Route path="*" element={withDocumentTitle(<NotFoundPage />, "Not Found")} />
                </Routes>
                <Debug />
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
;(() => {
    console.log(`Build time: %c${new Date(Number(__BUILD_TIME__))}`, "color: #bada55")
})()
