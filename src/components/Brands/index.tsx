import { component$ } from "@builder.io/qwik";
import brandsData from "./brandsData";

export default component$(() => {
    return (
        <section class="pt-16">
            <div class="container">
                <div class="-mx-4 flex flex-wrap">
                    <div class="w-full px-4">
                        <div class="flex flex-wrap items-center justify-center rounded-sm bg-gray-light px-8 py-8 dark:bg-gray-dark sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]">
                            {brandsData.map((brand) => (
                                <div
                                    key={brand.id}
                                    class="flex w-1/2 items-center justify-center px-3 py-[15px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
                                >
                                    <a
                                        href={brand.href}
                                        target="_blank"
                                        rel="nofollow noreferrer"
                                        class="relative h-10 w-full opacity-70 transition hover:opacity-100 dark:opacity-60 dark:hover:opacity-100"
                                    >
                                        <img
                                            src={brand.image}
                                            alt={brand.name}
                                            class="block h-full w-full object-contain dark:hidden"
                                        />
                                        <img
                                            src={brand.imageLight}
                                            alt={brand.name}
                                            class="hidden h-full w-full object-contain dark:block"
                                        />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});
