import { Feature } from "~/types/feature";
import { component$ } from "@builder.io/qwik";

const featuresData: Feature[] = [
    {
        id: 1,
        icon: (
            <svg width="40" height="41" viewBox="0 0 40 41" class="fill-current">
                <path
                    opacity="0.5"
                    d="M37.7778 40.2223H24C22.8954 40.2223 22 39.3268 22 38.2223V20.0001C22 18.8955 22.8954 18.0001 24 18.0001H37.7778C38.8823 18.0001 39.7778 18.8955 39.7778 20.0001V38.2223C39.7778 39.3268 38.8823 40.2223 37.7778 40.2223Z"
                />
                <path d="M23.2222 0C22.6699 0 22.2222 0.447715 22.2222 1V12.3333C22.2222 12.8856 22.6699 13.3333 23.2222 13.3333H39C39.5523 13.3333 40 12.8856 40 12.3333V1C40 0.447715 39.5523 0 39 0H23.2222Z" />
                <path d="M0 28.8889C0 28.3366 0.447715 27.8889 1 27.8889H16.7778C17.3301 27.8889 17.7778 28.3366 17.7778 28.8889V40.2222C17.7778 40.7745 17.3301 41.2222 16.7778 41.2222H1C0.447715 41.2222 0 40.7745 0 40.2222V28.8889Z" />
                <path
                    opacity="0.5"
                    d="M0 1C0 0.447715 0.447715 0 1 0H16.7778C17.3301 0 17.7778 0.447715 17.7778 1V23.2222C17.7778 23.7745 17.3301 24.2222 16.7778 24.2222H1C0.447715 24.2222 0 23.7745 0 23.2222V1Z"
                />
            </svg>
        ),
        title: "Crafted for Startup",
        paragraph:
            "Tuumzz comes with everything you need to build an outstanding website for your startup or SaaS business.",
    },
    {
        id: 2,
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" class="fill-current">
                <path
                    opacity="0.5"
                    d="M20.5914 34.2584C20.2394 34.5172 19.7603 34.5172 19.4083 34.2584L0.737902 20.5188C-0.188493 19.8372 0.295848 18.3333 1.45194 18.3333H7.50002V1.66667C7.50002 0.746192 8.24621 0 9.16669 0H30.8334C31.7538 0 32.5 0.746192 32.5 1.66667V18.3333H38.5478C39.7039 18.3333 40.1882 19.8372 39.2618 20.5188L20.5914 34.2584Z"
                />
                <path d="M23.3334 40C23.3334 38.1591 21.841 16.6667 20 16.6667C18.159 16.6667 16.6667 38.1591 16.6667 40H23.3334Z" />
            </svg>
        ),
        title: "High-quality Design",
        paragraph:
            "Our templates are designed with the highest quality in mind, ensuring that your website looks professional.",
    },
    {
        id: 3,
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" class="fill-current">
                <path
                    opacity="0.5"
                    d="M20 30C22.75 30 25 32.25 25 35C25 37.75 22.75 40 20 40C17.25 40 15 37.75 15 35C15 32.25 17.25 30 20 30ZM35 30C37.75 30 40 32.25 40 35C40 37.75 37.75 40 35 40C32.25 40 30 37.75 30 35C30 32.25 32.25 30 35 30ZM35 15C37.75 15 40 17.25 40 20C40 22.75 37.75 25 35 25C32.25 25 30 22.75 30 20C30 17.25 32.25 15 35 15Z"
                />
                <path d="M20 15C22.75 15 25 17.25 25 20C25 22.75 22.75 25 20 25C17.25 25 15 22.75 15 20C15 17.25 17.25 15 20 15ZM20 0C22.75 0 25 2.25 25 5C25 7.75 22.75 10 20 10C17.25 10 15 7.75 15 5C15 2.25 17.25 0 20 0ZM5 30C7.75 30 10 32.25 10 35C10 37.75 7.75 40 5 40C2.25 40 0 37.75 0 35C0 32.25 2.25 30 5 30ZM5 15C7.75 15 10 17.25 10 20C10 22.75 7.75 25 5 25C2.25 25 0 22.75 0 20C0 17.25 2.25 15 5 15ZM5 0C7.75 0 10 2.25 10 5C10 7.75 7.75 10 5 10C2.25 10 0 7.75 0 5C0 2.25 2.25 0 5 0ZM35 0C37.75 0 40 2.25 40 5C40 7.75 37.75 10 35 10C32.25 10 30 7.75 30 5C30 2.25 32.25 0 35 0Z" />
            </svg>
        ),
        title: "All Essential Sections",
        paragraph:
            "All the essential sections for a startup or SaaS website are included in this template.",
    },
    {
        id: 4,
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" class="fill-current">
                <path
                    opacity="0.5"
                    d="M20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0ZM16.25 15C16.25 14.3096 16.8096 13.75 17.5 13.75H22.5C23.1904 13.75 23.75 14.3096 23.75 15V17.5H16.25V15ZM25 18.75V25C25 25.6904 24.4404 26.25 23.75 26.25H17.5C16.8096 26.25 16.25 25.6904 16.25 25V18.75H25Z"
                />
                <path d="M20 12.5C18.6193 12.5 17.5 13.6193 17.5 15V15.625V16.25H22.5V15.625V15C22.5 13.6193 21.3807 12.5 20 12.5Z" />
            </svg>
        ),
        title: "Speed Optimized",
        paragraph:
            "We ensure to provide the best performance so that your website loads faster.",
    },
    {
        id: 5,
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" class="fill-current">
                <path
                    opacity="0.5"
                    d="M15.8333 6.66667V8.33333L19.1667 8.33333V6.66667H20.8333V8.33333H25C25.442 8.33333 25.8659 8.50893 26.1785 8.82149C26.4911 9.13405 26.6667 9.55797 26.6667 10V8.33333L30 8.33333V6.66667C30 5.74619 29.6488 4.86301 29.0237 4.21134C28.3986 3.55968 27.5507 3.1746 26.6333 3.12833L26.3333 3.12333V3.33333L26.6667 3.33333C27.5871 3.33333 28.3333 4.07952 28.3333 5V6.66667H26.6667V5C26.6667 4.07952 25.9205 3.33333 25 3.33333H15C14.0795 3.33333 13.3333 4.07952 13.3333 5V6.66667H11.6667V5C11.6667 4.07952 10.9205 3.33333 10 3.33333H3.33333C2.41286 3.33333 1.66667 4.07952 1.66667 5V6.66667H0V8.33333L3.33333 8.33333V10C3.33333 9.55797 3.50893 9.13405 3.82149 8.82149C4.13405 8.50893 4.55797 8.33333 5 8.33333H10V6.66667H11.6667V8.33333L15 8.33333V6.66667H15.8333Z"
                />
                <path d="M38.3333 6.66667C39.2538 6.66667 40 7.41286 40 8.33333V35C40 35.9205 39.2538 36.6667 38.3333 36.6667H1.66667C0.746192 36.6667 0 35.9205 0 35V8.33333C0 7.41286 0.746192 6.66667 1.66667 6.66667H38.3333ZM5 11.6667C3.61929 11.6667 2.5 12.786 2.5 14.1667V18.3333C2.5 19.714 3.61929 20.8333 5 20.8333H15C16.3807 20.8333 17.5 19.714 17.5 18.3333V14.1667C17.5 12.786 16.3807 11.6667 15 11.6667H5Z" />
            </svg>
        ),
        title: "Fully Customizable",
        paragraph:
            "Our templates can be easily customized, allowing you to change the look and feel of your website.",
    },
    {
        id: 6,
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" class="fill-current">
                <path
                    opacity="0.5"
                    d="M11.25 7.5C11.25 7.5 10.8333 6.25 10.8333 5C10.8333 3.75 10.8333 2.5 12.0833 1.25C13.3333 0 14.5833 0 15.8333 0C17.0833 0 18.3333 0 19.5833 1.25C20.8333 2.5 20.8333 3.75 20.8333 5C20.8333 6.25 20.4167 7.5 20.4167 7.5H27.5V13.75C28.75 13.75 30 14.1667 31.25 14.1667C32.5 14.1667 33.75 14.1667 35 12.9167C36.25 11.6667 36.25 10.4167 36.25 9.16667C36.25 7.91667 36.25 6.66667 35 5.41667C33.75 4.16667 32.5 4.16667 31.25 4.16667C30 4.16667 28.75 4.58333 27.5 4.58333V0H34.1667C37.3883 0 40 2.61167 40 5.83333V34.1667C40 37.3883 37.3883 40 34.1667 40H5.83333C2.61167 40 0 37.3883 0 34.1667V5.83333C0 2.61167 2.61167 0 5.83333 0H11.25V7.5Z"
                />
                <path d="M5.83331 22.5H13.3333V30H5.83331V22.5ZM26.6666 22.5H34.1666V30H26.6666V22.5ZM16.25 22.5H23.75V30H16.25V22.5Z" />
            </svg>
        ),
        title: "Regular Updates",
        paragraph:
            "We provide regular updates to our templates to ensure that they are always up to date.",
    },
];

export default featuresData;

export const SingleFeature = component$<{ feature: Feature }>(({ feature }) => {
    const { icon, title, paragraph } = feature;
    return (
        <div class="w-full">
            <div class="wow fadeInUp" data-wow-delay=".15s">
                <div class="mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                    {icon}
                </div>
                <h3 class="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    {title}
                </h3>
                <p class="pr-[10px] text-base font-medium leading-relaxed text-body-color">
                    {paragraph}
                </p>
            </div>
        </div>
    );
});
