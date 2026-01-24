import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";

export default component$(() => {
    const visibleScrollToTop = useSignal(false);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ cleanup }) => {
        const handleScroll = () => {
            visibleScrollToTop.value = window.scrollY > 400;
        };

        // Check initial scroll position
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        cleanup(() => window.removeEventListener("scroll", handleScroll));
    }, { strategy: "document-ready" });

    const scrollToTop = $(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    return (
        <div
            class={`fixed bottom-8 right-8 z-[99] transition-opacity duration-300 ${visibleScrollToTop.value ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <button
                onClick$={scrollToTop}
                aria-label="scroll to top"
                class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-sign-up"
            >
                <span class="mt-[6px] h-3 w-3 rotate-45 border-t border-l border-white"></span>
            </button>
        </div>
    );
});
