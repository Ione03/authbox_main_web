import { component$ } from "@builder.io/qwik";
import SectionTitle from "../Common/SectionTitle";
import featuresData, { SingleFeature } from "./featuresData";

export default component$(() => {
    return (
        <>
            <section id="features" class="py-16 md:py-20 lg:py-28">
                <div class="container">
                    <SectionTitle
                        title="Main Features"
                        paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
                        center
                    />

                    <div class="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                        {featuresData.map((feature) => (
                            <SingleFeature key={feature.id} feature={feature} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
});
