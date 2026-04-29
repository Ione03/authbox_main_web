import { component$, useSignal } from "@builder.io/qwik";
import SectionTitle from "../Common/SectionTitle";
import ImgVideo from '~/media/images/video/video.jpg?jsx';

export default component$(() => {
    const isOpen = useSignal(false);

    return (
        <section class="relative z-10 py-16 md:py-20 lg:py-28">
            <div class="container">
                <SectionTitle
                    title="We are ready to help"
                    paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
                    center
                    mb="80px"
                />

                <div class="-mx-4 flex flex-wrap">
                    <div class="w-full px-4">
                        <div
                            class="mx-auto max-w-[770px] overflow-hidden rounded-md"
                            data-wow-delay=".15s"
                        >
                            <div class="relative aspect-[77/40] items-center justify-center">
                                <ImgVideo
                                    alt="video image"
                                    class="h-full w-full object-cover object-center"
                                />
                                <div class="absolute right-0 top-0 flex h-full w-full items-center justify-center">
                                    <button
                                        aria-label="video play button"
                                        onClick$={() => (isOpen.value = true)}
                                        class="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white bg-opacity-75 text-primary transition hover:bg-opacity-100"
                                    >
                                        <svg
                                            width="16"
                                            height="18"
                                            viewBox="0 0 16 18"
                                            class="fill-current"
                                        >
                                            <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86603L1.25 18.0933C0.583333 18.4782 -8.56026e-07 18.0005 -8.56026e-07 17.2272V0.772759C-8.56026e-07 -0.000478916 0.583333 -0.478248 1.25 -0.0933418L15.5 8.13397Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {isOpen.value && (
                <div
                    class="fixed left-0 top-0 z-[99999] flex h-screen w-screen items-center justify-center bg-black/70"
                    onClick$={() => (isOpen.value = false)}
                >
                    <div
                        class="relative w-full max-w-[800px]"
                        onClick$={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick$={() => (isOpen.value = false)}
                            class="absolute -right-4 -top-4 z-[9999] flex h-10 w-10 items-center justify-center rounded-full bg-white text-dark"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" class="fill-current">
                                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" />
                            </svg>
                        </button>
                        <div class="aspect-video">
                            <iframe
                                class="h-full w-full"
                                src="https://www.youtube.com/embed/L61p2uyiMSo"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullscreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

            <div class="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
        </section>
    );
});
