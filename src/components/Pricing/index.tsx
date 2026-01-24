import { component$, useSignal, Slot } from "@builder.io/qwik";
import SectionTitle from "../Common/SectionTitle";

const OfferList = component$<{ text: string; status: "active" | "inactive" }>(
    ({ text, status }) => {
        return (
            <li class="mb-4 flex items-center">
                <span
                    class={`mr-3 flex h-[18px] w-full max-w-[18px] items-center justify-center rounded-full ${status === "active" ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
                        }`}
                >
                    {status === "active" ? (
                        <svg width="8" height="6" viewBox="0 0 8 6" class="fill-white">
                            <path d="M2.90567 6.00024L0.0236328 2.96541L0.731579 2.28552L2.90567 4.61017L7.26852 0.0742188L7.97647 0.754089L2.90567 6.00024Z" />
                        </svg>
                    ) : (
                        <svg width="8" height="2" viewBox="0 0 8 2" class="fill-white">
                            <path d="M0 0.5H8V1.5H0V0.5Z" />
                        </svg>
                    )}
                </span>
                <p
                    class={`text-base font-medium ${status === "active" ? "text-body-color dark:text-body-color-dark" : "text-body-color/50 dark:text-body-color-dark/50"
                        }`}
                >
                    {text}
                </p>
            </li>
        );
    }
);

const PricingBox = component$<{
    packageName: string;
    price: string;
    duration: string;
    subtitle: string;
}>(({ packageName, price, duration, subtitle }) => {
    return (
        <div class="w-full px-4 md:w-1/2 lg:w-1/3">
            <div class="relative z-10 mb-10 overflow-hidden rounded-md bg-gray-100 dark:bg-[#1D2144] px-8 py-10 shadow-two hover:shadow-one dark:shadow-three dark:hover:shadow-gray-dark sm:p-12 lg:px-6 lg:py-10 xl:p-[50px] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
                <span class="mb-3 block text-lg font-semibold text-primary">
                    {packageName}
                </span>
                <h2 class="mb-5 text-[42px] font-bold text-dark dark:text-white">
                    <span class="text-lg font-medium">{packageName === "Plus" ? "Mulai dari Rp. " : "Rp. "}</span>
                    <span>{price}</span>
                    <span class="text-base font-medium text-body-color">
                        /{duration}
                    </span>
                </h2>
                <p class="mb-8 border-b border-body-color border-opacity-[.25] pb-8 text-base text-body-color dark:border-white dark:border-opacity-25">
                    {subtitle}
                </p>
                <div class="mb-9 flex flex-col gap-[14px]"><Slot /></div>
                <a
                    href="/#"
                    class="block w-full rounded-xs bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90"
                >
                    Start Free Trial
                </a>
                <div>
                    <span class="absolute right-0 top-7 z-[-1]">
                        <svg
                            width="77"
                            height="172"
                            viewBox="0 0 77 172"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="86" cy="86" r="86" fill="url(#paint0_linear)" />
                            <defs>
                                <linearGradient
                                    id="paint0_linear"
                                    x1="86"
                                    y1="0"
                                    x2="86"
                                    y2="172"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stop-color="#3056D3" stop-opacity="0.09" />
                                    <stop offset="1" stop-color="#C4C4C4" stop-opacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                    <span class="absolute right-4 top-4 z-[-1]">
                        <svg
                            width="41"
                            height="89"
                            viewBox="0 0 41 89"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="38.9138"
                                cy="87.4849"
                                r="1.42021"
                                transform="rotate(180 38.9138 87.4849)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="38.9138"
                                cy="74.9871"
                                r="1.42021"
                                transform="rotate(180 38.9138 74.9871)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="38.9138"
                                cy="62.4892"
                                r="1.42021"
                                transform="rotate(180 38.9138 62.4892)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="38.9138"
                                cy="38.3457"
                                r="1.42021"
                                transform="rotate(180 38.9138 38.3457)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="38.9138"
                                cy="13.634"
                                r="1.42021"
                                transform="rotate(180 38.9138 13.634)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="38.9138"
                                cy="50.2754"
                                r="1.42021"
                                transform="rotate(180 38.9138 50.2754)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="38.9138"
                                cy="26.1319"
                                r="1.42021"
                                transform="rotate(180 38.9138 26.1319)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="38.9138"
                                cy="1.42021"
                                r="1.42021"
                                transform="rotate(180 38.9138 1.42021)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="26.4157"
                                cy="87.4849"
                                r="1.42021"
                                transform="rotate(180 26.4157 87.4849)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="26.4157"
                                cy="74.9871"
                                r="1.42021"
                                transform="rotate(180 26.4157 74.9871)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="26.4157"
                                cy="62.4892"
                                r="1.42021"
                                transform="rotate(180 26.4157 62.4892)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="26.4157"
                                cy="38.3457"
                                r="1.42021"
                                transform="rotate(180 26.4157 38.3457)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="26.4157"
                                cy="13.634"
                                r="1.42021"
                                transform="rotate(180 26.4157 13.634)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="26.4157"
                                cy="50.2754"
                                r="1.42021"
                                transform="rotate(180 26.4157 50.2754)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="26.4157"
                                cy="26.1319"
                                r="1.42021"
                                transform="rotate(180 26.4157 26.1319)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="26.4157"
                                cy="1.42021"
                                r="1.42021"
                                transform="rotate(180 26.4157 1.42021)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="13.9177"
                                cy="87.4849"
                                r="1.42021"
                                transform="rotate(180 13.9177 87.4849)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="13.9177"
                                cy="74.9871"
                                r="1.42021"
                                transform="rotate(180 13.9177 74.9871)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="13.9177"
                                cy="62.4892"
                                r="1.42021"
                                transform="rotate(180 13.9177 62.4892)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="13.9177"
                                cy="38.3457"
                                r="1.42021"
                                transform="rotate(180 13.9177 38.3457)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="13.9177"
                                cy="13.634"
                                r="1.42021"
                                transform="rotate(180 13.9177 13.634)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="13.9177"
                                cy="50.2754"
                                r="1.42021"
                                transform="rotate(180 13.9177 50.2754)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="13.9177"
                                cy="26.1319"
                                r="1.42021"
                                transform="rotate(180 13.9177 26.1319)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="13.9177"
                                cy="1.42021"
                                r="1.42021"
                                transform="rotate(180 13.9177 1.42021)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="1.41963"
                                cy="87.4849"
                                r="1.42021"
                                transform="rotate(180 1.41963 87.4849)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="1.41963"
                                cy="74.9871"
                                r="1.42021"
                                transform="rotate(180 1.41963 74.9871)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="1.41963"
                                cy="62.4892"
                                r="1.42021"
                                transform="rotate(180 1.41963 62.4892)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="1.41963"
                                cy="38.3457"
                                r="1.42021"
                                transform="rotate(180 1.41963 38.3457)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="1.41963"
                                cy="13.634"
                                r="1.42021"
                                transform="rotate(180 1.41963 13.634)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="1.41963"
                                cy="50.2754"
                                r="1.42021"
                                transform="rotate(180 1.41963 50.2754)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="1.41963"
                                cy="26.1319"
                                r="1.42021"
                                transform="rotate(180 1.41963 26.1319)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="1.41963"
                                cy="1.42021"
                                r="1.42021"
                                transform="rotate(180 1.41963 1.42021)"
                                fill="#3056D3"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
});

export default component$(() => {
    const isMonthly = useSignal(false);

    return (
        <section id="pricing" class="relative z-10 bg-white dark:bg-gray-dark py-16 md:py-20 lg:py-28">
            <div class="container">
                <SectionTitle
                    title="Pilihan Sesuai Kebutuhan"
                    paragraph="Selalu ada satu solusi untuk semua. Kami menyediakan berbagai pilihan paket yang bisa Anda sesuaikan dengan skala bisnis, tujuan, dan budget Anda."
                    center
                    width="665px"
                />

                {/* Monthly/Yearly Switch - Commented out
                <div class="w-full">
                    <div
                        class="mb-8 flex justify-center md:mb-12 lg:mb-16"
                    >
                        <span
                            class={`${isMonthly.value
                                ? "pointer-events-none text-primary"
                                : "text-dark dark:text-white"
                                } mr-4 cursor-pointer text-base font-semibold`}
                            onClick$={() => (isMonthly.value = true)}
                        >
                            Monthly
                        </span>
                        <div
                            class="flex cursor-pointer items-center"
                            onClick$={() => (isMonthly.value = !isMonthly.value)}
                        >
                            <div class="relative">
                                <div class="h-5 w-14 rounded-full bg-[#1D2144] shadow-inner"></div>
                                <div
                                    class={`${isMonthly.value ? "" : "translate-x-full"
                                        } shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-primary transition`}
                                >
                                    <span class="active h-4 w-4 rounded-full bg-white"></span>
                                </div>
                            </div>
                        </div>
                        <span
                            class={`${isMonthly.value
                                ? "text-dark dark:text-white"
                                : "pointer-events-none text-primary"
                                } ml-4 cursor-pointer text-base font-semibold`}
                            onClick$={() => (isMonthly.value = false)}
                        >
                            Yearly
                        </span>
                    </div>
                </div>
                */}

                <div class="flex flex-wrap justify-center">
                    <PricingBox
                        packageName="Lite"
                        price={isMonthly.value ? "60.000" : "700.000"}
                        duration={isMonthly.value ? "mo" : "yr"}
                        subtitle="Untuk Anda yang sudah mempunyai domain"
                    >
                        <OfferList text="Domain" status="inactive" />
                        <OfferList text="Use with Unlimited Projects" status="active" />
                        <OfferList text="Commercial Use" status="active" />
                        <OfferList text="Email Support" status="inactive" />
                        <OfferList text="Lifetime Access" status="inactive" />
                        <OfferList text="Free Lifetime Updates" status="inactive" />
                    </PricingBox>
                    <PricingBox
                        packageName="Basic"
                        price={isMonthly.value ? "90.000" : "1 jt"}
                        duration={isMonthly.value ? "mo" : "yr"}
                        subtitle="Untuk Anda yang belum mempunyai domain"
                    >
                        <OfferList text="Domain" status="active" />
                        <OfferList text="Use with Unlimited Projects" status="active" />
                        <OfferList text="Commercial Use" status="active" />
                        <OfferList text="Email Support" status="active" />
                        <OfferList text="Lifetime Access" status="inactive" />
                        <OfferList text="Free Lifetime Updates" status="inactive" />
                    </PricingBox>
                    <PricingBox
                        packageName="Plus"
                        price={isMonthly.value ? "130.000" : "1,5 jt"}
                        duration={isMonthly.value ? "mo" : "yr"}
                        subtitle="Untuk Anda yang sudah atau belum mempunyai domain + Fitur Khusus"
                    >
                        <OfferList text="Domain" status="active" />
                        <OfferList text="Use with Unlimited Projects" status="active" />
                        <OfferList text="Commercial Use" status="active" />
                        <OfferList text="Email Support" status="active" />
                        <OfferList text="Lifetime Access" status="active" />
                        <OfferList text="Free Lifetime Updates" status="active" />
                    </PricingBox>
                </div>
            </div>

            <div class="absolute bottom-0 left-0 z-[-1]">
                <svg
                    width="239"
                    height="601"
                    viewBox="0 0 239 601"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        opacity="0.3"
                        x="-184.451"
                        y="600.973"
                        width="196"
                        height="541.607"
                        rx="2"
                        transform="rotate(-128.7 -184.451 600.973)"
                        fill="url(#paint0_linear_93:235)"
                    />
                    <rect
                        opacity="0.3"
                        x="-188.201"
                        y="385.272"
                        width="59.7544"
                        height="541.607"
                        rx="2"
                        transform="rotate(-128.7 -188.201 385.272)"
                        fill="url(#paint1_linear_93:235)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_93:235"
                            x1="-90.1184"
                            y1="420.414"
                            x2="-90.1184"
                            y2="1131.65"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#4A6CF7" />
                            <stop offset="1" stop-color="#4A6CF7" stop-opacity="0" />
                        </linearGradient>
                        <linearGradient
                            id="paint1_linear_93:235"
                            x1="-159.441"
                            y1="204.714"
                            x2="-159.441"
                            y2="915.952"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#4A6CF7" />
                            <stop offset="1" stop-color="#4A6CF7" stop-opacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </section>
    );
});
