import { component$ } from "@builder.io/qwik";
import SectionTitle from "../Common/SectionTitle";

const checkIcon = (
    <svg width="16" height="13" viewBox="0 0 16 13" class="fill-current">
        <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.225254 13.8921 0.224999 14.0877 0.420306L15.7384 2.07101C15.9339 2.26654 15.9341 2.58353 15.7388 2.77926L5.8535 12.6631Z" />
    </svg>
);

export const AboutSectionOne = component$(() => {
    const list = [
        "Premium Quality",
        "Tailwind CSS",
        "Django Backend",
        "Qwik Tekonologi",
        "Rest API Data",
        "User Friendly",
    ];

    return (
        <section id="about" class="bg-white dark:bg-gray-dark pt-16 md:pt-20 lg:pt-28">
            <div class="container">
                <div class="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
                    <div class="-mx-4 flex flex-wrap items-center">
                        <div class="w-full px-4 lg:w-1/2">
                            <SectionTitle
                                title="Update Instan, Tanpa Belajar Teknis"
                                paragraph="Ketinggalan zaman karena tidak bisa update website sendiri? Sekarang bisa! Teknologi kami memungkinkan Anda mengubah apapun langsung dari tampilan website. Tidak ada proses teknis, tidak ada yang harus dipelajari. Langsung praktik, langsung bisa."
                                mb="44px"
                            />

                            <div
                                class="mb-12 max-w-[570px] lg:mb-0"
                                data-wow-delay=".15s"
                            >
                                <div class="mx-[-12px] flex flex-wrap">
                                    {list.map((text, i) => (
                                        <div key={i} class="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                                            <div class="mb-5 flex items-center">
                                                <span class="mr-4 flex h-[30px] w-full max-w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                                                    {checkIcon}
                                                </span>
                                                <p class="text-lg font-medium text-body-color dark:text-body-color-dark">{text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div class="w-full px-4 lg:w-1/2">
                            <div class="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0">
                                <img
                                    src="/images/about/about_gif1.gif"
                                    alt="about-image"
                                    class="mx-auto max-w-full drop-shadow-three lg:mr-0"
                                />

                                {/* <img
                                    src="/images/about/about-image.svg"
                                    alt="about-image"
                                    class="mx-auto max-w-full drop-shadow-three dark:hidden dark:drop-shadow-none lg:mr-0"
                                />
                                <img
                                    src="/images/about/about-image-dark.svg"
                                    alt="about-image"
                                    class="mx-auto hidden max-w-full drop-shadow-three dark:block dark:drop-shadow-none lg:mr-0"
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export const AboutSectionTwo = component$(() => {
    return (
        <section class="bg-white dark:bg-gray-dark py-16 md:py-20 lg:py-28">
            <div class="container">
                <div class="-mx-4 flex flex-wrap items-center">
                    <div class="w-full px-4 lg:w-1/2">
                        <div
                            class="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
                            data-wow-delay=".15s"
                        >
                            <img
                                src="/images/about/about_gif2.gif"
                                alt="about image"
                                class="drop-shadow-three"
                            />

                            {/* <img
                                src="/images/about/about-image-2.svg"
                                alt="about image"
                                class="drop-shadow-three dark:hidden dark:drop-shadow-none"
                            />
                            <img
                                src="/images/about/about-image-2-dark.svg"
                                alt="about image"
                                class="hidden drop-shadow-three dark:block dark:drop-shadow-none"
                            /> */}
                        </div>
                    </div>
                    <div class="w-full px-4 lg:w-1/2">
                        <div class="max-w-[470px]">
                            <div class="mb-9">
                                <h3 class="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                                    Text + Image
                                </h3>
                                <p class="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg sm:leading-relaxed">
                                    Upload posting beserta gambar, tinggal klik tombol create content, lookup form tempat mulai menulis content baru.
                                </p>
                            </div>
                            <div class="mb-9">
                                <h3 class="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                                    Text Only
                                </h3>
                                <p class="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg sm:leading-relaxed">
                                    Untuk menulis tanpa ada gambar, caranya sama dengan text + image, tanpa pilihan untuk upload gambar.
                                </p>
                            </div>
                            <div class="mb-1">
                                <h3 class="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                                    Video
                                </h3>
                                <p class="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg sm:leading-relaxed">
                                    Posting tulisan beserta video yang sudah di uplaod ke channel youtube, tinggal copy url, paste di form lookup yang muncul.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default AboutSectionOne;
