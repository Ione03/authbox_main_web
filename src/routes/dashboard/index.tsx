import { $, component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
    // Mock data for created subdomains
    const subdomains = useSignal([
        { id: 1, subdomain: 'a3f8c1d2', template: 'Startup Business', status: 'active', isPremium: false, customDomain: null, expiresAt: null, createdAt: '2026-04-20' },
        { id: 2, subdomain: 'b7e2f490', template: 'E-Commerce', status: 'active', isPremium: true, customDomain: 'shop.mycompany.com', expiresAt: '2027-04-20', createdAt: '2026-04-22' },
        { id: 3, subdomain: 'c9d1a3b5', template: 'Agency Landing', status: 'expired', isPremium: true, customDomain: 'landing.agency.io', expiresAt: '2026-04-01', createdAt: '2025-04-01' },
        { id: 4, subdomain: 'e4f6b8c0', template: 'Personal Blog', status: 'active', isPremium: false, customDomain: null, expiresAt: null, createdAt: '2026-04-25' },
    ]);

    // Confirmation modal state
    const deleteTarget = useSignal<number | null>(null);
    // Premium pricing modal toggle
    const showPricing = useSignal(false);

    const handleDelete = $(() => {
        if (deleteTarget.value !== null) {
            subdomains.value = subdomains.value.filter(s => s.id !== deleteTarget.value);
            deleteTarget.value = null;
        }
    });

    const getStatusBadge = (status: string) => {
        if (status === 'active') {
            return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
        }
        if (status === 'expired') {
            return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
        }
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    };

    return (
        <section class="relative bg-white px-4 py-24 dark:bg-dark sm:py-32">
            {/* Subtle background gradient */}
            <div
                class="pointer-events-none absolute inset-0 -z-10"
                style="background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%);"
            />

            <div class="container mx-auto">
                <div class="flex justify-center border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
                    <div class="w-full overflow-hidden rounded-2xl border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-dark-2">

                        {/* ─── Toolbar Header ─── */}
                        <div
                            class="flex flex-col justify-between border-b border-stroke px-6 py-6 dark:border-dark-3 sm:flex-row sm:items-center sm:px-8"
                            style="background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.05) 100%);"
                        >
                            <div class="flex items-center gap-4">
                                <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-md dark:bg-dark-3">
                                    {/* Server / Dashboard icon */}
                                    <svg class="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                    </svg>
                                </div>
                                <div class="text-left">
                                    <h1 class="text-2xl font-bold tracking-tight text-dark dark:text-white">
                                        My Subdomains
                                    </h1>
                                    <p class="mt-1 text-sm text-body-color dark:text-dark-6">
                                        Manage your deployed websites
                                    </p>
                                </div>
                            </div>

                            <div class="mt-6 flex items-center gap-3 self-end sm:mt-0 sm:self-auto">
                                <a href="/templates">
                                    <button class="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-opacity-90">
                                        <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                        New Site
                                    </button>
                                </a>
                            </div>
                        </div>

                        {/* ─── Table Body ─── */}
                        <div class="overflow-x-auto">
                            <table class="w-full min-w-[700px] text-left text-sm">
                                <thead>
                                    <tr class="border-b border-stroke bg-gray-50/60 dark:border-dark-3 dark:bg-dark-2/60">
                                        <th class="px-6 py-4 font-semibold text-dark dark:text-white">Domain</th>
                                        <th class="px-6 py-4 font-semibold text-dark dark:text-white">Template</th>
                                        <th class="px-6 py-4 font-semibold text-dark dark:text-white">Status</th>
                                        <th class="px-6 py-4 font-semibold text-dark dark:text-white">
                                            <span class="flex items-center gap-1">
                                                Expires
                                                <svg class="h-3.5 w-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </span>
                                        </th>
                                        <th class="px-6 py-4 font-semibold text-dark dark:text-white">Created</th>
                                        <th class="sticky right-0 bg-gray-50/95 px-6 py-4 text-right font-semibold text-dark backdrop-blur-sm dark:bg-dark-2/95 dark:text-white">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subdomains.value.map((site) => (
                                        <tr key={site.id} class="border-b border-stroke transition-colors last:border-b-0 hover:bg-gray-50/50 dark:border-dark-3 dark:hover:bg-dark-2/50">
                                            {/* Domain column */}
                                            <td class="px-6 py-4">
                                                <div class="flex flex-col">
                                                    {site.isPremium && site.customDomain ? (
                                                        <>
                                                            <span class="flex items-center gap-1.5 font-medium text-dark dark:text-white">
                                                                {site.customDomain}
                                                                <span class="inline-flex items-center gap-0.5 rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-600 dark:bg-amber-900/30 dark:text-amber-500">
                                                                    <svg class="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                    </svg>
                                                                    PRO
                                                                </span>
                                                            </span>
                                                            <span class="mt-0.5 text-xs text-body-color dark:text-dark-6">
                                                                {site.subdomain}.authbox.app
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span class="font-medium text-dark dark:text-white">
                                                            {site.subdomain}.authbox.app
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Template */}
                                            <td class="px-6 py-4 text-body-color dark:text-dark-6">
                                                {site.template}
                                            </td>

                                            {/* Status badge */}
                                            <td class="px-6 py-4">
                                                <span class={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusBadge(site.status)}`}>
                                                    {site.status}
                                                </span>
                                            </td>

                                            {/* Expiry date (premium only) */}
                                            <td class="px-6 py-4">
                                                {site.isPremium && site.expiresAt ? (
                                                    <span class={`text-sm ${site.status === 'expired' ? 'font-medium text-red-500' : 'text-body-color dark:text-dark-6'}`}>
                                                        {site.expiresAt}
                                                    </span>
                                                ) : (
                                                    <span class="text-xs text-body-color/50 dark:text-dark-6/50">—</span>
                                                )}
                                            </td>

                                            {/* Created date */}
                                            <td class="px-6 py-4 text-sm text-body-color dark:text-dark-6">
                                                {site.createdAt}
                                            </td>

                                            {/* Action buttons — sticky on mobile scroll */}
                                            <td class="sticky right-0 bg-white/95 px-6 py-4 backdrop-blur-sm dark:bg-dark-2/95">
                                                <div class="flex items-center justify-end gap-2">
                                                    {/* Go Premium (only for non-premium rows) */}
                                                    {!site.isPremium && (
                                                        <button
                                                            onClick$={() => showPricing.value = true}
                                                            class="inline-flex items-center justify-center rounded-md border border-amber-400 bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100 dark:border-amber-600 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/40"
                                                            title="Upgrade to Premium"
                                                        >
                                                            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                    {/* Edit */}
                                                    <button class="inline-flex items-center justify-center rounded-md border border-stroke bg-white p-2 text-body-color transition hover:border-primary hover:text-primary dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6 dark:hover:border-primary dark:hover:text-primary">
                                                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    {/* Delete */}
                                                    <button
                                                        onClick$={() => deleteTarget.value = site.id}
                                                        class="inline-flex items-center justify-center rounded-md border border-stroke bg-white p-2 text-body-color transition hover:border-red-400 hover:text-red-500 dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6 dark:hover:border-red-500 dark:hover:text-red-400"
                                                    >
                                                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Empty state */}
                            {subdomains.value.length === 0 && (
                                <div class="flex flex-col items-center justify-center px-8 py-16 text-center">
                                    <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-dark-3">
                                        <svg class="h-8 w-8 text-body-color/40 dark:text-dark-6/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p class="text-sm font-medium text-body-color dark:text-dark-6">No subdomains created yet</p>
                                    <a href="/templates" class="mt-4 text-sm font-medium text-primary hover:underline">
                                        Create your first site →
                                    </a>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            {/* ─── Delete Confirmation Modal ─── */}
            {deleteTarget.value !== null && (
                <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
                    <div class="w-full max-w-sm overflow-hidden rounded-2xl border border-stroke bg-white shadow-2xl dark:border-dark-3 dark:bg-dark-2">
                        <div class="p-6 text-center">
                            <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                                <svg class="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 class="mb-2 text-lg font-bold text-dark dark:text-white">Delete Subdomain?</h3>
                            <p class="text-sm text-body-color dark:text-dark-6">
                                This action cannot be undone. The subdomain and all its data will be permanently removed.
                            </p>
                        </div>
                        <div class="flex border-t border-stroke dark:border-dark-3">
                            <button
                                onClick$={() => deleteTarget.value = null}
                                class="flex-1 px-6 py-3.5 text-sm font-medium text-body-color transition hover:bg-gray-50 dark:text-dark-6 dark:hover:bg-dark-3"
                            >
                                Cancel
                            </button>
                            <button
                                onClick$={handleDelete}
                                class="flex-1 border-l border-stroke bg-red-50 px-6 py-3.5 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-dark-3 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Premium Pricing Modal ─── */}
            {showPricing.value && (
                <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
                    <div class="w-full max-w-2xl overflow-hidden rounded-2xl border border-stroke bg-white shadow-2xl dark:border-dark-3 dark:bg-dark-2">
                        {/* Modal header */}
                        <div class="flex items-center justify-between border-b border-stroke px-8 py-6 dark:border-dark-3"
                            style="background: linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(245,158,11,0.05) 100%);"
                        >
                            <div class="flex items-center gap-3">
                                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 shadow-sm dark:bg-amber-900/30">
                                    <svg class="h-5 w-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 class="text-xl font-bold text-dark dark:text-white">Premium Plans</h2>
                                    <p class="text-xs text-body-color dark:text-dark-6">Unlock custom domains &amp; more</p>
                                </div>
                            </div>
                            <button
                                onClick$={() => showPricing.value = false}
                                class="flex h-8 w-8 items-center justify-center rounded-full text-body-color transition hover:bg-gray-100 dark:text-dark-6 dark:hover:bg-dark-3"
                            >
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Pricing cards */}
                        <div class="grid gap-6 p-8 sm:grid-cols-3">

                            {/* Free tier */}
                            <div class="rounded-xl border border-stroke p-6 dark:border-dark-3">
                                <h3 class="text-lg font-bold text-dark dark:text-white">Free</h3>
                                <div class="mt-2 flex items-baseline gap-1">
                                    <span class="text-3xl font-extrabold text-dark dark:text-white">$0</span>
                                    <span class="text-sm text-body-color dark:text-dark-6">/mo</span>
                                </div>
                                <ul class="mt-6 space-y-3 text-sm text-body-color dark:text-dark-6">
                                    <li class="flex items-center gap-2">
                                        <svg class="h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        1 Subdomain
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <svg class="h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        Random hex address
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <svg class="h-4 w-4 shrink-0 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                        <span class="line-through opacity-60">Custom domain</span>
                                    </li>
                                </ul>
                                <button class="mt-6 w-full rounded-md border border-stroke py-2.5 text-sm font-medium text-body-color transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-6">
                                    Current Plan
                                </button>
                            </div>

                            {/* Pro tier (highlighted) */}
                            <div class="relative rounded-xl border-2 border-primary p-6 shadow-lg ring-2 ring-primary/10">
                                <span class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-white shadow-md">
                                    POPULAR
                                </span>
                                <h3 class="text-lg font-bold text-dark dark:text-white">Pro</h3>
                                <div class="mt-2 flex items-baseline gap-1">
                                    <span class="text-3xl font-extrabold text-primary">$9</span>
                                    <span class="text-sm text-body-color dark:text-dark-6">/mo</span>
                                </div>
                                <ul class="mt-6 space-y-3 text-sm text-body-color dark:text-dark-6">
                                    <li class="flex items-center gap-2">
                                        <svg class="h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        5 Subdomains
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <svg class="h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        Custom domain
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <svg class="h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        SSL certificate
                                    </li>
                                </ul>
                                <button class="mt-6 w-full rounded-md bg-primary py-2.5 text-sm font-medium text-white shadow transition hover:bg-opacity-90">
                                    Upgrade Now
                                </button>
                            </div>

                            {/* Business tier */}
                            <div class="rounded-xl border border-stroke p-6 dark:border-dark-3">
                                <h3 class="text-lg font-bold text-dark dark:text-white">Business</h3>
                                <div class="mt-2 flex items-baseline gap-1">
                                    <span class="text-3xl font-extrabold text-dark dark:text-white">$29</span>
                                    <span class="text-sm text-body-color dark:text-dark-6">/mo</span>
                                </div>
                                <ul class="mt-6 space-y-3 text-sm text-body-color dark:text-dark-6">
                                    <li class="flex items-center gap-2">
                                        <svg class="h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        Unlimited subdomains
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <svg class="h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        Custom domains
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <svg class="h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        Priority support
                                    </li>
                                </ul>
                                <button class="mt-6 w-full rounded-md border border-stroke py-2.5 text-sm font-medium text-body-color transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-6">
                                    Contact Sales
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </section>
    );
});
