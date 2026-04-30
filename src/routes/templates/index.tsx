import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
    // Array of mock templates for selection
    const templates = [
        { id: 'template-1', name: 'Startup Business', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop' },
        { id: 'template-2', name: 'E-Commerce', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&fit=crop' },
        { id: 'template-3', name: 'Agency Landing', imageUrl: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80&fit=crop' },
        { id: 'template-4', name: 'Personal Blog', imageUrl: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&q=80&fit=crop' },
        { id: 'template-5', name: 'Saas App', imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80&fit=crop' },
    ];

    // Signal to store user's selected template
    const selectedTemplate = useSignal<string | null>(null);

    return (
        <section class="relative bg-white px-4 py-24 dark:bg-dark sm:py-32">
            {/* Subtle background gradient that respects dark/light mode */}
            <div
                class="pointer-events-none absolute inset-0 -z-10"
                style="background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%);"
            />

            <div class="container mx-auto">
                <div class="flex justify-center border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
                    {/* Card (Matching 'Welcome Back' sign-in card exactly) */}
                    <div class="w-full overflow-hidden rounded-2xl border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-dark-2">

                        {/* Card header strip (Toolbar) */}
                        <div
                            class="flex flex-col justify-between border-b border-stroke px-6 py-6 dark:border-dark-3 sm:flex-row sm:items-center sm:px-8"
                            style="background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.05) 100%);"
                        >
                            <div class="flex items-center gap-4">
                                <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-md dark:bg-dark-3">
                                    <svg class="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </div>
                                <div class="text-left">
                                    <h1 class="text-2xl font-bold tracking-tight text-dark dark:text-white">
                                        Select a Template
                                    </h1>
                                    <p class="mt-1 text-sm text-body-color dark:text-dark-6">
                                        Choose a starting point for your new website
                                    </p>
                                </div>
                            </div>
                            
                            <div class="mt-6 flex items-center gap-4 self-end sm:mt-0 sm:self-auto">
                                <p class="hidden text-sm font-medium text-body-color dark:text-dark-6 sm:block">
                                    {selectedTemplate.value ? '1 selected' : 'No selection'}
                                </p>
                                <a href="/create-subdomain">
                                    <button
                                        disabled={!selectedTemplate.value}
                                        class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-center text-sm font-medium text-white shadow-sm transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50 dark:disabled:bg-dark-3"
                                    >
                                        Next Step
                                        <svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </a>
                            </div>
                        </div>

                        {/* Card body */}
                        <div class="px-6 py-6 sm:px-8 sm:py-8">
                            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                                {templates.map((tpl) => {
                                    const isSelected = selectedTemplate.value === tpl.id;
                                    return (
                                        <div
                                            key={tpl.id}
                                            onClick$={() => selectedTemplate.value = tpl.id}
                                            class={`group cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-300 ${isSelected
                                                ? 'border-primary shadow-md ring-2 ring-primary ring-opacity-20 scale-[1.02]'
                                                : 'border-stroke hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg dark:border-dark-3 dark:hover:border-primary/50'
                                                }`}
                                        >
                                            {/* Thumbnail Preview */}
                                            <div class="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-gray-50 dark:bg-dark-3">
                                                <img
                                                    src={tpl.imageUrl}
                                                    alt={tpl.name}
                                                    loading="lazy"
                                                    width={800}
                                                    height={600}
                                                    class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                />
                                                {/* Overlay effect to simulate interactive area */}
                                                <div class="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5 dark:group-hover:bg-white/5" />
                                            </div>

                                            {/* Template Info */}
                                            <div class="border-t border-stroke p-3 dark:border-dark-3 bg-white dark:bg-dark-2">
                                                <div class="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left sm:justify-between">
                                                    <h3 class="text-xs font-medium text-dark dark:text-white leading-tight">
                                                        {tpl.name}
                                                    </h3>
                                                    {/* Radio check icon for selection */}
                                                    <div class={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${isSelected ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-transparent dark:border-gray-600'}`}>
                                                        {isSelected && (
                                                            <svg class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});
