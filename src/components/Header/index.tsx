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
    const searchOpen = useSignal(false);
    const location = useLocation();
    const session = useSession();

    // On non-home pages (e.g. /signin) the header should always be solid
    // since there is no dark hero section behind it.
    const isHome = location.url.pathname === "/";
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
                class={`header top-0 left-0 z-40 flex w-full items-center ${
                    sticky.value || !isHome
                        ? "dark:bg-gray-dark dark:shadow-sticky-dark shadow-sticky fixed z-[9999] bg-white/80 backdrop-blur-sm transition"
                        : "absolute bg-transparent"
                    }`}
            >
                <div class="container">
                    <div class="relative -mx-4 flex items-center justify-between">
                        <div class="max-w-full px-4 xl:mr-12">
                            <a
                                href="/"
                                class={`header-logo flex items-center gap-2 ${sticky.value || !isHome ? "py-5 lg:py-2" : "py-8"} `}
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
                                <span class={`text-xl font-bold transition-colors duration-300 ${sticky.value || !isHome ? "text-dark dark:text-white" : "text-white"}`}> Authbox</span>
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
                                                            : sticky.value || !isHome
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
                            <div class="flex items-center justify-end gap-3 pr-16 lg:pr-0">
                                {/* Search icon — always visible */}
                                <button
                                    onClick$={() => searchOpen.value = true}
                                    class={`flex h-8 w-8 items-center justify-center rounded-md border transition ${
                                        sticky.value || !isHome
                                            ? 'border-stroke text-body-color hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-6 dark:hover:border-primary dark:hover:text-primary'
                                            : 'border-white/20 text-white/70 hover:border-white/40 hover:text-white'
                                    }`}
                                    title="Search (⌘K)"
                                >
                                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>

                                {session.value?.user ? (
                                    <div class="flex items-center gap-3">
                                        <a
                                            href="/dashboard"
                                            class="hidden items-center gap-1.5 rounded-md border border-amber-400 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700 shadow-sm transition hover:bg-amber-100 dark:border-amber-600 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/40 md:inline-flex"
                                        >
                                            <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            Go Premium
                                        </a>

                                        {/* User avatar + name */}
                                        <div class="flex items-center gap-2.5">
                                            {session.value.user.image ? (
                                                <img
                                                    src={session.value.user.image}
                                                    alt={session.value.user.name || "User"}
                                                    class="h-8 w-8 rounded-full ring-2 ring-stroke dark:ring-dark-3"
                                                />
                                            ) : (
                                                <div class={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                                                    sticky.value || !isHome
                                                        ? 'bg-primary/10 text-primary dark:bg-primary/20'
                                                        : 'bg-white/20 text-white'
                                                }`}>
                                                    {(session.value.user.name || 'U').charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <span class={`hidden text-sm font-medium md:block transition-colors duration-300 ${sticky.value || !isHome ? "text-dark dark:text-white" : "text-white"}`}>
                                                {session.value.user.name}
                                            </span>
                                        </div>

                                        {/* Logout icon button */}
                                        <button
                                            onClick$={() => signOut.submit({ redirectTo: '/' })}
                                            class={`flex h-8 w-8 items-center justify-center rounded-md border transition ${
                                                sticky.value || !isHome
                                                    ? 'border-stroke text-body-color hover:border-red-300 hover:text-red-500 dark:border-dark-3 dark:text-dark-6 dark:hover:border-red-500 dark:hover:text-red-400'
                                                    : 'border-white/20 text-white/70 hover:border-red-300 hover:text-red-400'
                                            }`}
                                            title="Sign Out"
                                        >
                                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <div class="flex items-center gap-3">
                                        {/* Guest avatar */}
                                        <div class={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                                            sticky.value || !isHome
                                                ? 'bg-gray-100 text-body-color dark:bg-dark-3 dark:text-dark-6'
                                                : 'bg-white/20 text-white'
                                        }`}>
                                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <a
                                            href="/signin"
                                            class="ease-in-up shadow-btn hover:shadow-btn-hover bg-primary hover:bg-primary/90 rounded-md px-5 py-2 text-sm font-medium text-white transition duration-300"
                                        >
                                            Login
                                        </a>
                                    </div>
                                )}
                                <div class={`pl-2 transition-colors duration-300 ${sticky.value || !isHome ? "text-dark dark:text-white" : "text-white"}`}>
                                    <ThemeToggler />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>

            {/* ─── Search Modal ─── */}
            {searchOpen.value && (
                <div
                    class="fixed inset-0 z-[99999] flex items-start justify-center bg-black/50 px-4 pt-24 backdrop-blur-sm"
                    onClick$={(e) => { if (e.target === e.currentTarget) searchOpen.value = false; }}
                >
                    <div class="w-full max-w-lg overflow-hidden rounded-2xl border border-stroke bg-white shadow-2xl dark:border-dark-3 dark:bg-dark-2">
                        {/* Search input */}
                        <div class="flex items-center gap-3 border-b border-stroke px-5 dark:border-dark-3">
                            <svg class="h-5 w-5 shrink-0 text-body-color/50 dark:text-dark-6/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search sites, templates, domains..."
                                autoFocus
                                class="w-full bg-transparent py-4 text-sm text-dark outline-none placeholder:text-body-color/50 dark:text-white dark:placeholder:text-dark-6/50"
                            />
                            <button
                                onClick$={() => searchOpen.value = false}
                                class="shrink-0 rounded-md border border-stroke px-2 py-1 text-[10px] font-medium text-body-color transition hover:bg-gray-50 dark:border-dark-3 dark:text-dark-6 dark:hover:bg-dark-3"
                            >
                                ESC
                            </button>
                        </div>
                        {/* Quick links */}
                        <div class="p-4">
                            <p class="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-body-color/50 dark:text-dark-6/50">Quick Links</p>
                            <a href="/dashboard" class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-body-color transition hover:bg-gray-50 dark:text-dark-6 dark:hover:bg-dark-3">
                                <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" /></svg>
                                My Sites
                            </a>
                            <a href="/templates" class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-body-color transition hover:bg-gray-50 dark:text-dark-6 dark:hover:bg-dark-3">
                                <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" /></svg>
                                Browse Templates
                            </a>
                            <a href="/create-subdomain" class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-body-color transition hover:bg-gray-50 dark:text-dark-6 dark:hover:bg-dark-3">
                                <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
                                Create New Site
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});
