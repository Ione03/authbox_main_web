import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ScrollUp from "../components/Common/ScrollUp";
import { ThemeProvider } from "../context/theme-context";

export const onGet: RequestHandler = async ({ cacheControl }) => {
    // Control caching for this request for best performance.
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });
};

export default component$(() => {
    return (
        <ThemeProvider>
            <Header />
            <Slot />
            <Footer />
            <ScrollUp />
            <ScrollToTop />
        </ThemeProvider>
    );
});
