import { component$ } from "@builder.io/qwik";
import { Testimonial } from "~/types/testimonial";
import testimonialData from "./testimonialData";
import SectionTitle from "../Common/SectionTitle";

const SingleTestimonial = component$<{ testimonial: Testimonial }>(
    ({ testimonial }) => {
        const { star, name, image, content, designation } = testimonial;

        const ratingIcons = [];
        for (let i = 0; i < star; i++) {
            ratingIcons.push(
                <span key={i} class="text-yellow">
                    <svg
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        class="fill-current"
                    >
                        <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
                    </svg>
                </span>
            );
        }

        return (
            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                    class="mb-10 rounded-md bg-white p-8 shadow-two duration-300 hover:shadow-one dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark lg:px-5 xl:px-8"
                >
                    <div class="mb-5 flex items-center space-x-1">{ratingIcons}</div>
                    <p class="mb-8 border-b border-body-color border-opacity-10 pb-8 text-base leading-relaxed text-body-color dark:border-white dark:border-opacity-10 dark:text-white">
                        "{content}
                    </p>
                    <div class="flex items-center">
                        <div class="relative mr-4 h-[50px] w-full max-w-[50px] overflow-hidden rounded-full">
                            <img src={image} alt={name} />
                        </div>
                        <div class="w-full">
                            <h3 class="mb-1 text-lg font-semibold text-dark dark:text-white lg:text-base xl:text-lg">
                                {name}
                            </h3>
                            <p class="text-sm text-body-color">{designation}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

export default component$(() => {
    return (
        <section class="dark:bg-bg-color-dark relative z-10 bg-gray-light py-16 md:py-20 lg:py-28">
            <div class="container">
                <SectionTitle
                    title="What Our Users Says"
                    paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
                    center
                />

                <div class="flex flex-wrap">
                    {testimonialData.map((testimonial) => (
                        <SingleTestimonial key={testimonial.id} testimonial={testimonial} />
                    ))}
                </div>
            </div>
            <div class="absolute right-0 top-5 z-[-1]">
                <svg
                    width="238"
                    height="531"
                    viewBox="0 0 238 531"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        opacity="0.3"
                        x="422.819"
                        y="-70.8145"
                        width="196"
                        height="541.607"
                        rx="2"
                        transform="rotate(51.2997 422.819 -70.8145)"
                        fill="url(#paint0_linear_83:2)"
                    />
                    <rect
                        opacity="0.3"
                        x="426.568"
                        y="144.886"
                        width="59.7544"
                        height="541.607"
                        rx="2"
                        transform="rotate(51.2997 426.568 144.886)"
                        fill="url(#paint1_linear_83:2)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_83:2"
                            x1="517.152"
                            y1="-251.373"
                            x2="517.152"
                            y2="459.865"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#4A6CF7" />
                            <stop offset="1" stop-color="#4A6CF7" stop-opacity="0" />
                        </linearGradient>
                        <linearGradient
                            id="paint1_linear_83:2"
                            x1="455.327"
                            y1="-35.673"
                            x2="455.327"
                            y2="675.565"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#4A6CF7" />
                            <stop offset="1" stop-color="#4A6CF7" stop-opacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div class="absolute bottom-5 left-0 z-[-1]">
                <svg
                    width="279"
                    height="106"
                    viewBox="0 0 279 106"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g opacity="0.5">
                        <path
                            d="M-57 12L50.0728 74.8548C55.5501 79.0219 70.8513 85.928 88.2373 79.1459C109.97 70.9358 102.216 52.115 117.447 42.6091C155.3 18.9979 221.799 45.5887 262.745 13.2828C274.783 3.77887 285.921 -7.69026 295.001 -19.5"
                            stroke="url(#paint0_linear_72:302)"
                        />
                        <path
                            d="M-57 1L50.0728 63.8548C55.5501 68.0219 70.8513 74.928 88.2373 68.1459C109.97 59.9358 102.216 41.115 117.447 31.6091C155.3 7.9979 221.799 34.5887 262.745 2.28285C274.783 -7.22113 285.921 -18.6903 295.001 -30.5"
                            stroke="url(#paint1_linear_72:302)"
                        />
                        <path
                            d="M-57 23L50.0728 85.8548C55.5501 90.0219 70.8513 96.928 88.2373 90.1459C109.97 81.9358 102.216 63.115 117.447 53.6091C155.3 29.9979 221.799 56.5887 262.745 24.2828C274.783 14.7789 285.921 3.30967 295.001 -8.5"
                            stroke="url(#paint2_linear_72:302)"
                        />
                    </g>
                    <defs>
                        <linearGradient
                            id="paint0_linear_72:302"
                            x1="256.267"
                            y1="53.6717"
                            x2="-40.8688"
                            y2="8.15715"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#4A6CF7" stop-opacity="0" />
                            <stop offset="1" stop-color="#4A6CF7" />
                        </linearGradient>
                        <linearGradient
                            id="paint1_linear_72:302"
                            x1="256.267"
                            y1="42.6717"
                            x2="-40.8688"
                            y2="-2.84285"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#4A6CF7" stop-opacity="0" />
                            <stop offset="1" stop-color="#4A6CF7" />
                        </linearGradient>
                        <linearGradient
                            id="paint2_linear_72:302"
                            x1="256.267"
                            y1="64.6717"
                            x2="-40.8688"
                            y2="19.1572"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#4A6CF7" stop-opacity="0" />
                            <stop offset="1" stop-color="#4A6CF7" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </section>
    );
});
