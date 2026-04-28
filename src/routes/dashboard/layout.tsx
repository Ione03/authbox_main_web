import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "../../components/Header";
import ScrollToTop from "../../components/ScrollToTop";
import ScrollUp from "../../components/Common/ScrollUp";
import { ThemeProvider } from "../../context/theme-context";

export const onGet: RequestHandler = async ({ cacheControl }) => {
    cacheControl({
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        maxAge: 5,
    });
};

export default component$(() => {
    return (
        <ThemeProvider>
            <Header />
            <Slot />
            <ScrollUp />
            <ScrollToTop />
        </ThemeProvider>
    );
});
