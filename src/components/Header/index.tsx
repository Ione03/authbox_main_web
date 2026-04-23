import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { useSession, useSignOut } from "~/routes/plugin@auth";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { scrollToSection } from "~/utils/scroll";

export default component$(() => {
    const navbarOpen = useSignal(false);
    const sticky = useSignal(false);
    const openIndex = useSignal(-1);
    const location = useLocation();
    const session = useSession();
    const signOut = useSignOut();

    useVisibleTask$(() => {
        const handleStickyNavbar = () => {
            if (window.scrollY >= 80) {
                sticky.value = true;
            } else {
                sticky.value = false;
            }
        };
        window.addEventListener("scroll", handleStickyNavbar);
        return () => window.removeEventListener("scroll", handleStickyNavbar);
    });

    return (
        <>
            <header
                class={`header top-0 left-0 z-40 flex w-full items-center ${sticky.value
                    ? "dark:bg-gray-dark dark:shadow-sticky-dark shadow-sticky fixed z-[9999] bg-white/80 backdrop-blur-sm transition"
                    : "absolute bg-transparent"
                    }`}
            >
                <div class="container">
                    <div class="relative -mx-4 flex items-center justify-between">
                        <div class="max-w-full px-4 xl:mr-12">
                            <a
                                href="/"
                                class={`header-logo flex items-center gap-2 ${sticky.value ? "py-5 lg:py-2" : "py-8"} `}
                            >
                                <img
                                    src="/static/dist-startup-nextjs/images/logo/logo.png"
                                    alt="logo"
                                    width={32}
                                    height={32}
                                    class="h-8 w-8 object-contain dark:hidden"
                                />
                                <img
                                    src="/static/dist-startup-nextjs/images/logo/logo.png"
                                    alt="logo"
                                    width={32}
                                    height={32}
                                    class="hidden h-8 w-8 object-contain dark:block"
                                />
                                <span class={`text-xl font-bold transition-colors duration-300 ${sticky.value ? "text-dark dark:text-white" : "text-white"}`}> Authbox</span>
                            </a>
                        </div>
                        <div class="flex w-full items-center justify-between px-4">
                            <div>
                                <button
                                    onClick$={() => (navbarOpen.value = !navbarOpen.value)}
                                    id="navbarToggler"
                                    aria-label="Mobile Menu"
                                    class="ring-primary absolute top-1/2 right-4 block translate-y-[-50%] rounded-lg px-3 py-[6px] focus:ring-2 lg:hidden"
                                >
                                    <span
                                        class={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen.value ? "top-[7px] rotate-45" : " "
                                            }`}
                                    />
                                    <span
                                        class={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen.value ? "opacity-0" : " "
                                            }`}
                                    />
                                    <span
                                        class={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen.value ? "top-[-8px] -rotate-45" : " "
                                            }`}
                                    />
                                </button>
                                <nav
                                    id="navbarCollapse"
                                    class={`navbar border-body-color/50 dark:border-body-color/20 dark:bg-dark absolute right-0 z-30 w-[250px] rounded border-[.5px] bg-white px-6 py-4 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${navbarOpen.value
                                        ? "visibility top-full opacity-100"
                                        : "invisible top-[120%] opacity-0"
                                        }`}
                                >
                                    <ul class="block lg:flex lg:space-x-12">
                                        {menuData.map((menuItem, index) => (
                                            <li key={menuItem.id} class="group relative">
                                                {menuItem.path ? (
                                                    <a
                                                        href={menuItem.path}
                                                        onClick$={$(async (event) => {
                                                            if (menuItem.path?.startsWith("/#") && location.url.pathname === "/") {
                                                                event.preventDefault();
                                                                const sectionId = menuItem.path.split("#")[1];
                                                                const scrollHandler = scrollToSection(sectionId);
                                                                await scrollHandler();
                                                                navbarOpen.value = false;
                                                            }
                                                        })}
                                                        class={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 transition-colors duration-300 ${location.url.pathname === menuItem.path
                                                            ? "text-primary dark:text-white"
                                                            : sticky.value
                                                                ? "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                                                                : "text-white hover:text-primary/80"
                                                            }`}
                                                    >
                                                        {menuItem.title}
                                                    </a>
                                                ) : (
                                                    <>
                                                        <p
                                                            onClick$={() =>
                                                            (openIndex.value =
                                                                openIndex.value === index ? -1 : index)
                                                            }
                                                            class="text-dark group-hover:text-primary flex cursor-pointer items-center justify-between py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 dark:text-white/70 dark:group-hover:text-white"
                                                        >
                                                            {menuItem.title}
                                                            <span class="pl-3">
                                                                <svg width="25" height="24" viewBox="0 0 25 24">
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        clip-rule="evenodd"
                                                                        d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </p>
                                                        <div
                                                            class={`submenu dark:bg-dark relative top-full left-0 rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${openIndex.value === index ? "block" : "hidden"
                                                                }`}
                                                        >
                                                            {menuItem.submenu?.map((submenuItem) => (
                                                                <a
                                                                    href={submenuItem.path}
                                                                    key={submenuItem.id}
                                                                    class="text-dark hover:text-primary block rounded-sm py-2.5 text-sm lg:px-3 dark:text-white/70 dark:hover:text-white"
                                                                >
                                                                    {submenuItem.title}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                            <div class="flex items-center justify-end pr-16 lg:pr-0">
                                {session.value?.user ? (
                                    <div class="flex items-center gap-4">
                                        <span class={`hidden text-sm font-medium md:block transition-colors duration-300 ${sticky.value ? "text-dark dark:text-white" : "text-white"}`}>
                                            {session.value.user.name}
                                        </span>
                                        {session.value.user.image && (
                                            <img
                                                src={session.value.user.image}
                                                alt={session.value.user.name || "User"}
                                                class="h-10 w-10 rounded-full"
                                            />
                                        )}
                                        <button
                                            onClick$={() => signOut.submit({ redirectTo: '/' })}
                                            class="ease-in-up shadow-btn hover:shadow-btn-hover bg-primary hover:bg-primary/90 rounded-md px-6 py-2 text-base font-medium text-white transition duration-300 md:px-8 lg:px-6 xl:px-8"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <a
                                            href="/signin"
                                            class={`hidden px-7 py-3 text-base font-medium hover:opacity-70 md:block transition-colors duration-300 ${sticky.value ? "text-dark dark:text-white" : "text-white"}`}
                                        >
                                            Sign In
                                        </a>
                                        <a
                                            href="/signin"
                                            class="ease-in-up shadow-btn hover:shadow-btn-hover bg-primary hover:bg-primary/90 hidden rounded-md px-8 py-3 text-base font-medium text-white transition duration-300 md:block md:px-9 lg:px-6 xl:px-9"
                                        >
                                            Sign Up
                                        </a>
                                    </>
                                )}
                                <div class={`pl-4 transition-colors duration-300 ${sticky.value ? "text-dark dark:text-white" : "text-white"}`}>
                                    <ThemeToggler />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>
        </>
    );
});
