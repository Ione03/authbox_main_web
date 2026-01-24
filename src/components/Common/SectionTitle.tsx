import { component$ } from "@builder.io/qwik";

interface SectionTitleProps {
    title: string;
    paragraph: string;
    width?: string;
    center?: boolean;
    mb?: string;
}

export default component$<SectionTitleProps>(
    ({ title, paragraph, width = "570px", center, mb = "100px" }) => {
        return (
            <>
                <div
                    class={`w-full ${center ? "mx-auto text-center" : ""}`}
                    style={{ maxWidth: width, marginBottom: mb }}
                >
                    <h2 class="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
                        {title}
                    </h2>
                    <p class="text-base !leading-relaxed text-body-color md:text-lg">
                        {paragraph}
                    </p>
                </div>
            </>
        );
    }
);
