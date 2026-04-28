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
    // Mobile sidebar toggle
    const sidebarOpen = useSignal(false);
    // Active menu item
    const activeMenu = useSignal('sites');
    // Selected site for premium upgrade
    const upgradeTarget = useSignal<number | null>(null);

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

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { id: 'sites', label: 'My Sites', icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01' },
        { id: 'templates', label: 'Templates', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { id: 'domains', label: 'Domains', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
        { id: 'billing', label: 'Billing', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
        { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    ];

    return (
        <section class="relative min-h-screen bg-gray-50 dark:bg-dark mt-17">
            {/* Subtle background gradient */}
            <div
                class="pointer-events-none absolute inset-0 -z-10"
                style="background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.04) 0%, transparent 70%);"
            />

            <div class="container mx-auto">
                <div class="flex">

                    {/* ─── Mobile Sidebar Overlay ─── */}
                    {sidebarOpen.value && (
                        <div
                            class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
                            onClick$={() => sidebarOpen.value = false}
                        />
                    )}

                    {/* ─── Left Sidebar ─── */}
                    <aside class={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-stroke bg-white transition-transform duration-300 dark:border-dark-3 dark:bg-dark-2 lg:static lg:z-auto lg:translate-x-0 ${sidebarOpen.value ? 'translate-x-0' : '-translate-x-full'}`}>

                        {/* Sidebar Header / Brand */}
                        <div class="flex items-center gap-3 border-b border-stroke px-6 dark:border-dark-3">
                            {/* <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary shadow-md">
                            <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-base font-bold text-dark dark:text-white">Authbox</h2>
                            <p class="text-[11px] text-body-color dark:text-dark-6">Dashboard</p>
                        </div> */}
                            {/* Close button (mobile only) */}
                            <button
                                onClick$={() => sidebarOpen.value = false}
                                class="ml-auto flex h-8 w-8 items-center justify-center rounded-md text-body-color transition hover:bg-gray-100 dark:text-dark-6 dark:hover:bg-dark-3 lg:hidden"
                            >
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Navigation Menu */}
                        <nav class="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                            <p class="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-body-color/60 dark:text-dark-6/60">
                                Main
                            </p>
                            {menuItems.map((item) => {
                                const isActive = activeMenu.value === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick$={() => { activeMenu.value = item.id; sidebarOpen.value = false; }}
                                        class={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive
                                            ? 'bg-primary/10 text-primary dark:bg-primary/20'
                                            : 'text-body-color hover:bg-gray-100 dark:text-dark-6 dark:hover:bg-dark-3'
                                            }`}
                                    >
                                        <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
                                        </svg>
                                        {item.label}
                                        {item.id === 'sites' && (
                                            <span class="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary dark:bg-primary/20">
                                                {subdomains.value.length}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Sidebar Footer — minimal branding */}
                        {/* <div class="mt-auto border-t border-stroke px-5 py-4 dark:border-dark-3">
                        <p class="text-[10px] text-body-color/50 dark:text-dark-6/40">&copy; 2026 Authbox</p>
                    </div> */}
                    </aside>

                    {/* ─── Main Content Area ─── */}
                    <main class="flex-1 lg:min-h-screen">

                        {/* Content */}
                        <div class="p-6 sm:p-8">

                            {/* ─── Stats Cards ─── */}
                            <div class="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                <div class="rounded-xl border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-dark-2">
                                    <p class="text-xs font-medium text-body-color dark:text-dark-6">Total Sites</p>
                                    <p class="mt-1 text-2xl font-bold text-dark dark:text-white">{subdomains.value.length}</p>
                                </div>
                                <div class="rounded-xl border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-dark-2">
                                    <p class="text-xs font-medium text-body-color dark:text-dark-6">Active</p>
                                    <p class="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{subdomains.value.filter(s => s.status === 'active').length}</p>
                                </div>
                                <div class="rounded-xl border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-dark-2">
                                    <p class="text-xs font-medium text-body-color dark:text-dark-6">Premium</p>
                                    <p class="mt-1 text-2xl font-bold text-amber-600 dark:text-amber-400">{subdomains.value.filter(s => s.isPremium).length}</p>
                                </div>
                                <div class="rounded-xl border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-dark-2">
                                    <p class="text-xs font-medium text-body-color dark:text-dark-6">Expired</p>
                                    <p class="mt-1 text-2xl font-bold text-red-500 dark:text-red-400">{subdomains.value.filter(s => s.status === 'expired').length}</p>
                                </div>
                            </div>

                            {/* Action bar above table */}
                            <div class="mb-4 flex items-center justify-between">
                                <h2 class="text-sm font-semibold text-dark dark:text-white">My Sites</h2>
                                <a href="/templates">
                                    <button class="inline-flex items-center justify-center rounded-md border border-stroke bg-white p-2 text-body-color transition hover:border-primary hover:text-primary dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6 dark:hover:border-primary dark:hover:text-primary" title="Add New Site">
                                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </a>
                            </div>

                            <div class="overflow-hidden rounded-xl border border-stroke bg-white shadow-sm dark:border-dark-3 dark:bg-dark-2">

                                {/* ─── Table ─── */}
                                <div class="overflow-x-auto">
                                    <table class="w-full min-w-[700px] text-left text-sm">
                                        <thead>
                                            <tr class="border-b border-stroke bg-gray-50/60 dark:border-dark-3 dark:bg-dark/60">
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
                                                <tr key={site.id} class="border-b border-stroke transition-colors last:border-b-0 hover:bg-gray-50/50 dark:border-dark-3 dark:hover:bg-dark/50">
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
                                                                    onClick$={() => { upgradeTarget.value = site.id; showPricing.value = true; }}
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
                    </main>

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

                        {/* Site selector */}
                        <div class="border-b border-stroke px-8 py-5 dark:border-dark-3">
                            <label class="mb-2 block text-xs font-semibold text-body-color dark:text-dark-6">
                                Upgrade site
                            </label>
                            <div class="relative">
                                <select
                                    class="w-full appearance-none rounded-lg border border-stroke bg-gray-50 px-4 py-2.5 pr-10 text-sm font-medium text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-white dark:focus:border-primary"
                                    onChange$={(e) => {
                                        const val = (e.target as HTMLSelectElement).value;
                                        upgradeTarget.value = val ? Number(val) : null;
                                    }}
                                >
                                    <option value="">— Select a site —</option>
                                    {subdomains.value
                                        .filter(s => !s.isPremium)
                                        .map(s => (
                                            <option key={s.id} value={s.id} selected={upgradeTarget.value === s.id}>
                                                {`${s.subdomain}.authbox.app — ${s.template}`}
                                            </option>
                                        ))}
                                </select>
                                <svg class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body-color dark:text-dark-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            {subdomains.value.filter(s => !s.isPremium).length === 0 && (
                                <p class="mt-2 text-xs text-emerald-600 dark:text-emerald-400">All your sites are already premium! 🎉</p>
                            )}
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
