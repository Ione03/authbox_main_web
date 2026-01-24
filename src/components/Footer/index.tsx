import { component$, $, } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { scrollToSection } from "~/utils/scroll";

export default component$(() => {
    const location = useLocation();

    const handleScrollLink = $((event: any, path: string) => {
        if (path.startsWith("/#") && location.url.pathname === "/") {
            event.preventDefault();
            const sectionId = path.split("#")[1];
            const scrollHandler = scrollToSection(sectionId);
            scrollHandler();
        }
    });

    return (
        <>
            <footer id="contact" class="relative z-10 bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24">
                <div class="container">
                    <div class="-mx-4 flex flex-wrap">
                        <div class="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
                            <div class="mb-12 max-w-[360px] lg:mb-16">
                                <a href="/" class="mb-8 inline-block">
                                    <img
                                        src="/images/logo/logo-2.svg"
                                        alt="logo"
                                        class="w-full dark:hidden"
                                        width={140}
                                        height={30}
                                    />
                                    <img
                                        src="/images/logo/logo.svg"
                                        alt="logo"
                                        class="hidden w-full dark:block"
                                        width={140}
                                        height={30}
                                    />
                                </a>
                                <p class="mb-9 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lobortis.
                                </p>
                                <div class="flex items-center">
                                    <a
                                        href="/"
                                        aria-label="social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                    >
                                        <svg
                                            width="9"
                                            height="18"
                                            viewBox="0 0 9 18"
                                            class="fill-current"
                                        >
                                            <path d="M8.13643 7H6.78036H6.29605V6.43548V4.68548V4.12097H6.78036H7.79741C8.06378 4.12097 8.28172 3.89516 8.28172 3.55645V0.564516C8.28172 0.254032 8.088 0 7.79741 0H6.02968C4.11665 0 2.78479 1.58498 2.78479 3.92339V6.37903V6.94355H2.30048H0.65382C0.314802 6.94355 0 7.25403 0 7.70564V9.7379C0 10.1331 0.266371 10.5765 0.65382 10.5765H2.25205H2.73636V11.141V17.2016C2.73636 17.5765 3.00273 18 3.39018 18H5.66644C5.81174 18 5.93281 17.9194 6.02968 17.8065C6.12654 17.6935 6.19919 17.4516 6.19919 17.2581V11.1694V10.6048H6.70771H7.79741C8.11222 10.6048 8.35437 10.3831 8.4028 10.0282V10.0039V9.97984L8.74182 7.95161C8.76604 7.73387 8.74182 7.48387 8.59653 7.22581C8.54809 7.16129 8.33016 7 8.13643 7Z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="/"
                                        aria-label="social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                    >
                                        <svg
                                            width="19"
                                            height="14"
                                            viewBox="0 0 19 14"
                                            class="fill-current"
                                        >
                                            <path d="M16.3024 2.26027L17.375 1.0274C17.6855 0.693493 17.7702 0.436644 17.8069 0.308219C16.9033 0.770548 16.0725 0.91918 15.5543 0.91918H15.384L15.2836 0.821918C14.4532 0.132877 13.4509 0 12.5765 0C10.5026 0 8.74553 1.69863 8.74553 3.78082C8.74553 3.89041 8.74553 4.04794 8.76918 4.20548L8.89233 5.00137L8.08032 4.95443C4.24574 4.77534 1.1689 1.66989 0.582474 1.03563C-0.246307 2.53151 0.281025 4.03288 0.734006 4.81233L1.0575 5.35068L0.538616 5.08493C0.568224 6.59452 1.23254 7.68493 2.50379 8.47671L3.04247 8.80822L2.50379 9.01918C2.95207 10.3313 4.03037 10.7863 4.85699 11.0082L5.80645 11.2603L4.9089 11.8425C3.81014 12.5534 2.51956 12.8479 1.57209 12.8479C1.21349 12.8479 0.903856 12.8233 0.679932 12.7658L0 12.6575L0.619684 13.052C1.84985 13.8219 3.4467 14 4.71376 14C5.82895 14 6.61149 13.8764 6.89665 13.7808C16.1846 11.5616 16.4698 4.18904 16.4698 3.90685V3.54795L16.796 3.33699C17.7316 2.47534 18.1198 2.04794 18.3403 1.79726C18.2654 1.82192 18.1646 1.87123 18.0637 1.89589L16.3024 2.26027Z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="/"
                                        aria-label="social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                    >
                                        <svg
                                            width="18"
                                            height="14"
                                            viewBox="0 0 18 14"
                                            class="fill-current"
                                        >
                                            <path d="M17.5058 2.07119C17.3068 1.2488 16.7099 0.609173 15.9423 0.395963C14.5778 7.26191e-08 9.0627 0 9.0627 0C9.0627 0 3.54766 7.26191e-08 2.18311 0.395963C1.41555 0.609173 0.818561 1.2488 0.619565 2.07119C0.25 3.56366 0.25 6.60953 0.25 6.60953C0.25 6.60953 0.25 9.65541 0.619565 11.1479C0.818561 11.9703 1.41555 12.6099 2.18311 12.8231C3.54766 13.2191 9.0627 13.2191 9.0627 13.2191C9.0627 13.2191 14.5778 13.2191 15.9423 12.8231C16.7099 12.6099 17.3068 11.9703 17.5058 11.1479C17.8754 9.65541 17.8754 6.60953 17.8754 6.60953C17.8754 6.60953 17.8754 3.56366 17.5058 2.07119ZM7.30016 9.44218V3.77687L11.8771 6.60953L7.30016 9.44218Z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="/"
                                        aria-label="social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                    >
                                        <svg
                                            width="17"
                                            height="16"
                                            viewBox="0 0 17 16"
                                            class="fill-current"
                                        >
                                            <path d="M15.2196 0H1.99991C1.37516 0 0.875366 0.497491 0.875366 1.11936V14.3029C0.875366 14.8999 1.37516 15.4222 1.99991 15.4222H15.1696C15.7944 15.4222 16.2444 14.9247 16.2444 14.3029V1.09448C16.2694 0.497491 15.7696 0 15.2196 0ZM5.44852 13.1089H3.17444V5.7709H5.44852V13.1089ZM4.29899 4.75104C3.54929 4.75104 2.97452 4.15405 2.97452 3.43269C2.97452 2.71133 3.57428 2.11434 4.29899 2.11434C5.02369 2.11434 5.62345 2.71133 5.62345 3.43269C5.62345 4.15405 5.07367 4.75104 4.29899 4.75104ZM14.07 13.1089H11.796V9.55183C11.796 8.7061 11.771 7.58674 10.5964 7.58674C9.39693 7.58674 9.222 8.53198 9.222 9.47721V13.1089H6.94791V5.7709H9.17202V6.79049H9.19701C9.52188 6.19352 10.2466 5.59653 11.3711 5.59653C13.6952 5.59653 14.12 7.11228 14.12 9.10187V13.1089H14.07Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
                            <div class="mb-12 lg:mb-16">
                                <h2 class="mb-10 text-xl font-bold text-black dark:text-white">
                                    Useful Links
                                </h2>
                                <ul>
                                    <li>
                                        <a
                                            href="/blog"
                                            class="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/#pricing"
                                            onClick$={(e) => handleScrollLink(e, "/#pricing")}
                                            class="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            Pricing
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/#about"
                                            onClick$={(e) => handleScrollLink(e, "/#about")}
                                            class="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            About
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/#contact"
                                            onClick$={(e) => handleScrollLink(e, "/#contact")}
                                            class="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            Contact Us
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
                            <div class="mb-12 lg:mb-16">
                                <h2 class="mb-10 text-xl font-bold text-black dark:text-white">
                                    Terms
                                </h2>
                                <ul>
                                    <li>
                                        <a
                                            href="/"
                                            class="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            TOS
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            class="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            class="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            Refund Policy
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12">
                            <div class="mb-12 lg:mb-16">
                                <h2 class="mb-10 text-xl font-bold text-black dark:text-white">
                                    Support & Help
                                </h2>
                                <ul>
                                    <li>
                                        <a
                                            href="/contact"
                                            class="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            Open Support Ticket
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            class="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            Terms of Use
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/about"
                                            class="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            About
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
                    <div class="py-8">
                        <p class="text-center text-base text-body-color dark:text-white">
                            Template by NextJSTemplates
                        </p>
                    </div>
                </div>
                <div class="absolute right-0 top-14 z-[-1]">
                    <svg
                        width="55"
                        height="99"
                        viewBox="0 0 55 99"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle opacity="0.8" cx="49.5" cy="49.5" r="49.5" fill="#959CB1" />
                        <mask
                            id="mask0_94:899"
                            style={{ maskType: "alpha" }}
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="99"
                            height="99"
                        >
                            <circle
                                opacity="0.8"
                                cx="49.5"
                                cy="49.5"
                                r="49.5"
                                fill="#4A6CF7"
                            />
                        </mask>
                        <g mask="url(#mask0_94:899)">
                            <circle
                                opacity="0.8"
                                cx="49.5"
                                cy="49.5"
                                r="49.5"
                                fill="url(#paint0_radial_94:899)"
                            />
                            <g opacity="0.8" filter="url(#filter0_f_94:899)">
                                <circle cx="53.8676" cy="26.2061" r="20.3824" fill="white" />
                            </g>
                        </g>
                        <defs>
                            <filter
                                id="filter0_f_94:899"
                                x="12.4852"
                                y="-15.1763"
                                width="82.7646"
                                height="82.7646"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="s-rGB"
                            >
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="BackgroundImageFix"
                                    result="shape"
                                />
                                <feGaussianBlur
                                    stdDeviation="10.5"
                                    result="effect1_foregroundBlur_94:899"
                                />
                            </filter>
                            <radialGradient
                                id="paint0_radial_94:899"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(49.5 49.5) rotate(90) scale(53.1397)"
                            >
                                <stop stop-opacity="0.47" />
                                <stop offset="1" stop-opacity="0" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
                <div class="absolute bottom-24 left-0 z-[-1]">
                    <svg
                        width="79"
                        height="94"
                        viewBox="0 0 79 94"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            opacity="0.3"
                            x="-41"
                            y="26.9426"
                            width="66.6675"
                            height="66.6675"
                            transform="rotate(-22.9007 -41 26.9426)"
                            fill="url(#paint0_linear_94:889)"
                        />
                        <rect
                            x="-41"
                            y="26.9426"
                            width="66.6675"
                            height="66.6675"
                            transform="rotate(-22.9007 -41 26.9426)"
                            stroke="url(#paint1_linear_94:889)"
                            stroke-width="0.7"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_94:889"
                                x1="-41"
                                y1="21.8445"
                                x2="36.9671"
                                y2="59.8878"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stop-color="#4A6CF7" stop-opacity="0.62" />
                                <stop offset="1" stop-color="#4A6CF7" stop-opacity="0" />
                            </linearGradient>
                            <linearGradient
                                id="paint1_linear_94:889"
                                x1="25.6675"
                                y1="95.9631"
                                x2="-42.9608"
                                y2="20.668"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stop-color="#4A6CF7" stop-opacity="0" />
                                <stop offset="1" stop-color="#4A6CF7" stop-opacity="0.51" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </footer>
        </>
    );
});
