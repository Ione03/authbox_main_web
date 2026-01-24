import { component$, createContextId, useContextProvider, useSignal, useVisibleTask$, Slot, type Signal } from "@builder.io/qwik";

export const ThemeContext = createContextId<Signal<string>>("theme-context");

export const ThemeProvider = component$(() => {
    const theme = useSignal("light");

    // Load theme from localStorage on client
    useVisibleTask$(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme) {
            theme.value = savedTheme;
        } else if (prefersDark) {
            theme.value = "dark";
        }

        // Apply theme class to html element
        document.documentElement.classList.toggle("dark", theme.value === "dark");
    });

    // Watch for theme changes
    useVisibleTask$(({ track }) => {
        track(() => theme.value);
        document.documentElement.classList.toggle("dark", theme.value === "dark");
        localStorage.setItem("theme", theme.value);
    });

    useContextProvider(ThemeContext, theme);

    return <Slot />;
});
