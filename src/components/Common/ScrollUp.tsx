import { component$, useVisibleTask$ } from "@builder.io/qwik";

export default component$(() => {
    useVisibleTask$(() => {
        window.scrollTo(0, 0);
    });

    return <></>;
});
