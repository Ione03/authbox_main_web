import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
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
            <Slot />
        </ThemeProvider>
    );
});
