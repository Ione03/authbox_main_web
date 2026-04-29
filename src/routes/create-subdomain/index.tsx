import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
    // Generates an 8-character long hexadecimal string at component setup (runs during SSR
    // and is serialized to the client, so no useVisibleTask$ / hydration mismatch).
    const initialSubdomain = Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');
    // Stores the randomly generated hex string
    const subdomain = useSignal<string>(initialSubdomain);
    // Tracks whether the user is choosing the Premium custom domain
    const useCustomDomain = useSignal<boolean>(false);
    // Stores the user's custom domain input
    const customDomain = useSignal<string>('');

    return (
        <section class="relative bg-white px-4 py-24 dark:bg-dark sm:py-32">
            {/* Subtle background gradient that respects dark/light mode */}
            <div
                class="pointer-events-none absolute inset-0 -z-10"
                style="background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%);"
            />

            <div class="container mx-auto">
                <div class="flex justify-center border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
                    {/* Card (Matching exact signin design footprint) */}
                    <div class="w-full max-w-md overflow-hidden rounded-2xl border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-dark-2">

                        {/* Card header strip */}
                        <div
                            class="px-8 py-8 text-center"
                            style="background: linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.08) 100%);"
                        >
                            <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md dark:bg-dark-3">
                                {/* Globe / Link icon */}
                                <svg class="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                            <h1 class="text-2xl font-bold tracking-tight text-dark dark:text-dark">
                                Platform Domain
                            </h1>
                            <p class="mt-1 text-sm text-body-color dark:text-dark-6">
                                Where will your app be hosted?
                            </p>
                        </div>

                        {/* Card body */}
                        <div class="px-8 py-8">
                            <div class="space-y-6">
                                
                                {/* Free Subdomain Option */}
                                <div 
                                    class={`cursor-pointer rounded-xl border-2 p-5 transition-all ${
                                        !useCustomDomain.value 
                                            ? 'border-primary bg-primary/5 dark:bg-primary/10 ring-2 ring-primary ring-opacity-20' 
                                            : 'border-stroke hover:border-primary/50 dark:border-dark-3'
                                    }`}
                                    onClick$={() => useCustomDomain.value = false}
                                >
                                    <div class="flex items-center justify-between mb-3">
                                        <h3 class="font-semibold text-dark dark:text-white">Generated Subdomain</h3>
                                        <div class={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${!useCustomDomain.value ? 'border-primary bg-primary text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                            {!useCustomDomain.value && (
                                                <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div class={`flex items-center overflow-hidden rounded-md border bg-white dark:bg-dark-2 transition-colors ${!useCustomDomain.value ? 'border-primary border-opacity-50 dark:border-primary dark:border-opacity-50' : 'border-stroke dark:border-dark-3'}`}>
                                        <input 
                                            type="text" 
                                            disabled={useCustomDomain.value}
                                            value={subdomain.value} 
                                            onInput$={(e) => subdomain.value = (e.target as HTMLInputElement).value}
                                            class="w-full bg-transparent px-4 py-2.5 text-sm text-dark outline-none dark:text-white disabled:opacity-50" 
                                            placeholder="8-digit hex"
                                        />
                                        <span class="border-l border-stroke bg-gray-50 px-4 py-2.5 text-sm font-medium text-body-color dark:border-dark-3 dark:bg-dark-3 disabled:opacity-50">
                                            .authbox.app
                                        </span>
                                    </div>
                                    {!useCustomDomain.value && (
                                        <p class="mt-2 text-[11px] text-body-color dark:text-dark-6">
                                            This temporary URL can be used immediately for testing.
                                        </p>
                                    )}
                                </div>

                                {/* Custom Domain Option (Premium) */}
                                <div 
                                    class={`cursor-pointer rounded-xl border-2 p-5 transition-all ${
                                        useCustomDomain.value 
                                            ? 'border-primary bg-primary/5 dark:bg-primary/10 ring-2 ring-primary ring-opacity-20' 
                                            : 'border-stroke hover:border-primary/50 dark:border-dark-3'
                                    }`}
                                    onClick$={() => useCustomDomain.value = true}
                                >
                                    <div class="flex items-center justify-between mb-3">
                                        <div class="flex items-center gap-2">
                                            <h3 class="font-semibold text-dark dark:text-white">Custom Domain</h3>
                                            <span class="flex items-center gap-1 rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-600 shadow-sm dark:bg-amber-900/30 dark:text-amber-500">
                                                {/* Premium Star Icon */}
                                                <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                PRO
                                            </span>
                                        </div>
                                        <div class={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${useCustomDomain.value ? 'border-primary bg-primary text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                            {useCustomDomain.value && (
                                                <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>

                                    {useCustomDomain.value && (
                                        <div class="mt-4 animate-[fadeIn_0.3s_ease-out]">
                                            <input 
                                                type="text" 
                                                value={customDomain.value}
                                                onInput$={(e) => customDomain.value = (e.target as HTMLInputElement).value}
                                                class="w-full rounded-md border border-stroke bg-white px-4 py-2.5 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary" 
                                                placeholder="e.g. www.yourcompany.com"
                                            />
                                            <p class="mt-2 text-[11px] text-amber-600 dark:text-amber-500">
                                                Requires DNS verification in the next step.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <a href="/dashboard">
                                    <button
                                        class="mt-8 flex w-full items-center justify-center rounded-md bg-primary px-8 py-3.5 text-center text-base font-medium text-white shadow-md transition hover:bg-opacity-90"
                                    >
                                        Complete Setup
                                        <svg class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </button>
                                </a>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});
