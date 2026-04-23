import { component$, createContextId, useContextProvider, useSignal, useVisibleTask$, Slot, type Signal } from "@builder.io/qwik";

export const ThemeContext = createContextId<Signal<string>>("theme-context");

export const ThemeProvider = component$(() => {
    const theme = useSignal("light");
    const initialized = useSignal(false);

    // On mount: restore saved theme, then track future changes
    useVisibleTask$(({ track }) => {
        track(() => theme.value);

        if (!initialized.value) {
            // First run only: restore from localStorage or system preference
            initialized.value = true;
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme) {
                if (theme.value !== savedTheme) {
                    theme.value = savedTheme;
                    return; // task will re-run with the correct value
                }
            } else {
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const systemTheme = prefersDark ? "dark" : "light";
                if (theme.value !== systemTheme) {
                    theme.value = systemTheme;
                    return;
                }
            }
        }

        // Apply theme class and persist (runs on mount + every toggle click)
        document.documentElement.classList.toggle("dark", theme.value === "dark");
        localStorage.setItem("theme", theme.value);
    });

    useContextProvider(ThemeContext, theme);

    return <Slot />;
});
