import { component$ } from "@builder.io/qwik";

interface BreadcrumbProps {
    pageName: string;
    description: string;
}

export default component$<BreadcrumbProps>(({ pageName, description }) => {
    return (
        <>
            <section class="relative z-10 overflow-hidden pt-28 pb-24 lg:pt-[150px] lg:pb-[100px] dark:bg-dark bg-primary bg-opacity-5">
                <div class="container">
                    <div class="-mx-4 flex flex-wrap items-center">
                        <div class="w-full px-4">
                            <div class="text-center">
                                <h1 class="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
                                    {pageName}
                                </h1>
                                <p class="mb-5 text-base text-body-color dark:text-dark-6">
                                    {description}
                                </p>
                                <ul class="flex items-center justify-center gap-[10px]">
                                    <li>
                                        <a
                                            href="/"
                                            class="flex items-center gap-[10px] text-base font-medium text-dark dark:text-white"
                                        >
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <span class="block h-2 w-2 rounded-full bg-primary"></span>
                                    </li>
                                    <li class="text-base font-medium text-body-color">
                                        {pageName}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <span class="absolute top-0 left-0 z-[-1]">
                        <svg
                            width="287"
                            height="254"
                            viewBox="0 0 287 254"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                opacity="0.1"
                                d="M286.5 0.5L-14.5 254.5V69.5L286.5 0.5Z"
                                fill="url(#paint0_linear_111:578)"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_111:578"
                                    x1="-40.5"
                                    y1="117"
                                    x2="301.926"
                                    y2="-97.1485"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stop-color="#4A6CF7" />
                                    <stop offset="1" stop-color="#4A6CF7" stop-opacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                    <span class="absolute top-0 right-0 z-[-1]">
                        <svg
                            width="628"
                            height="258"
                            viewBox="0 0 628 258"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                opacity="0.1"
                                d="M669.125 257.002L345.875 31.002L524.571 -132.998L669.125 257.002Z"
                                fill="url(#paint0_linear_0:1)"
                            />
                            <path
                                opacity="0.1"
                                d="M0.0716344 182.78L101.988 -15.0769L231.235 -30.1978L0.0716344 182.78Z"
                                fill="url(#paint1_linear_0:1)"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_0:1"
                                    x1="644"
                                    y1="221"
                                    x2="429.946"
                                    y2="37.0429"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stop-color="#4A6CF7" />
                                    <stop offset="1" stop-color="#4A6CF7" stop-opacity="0" />
                                </linearGradient>
                                <linearGradient
                                    id="paint1_linear_0:1"
                                    x1="18.3648"
                                    y1="166.016"
                                    x2="105.377"
                                    y2="32.3398"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stop-color="#4A6CF7" />
                                    <stop offset="1" stop-color="#4A6CF7" stop-opacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                </div>
            </section>
        </>
    );
});
