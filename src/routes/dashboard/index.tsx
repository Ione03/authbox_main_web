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
    const activeMenu = useSignal('dashboard');
    // Selected site for premium upgrade
    const upgradeTarget = useSignal<number | null>(null);
    // Dashboard analytics: selected domain
    const selectedDomain = useSignal<number>(0); // 0 = all sites
    // Payment processing modal state
    const paymentTarget = useSignal<{ domain: string; plan: string; amount: number } | null>(null);

    // Mock analytics data per site
    const analyticsData: Record<number, { visitors: number[]; pageViews: number; uniqueVisitors: number; bounceRate: number; avgDuration: string; topPages: { page: string; views: number }[]; recentActivity: { action: string; time: string; domain: string }[] }> = {
        0: {
            visitors: [120, 190, 230, 180, 310, 280, 350, 420, 390, 460, 510, 480],
            pageViews: 15420,
            uniqueVisitors: 8340,
            bounceRate: 42.3,
            avgDuration: '2m 45s',
            topPages: [
                { page: '/home', views: 4200 },
                { page: '/about', views: 2100 },
                { page: '/services', views: 1800 },
                { page: '/contact', views: 1200 },
                { page: '/blog', views: 980 },
            ],
            recentActivity: [
                { action: 'New visitor from Google', time: '2 min ago', domain: 'a3f8c1d2.authbox.app' },
                { action: 'Page view: /services', time: '5 min ago', domain: 'shop.mycompany.com' },
                { action: 'Form submission', time: '12 min ago', domain: 'landing.agency.io' },
                { action: 'New visitor from Twitter', time: '18 min ago', domain: 'e4f6b8c0.authbox.app' },
                { action: 'Page view: /pricing', time: '25 min ago', domain: 'a3f8c1d2.authbox.app' },
            ],
        },
        1: { visitors: [40, 55, 70, 60, 95, 85, 110, 130, 120, 150, 170, 160], pageViews: 4820, uniqueVisitors: 2610, bounceRate: 38.1, avgDuration: '3m 10s', topPages: [{ page: '/home', views: 1400 }, { page: '/about', views: 800 }], recentActivity: [{ action: 'New visitor from Google', time: '2 min ago', domain: 'a3f8c1d2.authbox.app' }] },
        2: { visitors: [50, 80, 90, 70, 120, 100, 130, 160, 150, 180, 200, 190], pageViews: 6200, uniqueVisitors: 3200, bounceRate: 35.5, avgDuration: '3m 30s', topPages: [{ page: '/products', views: 2100 }, { page: '/cart', views: 1500 }], recentActivity: [{ action: 'Page view: /checkout', time: '5 min ago', domain: 'shop.mycompany.com' }] },
        3: { visitors: [20, 35, 40, 30, 55, 50, 60, 70, 65, 75, 80, 70], pageViews: 2400, uniqueVisitors: 1330, bounceRate: 52.0, avgDuration: '1m 50s', topPages: [{ page: '/home', views: 800 }, { page: '/portfolio', views: 600 }], recentActivity: [{ action: 'Form submission', time: '12 min ago', domain: 'landing.agency.io' }] },
        4: { visitors: [10, 20, 30, 20, 40, 45, 50, 60, 55, 55, 60, 60], pageViews: 2000, uniqueVisitors: 1200, bounceRate: 48.7, avgDuration: '2m 15s', topPages: [{ page: '/blog', views: 700 }, { page: '/about', views: 400 }], recentActivity: [{ action: 'New visitor from Twitter', time: '18 min ago', domain: 'e4f6b8c0.authbox.app' }] },
    };

    const currentAnalytics = analyticsData[selectedDomain.value] || analyticsData[0];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const maxVisitor = Math.max(...currentAnalytics.visitors);

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
        // { id: 'templates', label: 'Templates', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        // { id: 'domains', label: 'Domains', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
        { id: 'billing', label: 'Billing', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
        // { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
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
                    <aside class={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-stroke bg-white transition-transform duration-300 dark:border-dark-3 dark:bg-dark-2 lg:static lg:z-auto lg:translate-x-0 ${sidebarOpen.value ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>

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
                    <main class="min-w-0 flex-1 lg:min-h-screen">

                        {/* Content */}
                        <div class="p-4 sm:p-6 lg:p-8">

                            {/* Mobile hamburger + page title */}
                            <div class="mb-4 flex items-center gap-3 lg:hidden">
                                <button
                                    onClick$={() => sidebarOpen.value = true}
                                    class="flex h-9 w-9 items-center justify-center rounded-lg border border-stroke text-body-color transition hover:bg-gray-50 dark:border-dark-3 dark:text-dark-6 dark:hover:bg-dark-3"
                                >
                                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                                <h1 class="text-lg font-bold text-dark dark:text-white">Dashboard</h1>
                            </div>

                            {/* ═══════════════════════════════════════ */}
                            {/* ─── DASHBOARD Overview Panel ─── */}
                            {/* ═══════════════════════════════════════ */}
                            {activeMenu.value === 'dashboard' && (
                                <>
                                    {/* Domain selector */}
                                    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <h2 class="text-lg font-bold text-dark dark:text-white">Analytics Overview</h2>
                                        <div class="relative">
                                            <select
                                                class="w-full appearance-none rounded-lg border border-stroke bg-white py-2.5 pl-4 pr-10 text-sm text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white sm:w-64"
                                                value={selectedDomain.value}
                                                onChange$={(e) => { selectedDomain.value = Number((e.target as HTMLSelectElement).value); }}
                                            >
                                                <option value={0}>All Sites</option>
                                                {subdomains.value.map(s => (
                                                    <option key={s.id} value={s.id}>
                                                        {`${s.customDomain || s.subdomain + '.authbox.app'}`}
                                                    </option>
                                                ))}
                                            </select>
                                            <svg class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body-color dark:text-dark-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Quick stat cards */}
                                    <div class="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                        <div class="rounded-xl border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-dark-2">
                                            <div class="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                                                <svg class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                            </div>
                                            <p class="text-xs font-medium text-body-color dark:text-dark-6">Page Views</p>
                                            <p class="mt-1 text-2xl font-bold text-dark dark:text-white">{currentAnalytics.pageViews.toLocaleString()}</p>
                                        </div>
                                        <div class="rounded-xl border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-dark-2">
                                            <div class="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                                <svg class="h-4 w-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            </div>
                                            <p class="text-xs font-medium text-body-color dark:text-dark-6">Unique Visitors</p>
                                            <p class="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{currentAnalytics.uniqueVisitors.toLocaleString()}</p>
                                        </div>
                                        <div class="rounded-xl border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-dark-2">
                                            <div class="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                                <svg class="h-4 w-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                                            </div>
                                            <p class="text-xs font-medium text-body-color dark:text-dark-6">Bounce Rate</p>
                                            <p class="mt-1 text-2xl font-bold text-amber-600 dark:text-amber-400">{currentAnalytics.bounceRate}%</p>
                                        </div>
                                        <div class="rounded-xl border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-dark-2">
                                            <div class="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                                                <svg class="h-4 w-4 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </div>
                                            <p class="text-xs font-medium text-body-color dark:text-dark-6">Avg. Duration</p>
                                            <p class="mt-1 text-2xl font-bold text-violet-600 dark:text-violet-400">{currentAnalytics.avgDuration}</p>
                                        </div>
                                    </div>

                                    {/* Visitor chart + top pages */}
                                    <div class="mb-6 grid gap-6 lg:grid-cols-3">
                                        {/* SVG Bar Chart */}
                                        <div class="rounded-xl border border-stroke bg-white p-5 shadow-sm dark:border-dark-3 dark:bg-dark-2 lg:col-span-2">
                                            <h3 class="mb-4 text-sm font-semibold text-dark dark:text-white">Monthly Visitors</h3>
                                            <div class="overflow-x-auto">
                                                <svg viewBox="0 0 600 220" class="min-w-[500px]" preserveAspectRatio="xMidYMid meet">
                                                    {/* Grid lines */}
                                                    {[0, 1, 2, 3, 4].map(i => (
                                                        <line key={`grid-${i}`} x1="40" y1={20 + i * 40} x2="590" y2={20 + i * 40} stroke="currentColor" class="text-stroke dark:text-dark-3" stroke-width="0.5" stroke-dasharray="4 4" />
                                                    ))}
                                                    {/* Bars */}
                                                    {currentAnalytics.visitors.map((v, i) => {
                                                        const barH = maxVisitor > 0 ? (v / maxVisitor) * 160 : 0;
                                                        const x = 50 + i * 46;
                                                        return (
                                                            <g key={`bar-${i}`}>
                                                                {/* Bar gradient */}
                                                                <rect x={x} y={180 - barH} width="28" height={barH} rx="4" class="fill-primary/80" />
                                                                {/* Value label */}
                                                                <text x={x + 14} y={175 - barH} text-anchor="middle" class="fill-body-color dark:fill-dark-6" style="font-size:9px">{v}</text>
                                                                {/* Month label */}
                                                                <text x={x + 14} y={200} text-anchor="middle" class="fill-body-color dark:fill-dark-6" style="font-size:10px">{months[i]}</text>
                                                            </g>
                                                        );
                                                    })}
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Top pages */}
                                        <div class="rounded-xl border border-stroke bg-white p-5 shadow-sm dark:border-dark-3 dark:bg-dark-2">
                                            <h3 class="mb-4 text-sm font-semibold text-dark dark:text-white">Top Pages</h3>
                                            <div class="space-y-3">
                                                {currentAnalytics.topPages.map((page) => {
                                                    const maxPageViews = Math.max(...currentAnalytics.topPages.map(p => p.views));
                                                    const pct = maxPageViews > 0 ? (page.views / maxPageViews) * 100 : 0;
                                                    return (
                                                        <div key={page.page}>
                                                            <div class="mb-1 flex items-center justify-between">
                                                                <span class="text-xs font-medium text-dark dark:text-white">{page.page}</span>
                                                                <span class="text-xs text-body-color dark:text-dark-6">{page.views.toLocaleString()}</span>
                                                            </div>
                                                            <div class="h-2 w-full rounded-full bg-gray-100 dark:bg-dark-3">
                                                                <div class="h-2 rounded-full bg-primary/70" style={`width: ${pct}%`} />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recent activity */}
                                    <div class="rounded-xl border border-stroke bg-white p-5 shadow-sm dark:border-dark-3 dark:bg-dark-2">
                                        <h3 class="mb-4 text-sm font-semibold text-dark dark:text-white">Recent Activity</h3>
                                        <div class="space-y-3">
                                            {currentAnalytics.recentActivity.map((act, i) => (
                                                <div key={i} class="flex items-start gap-3 rounded-lg p-2 transition hover:bg-gray-50 dark:hover:bg-dark-3">
                                                    <div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                                                        <svg class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                        </svg>
                                                    </div>
                                                    <div class="min-w-0 flex-1">
                                                        <p class="text-sm text-dark dark:text-white">{act.action}</p>
                                                        <p class="text-xs text-body-color dark:text-dark-6">{act.domain} · {act.time}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* ═══════════════════════════════════════ */}
                            {/* ─── MY SITES Panel ─── */}
                            {/* ═══════════════════════════════════════ */}
                            {activeMenu.value === 'sites' && (
                                <>

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

                                </>
                            )}

                            {/* ═══════════════════════════════════════ */}
                            {/* ─── BILLING Panel ─── */}
                            {/* ═══════════════════════════════════════ */}
                            {activeMenu.value === 'billing' && (() => {
                                const premiumSites = subdomains.value.filter(s => s.isPremium);
                                const paymentHistory = [
                                    { id: 'INV-2026-0042', domain: 'shop.mycompany.com', plan: 'Premium Annual', amount: 120, status: 'paid', date: '2026-04-22', method: 'Visa •••• 4242' },
                                    { id: 'INV-2026-0031', domain: 'landing.agency.io', plan: 'Premium Annual', amount: 120, status: 'paid', date: '2026-04-01', method: 'Mastercard •••• 8888' },
                                    { id: 'INV-2025-0189', domain: 'landing.agency.io', plan: 'Premium Annual', amount: 99, status: 'paid', date: '2025-04-01', method: 'Mastercard •••• 8888' },
                                    { id: 'INV-2025-0102', domain: 'shop.mycompany.com', plan: 'Premium Monthly', amount: 12, status: 'refunded', date: '2025-03-22', method: 'Visa •••• 4242' },
                                ];
                                const upcomingPayments = premiumSites.filter(s => s.expiresAt && s.status === 'active').map(s => ({
                                    domain: s.customDomain || `${s.subdomain}.authbox.app`,
                                    plan: 'Premium Annual',
                                    amount: 120,
                                    nextDate: s.expiresAt!,
                                    autoRenew: true,
                                }));
                                const totalSpent = paymentHistory.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);

                                return (
                                    <>
                                        {/* Page title */}
                                        <div class="mb-6">
                                            <h2 class="text-lg font-bold text-dark dark:text-white">Billing & Payments</h2>
                                            <p class="mt-1 text-sm text-body-color dark:text-dark-6">Manage your subscriptions and view payment history</p>
                                        </div>

                                        {/* Summary cards */}
                                        <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                            <div class="rounded-xl border border-stroke bg-white p-5 shadow-sm dark:border-dark-3 dark:bg-dark-2">
                                                <div class="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                                                    <svg class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                </div>
                                                <p class="text-xs font-medium text-body-color dark:text-dark-6">Total Spent</p>
                                                <p class="mt-1 text-2xl font-bold text-dark dark:text-white">${totalSpent}</p>
                                            </div>
                                            <div class="rounded-xl border border-stroke bg-white p-5 shadow-sm dark:border-dark-3 dark:bg-dark-2">
                                                <div class="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                                    <svg class="h-4 w-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                                </div>
                                                <p class="text-xs font-medium text-body-color dark:text-dark-6">Active Subscriptions</p>
                                                <p class="mt-1 text-2xl font-bold text-amber-600 dark:text-amber-400">{premiumSites.filter(s => s.status === 'active').length}</p>
                                            </div>
                                            <div class="rounded-xl border border-stroke bg-white p-5 shadow-sm dark:border-dark-3 dark:bg-dark-2">
                                                <div class="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                                    <svg class="h-4 w-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                </div>
                                                <p class="text-xs font-medium text-body-color dark:text-dark-6">Next Payment</p>
                                                <p class="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{upcomingPayments.length > 0 ? upcomingPayments[0].nextDate : '—'}</p>
                                            </div>
                                        </div>

                                        {/* Upcoming Payments */}
                                        <div class="mb-6">
                                            <h3 class="mb-3 text-sm font-semibold text-dark dark:text-white">Upcoming Renewals</h3>
                                            {upcomingPayments.length > 0 ? (
                                                <div class="overflow-hidden rounded-xl border border-stroke bg-white shadow-sm dark:border-dark-3 dark:bg-dark-2">
                                                    <div class="overflow-x-auto">
                                                        <table class="w-full min-w-[550px] text-left text-sm">
                                                            <thead>
                                                                <tr class="border-b border-stroke bg-gray-50/60 dark:border-dark-3 dark:bg-dark/60">
                                                                    <th class="px-6 py-3.5 font-semibold text-dark dark:text-white">Domain</th>
                                                                    <th class="px-6 py-3.5 font-semibold text-dark dark:text-white">Plan</th>
                                                                    <th class="px-6 py-3.5 font-semibold text-dark dark:text-white">Amount</th>
                                                                    <th class="px-6 py-3.5 font-semibold text-dark dark:text-white">Renewal Date</th>
                                                                    <th class="px-6 py-3.5 font-semibold text-dark dark:text-white">Auto-Renew</th>
                                                                    <th class="px-6 py-3.5 text-right font-semibold text-dark dark:text-white">Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {upcomingPayments.map((p) => (
                                                                    <tr key={p.domain} class="border-b border-stroke last:border-b-0 dark:border-dark-3">
                                                                        <td class="px-6 py-4 font-medium text-dark dark:text-white">{p.domain}</td>
                                                                        <td class="px-6 py-4 text-body-color dark:text-dark-6">{p.plan}</td>
                                                                        <td class="px-6 py-4 font-semibold text-dark dark:text-white">${p.amount}</td>
                                                                        <td class="px-6 py-4">
                                                                            <span class="inline-flex items-center gap-1.5 text-sm text-body-color dark:text-dark-6">
                                                                                <svg class="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                                                {p.nextDate}
                                                                            </span>
                                                                        </td>
                                                                        <td class="px-6 py-4">
                                                                            <span class="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">On</span>
                                                                        </td>
                                                                        <td class="px-6 py-4">
                                                                            <div class="flex items-center justify-end gap-2">
                                                                                <button
                                                                                    onClick$={() => {
                                                                                        const invoiceId = `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
                                                                                        const w = window.open('', '_blank', 'width=800,height=900');
                                                                                        if (!w) return;
                                                                                        w.document.write(`<!DOCTYPE html><html><head><title>Invoice ${invoiceId}</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',system-ui,sans-serif;padding:48px;color:#1d2430;background:#fff}h1{font-size:28px;font-weight:800;color:#4a6cf7}.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px}.meta{text-align:right;font-size:13px;color:#788293;line-height:1.8}.divider{height:1px;background:#e3e8ef;margin:24px 0}table{width:100%;border-collapse:collapse;margin:20px 0}th{text-align:left;padding:12px 16px;background:#f9fafb;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#788293;border-bottom:2px solid #e3e8ef}td{padding:14px 16px;border-bottom:1px solid #e3e8ef;font-size:14px}.amount{text-align:right;font-weight:700;font-size:15px}.total-row td{border-bottom:none;padding-top:16px;font-size:16px;font-weight:700}.total-row .amount{color:#4a6cf7;font-size:20px}.footer{margin-top:48px;padding-top:24px;border-top:1px solid #e3e8ef;font-size:12px;color:#788293;text-align:center}.badge{display:inline-block;background:#ecfdf5;color:#059669;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600}@media print{body{padding:32px}}</style></head><body><div class='header'><div><h1>INVOICE</h1><p style='margin-top:8px;font-size:14px;color:#788293'>${invoiceId}</p></div><div class='meta'><strong style='color:#1d2430;font-size:16px'>Authbox</strong><br>authbox.web.id<br>billing@authbox.web.id</div></div><div class='divider'></div><div style='display:flex;justify-content:space-between;margin-bottom:24px'><div><p style='font-size:12px;color:#788293;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px'>Bill To</p><p style='font-size:14px;font-weight:600'>Customer Account</p></div><div style='text-align:right'><p style='font-size:12px;color:#788293;margin-bottom:4px'>Issue Date: <strong style='color:#1d2430'>${new Date().toISOString().slice(0, 10)}</strong></p><p style='font-size:12px;color:#788293'>Due Date: <strong style='color:#1d2430'>${p.nextDate}</strong></p><p style='margin-top:8px'><span class='badge'>Upcoming</span></p></div></div><table><thead><tr><th>Description</th><th>Domain</th><th>Period</th><th class='amount'>Amount</th></tr></thead><tbody><tr><td>${p.plan}</td><td>${p.domain}</td><td>12 months</td><td class='amount'>$${p.amount}.00</td></tr><tr class='total-row'><td colspan='3' style='text-align:right;padding-right:16px'>Total Due</td><td class='amount'>$${p.amount}.00</td></tr></tbody></table><div class='footer'><p>Thank you for choosing Authbox Premium!</p><p style='margin-top:4px'>This invoice was generated automatically. For questions, contact billing@authbox.web.id</p></div></body></html>`);
                                                                                        w.document.close();
                                                                                        setTimeout(() => w.print(), 500);
                                                                                    }}
                                                                                    class="inline-flex items-center gap-1.5 rounded-md border border-stroke bg-white px-3 py-1.5 text-xs font-medium text-body-color transition hover:border-primary hover:text-primary dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6 dark:hover:border-primary dark:hover:text-primary"
                                                                                    title="Generate & Download Invoice PDF"
                                                                                >
                                                                                    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                                    </svg>
                                                                                    Invoice PDF
                                                                                </button>
                                                                                <button
                                                                                    onClick$={() => {
                                                                                        paymentTarget.value = { domain: p.domain, plan: p.plan, amount: p.amount };
                                                                                    }}
                                                                                    class="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white transition hover:bg-primary/90"
                                                                                    title="Process Payment"
                                                                                >
                                                                                    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                                                    </svg>
                                                                                    Pay Now
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div class="rounded-xl border border-stroke bg-white p-8 text-center shadow-sm dark:border-dark-3 dark:bg-dark-2">
                                                    <p class="text-sm text-body-color dark:text-dark-6">No upcoming renewals</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Payment History */}
                                        <div>
                                            <h3 class="mb-3 text-sm font-semibold text-dark dark:text-white">Payment History</h3>
                                            <div class="overflow-hidden rounded-xl border border-stroke bg-white shadow-sm dark:border-dark-3 dark:bg-dark-2">
                                                <div class="overflow-x-auto">
                                                    <table class="w-full min-w-[700px] text-left text-sm">
                                                        <thead>
                                                            <tr class="border-b border-stroke bg-gray-50/60 dark:border-dark-3 dark:bg-dark/60">
                                                                <th class="px-6 py-3.5 font-semibold text-dark dark:text-white">Invoice</th>
                                                                <th class="px-6 py-3.5 font-semibold text-dark dark:text-white">Domain</th>
                                                                <th class="px-6 py-3.5 font-semibold text-dark dark:text-white">Plan</th>
                                                                <th class="px-6 py-3.5 font-semibold text-dark dark:text-white">Amount</th>
                                                                <th class="px-6 py-3.5 font-semibold text-dark dark:text-white">Status</th>
                                                                <th class="px-6 py-3.5 font-semibold text-dark dark:text-white">Date</th>
                                                                <th class="px-6 py-3.5 font-semibold text-dark dark:text-white">Method</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {paymentHistory.map((p) => (
                                                                <tr key={p.id} class="border-b border-stroke last:border-b-0 hover:bg-gray-50/50 dark:border-dark-3 dark:hover:bg-dark/50">
                                                                    <td class="px-6 py-4">
                                                                        <span class="font-mono text-xs font-medium text-primary">{p.id}</span>
                                                                    </td>
                                                                    <td class="px-6 py-4 font-medium text-dark dark:text-white">{p.domain}</td>
                                                                    <td class="px-6 py-4 text-body-color dark:text-dark-6">{p.plan}</td>
                                                                    <td class="px-6 py-4 font-semibold text-dark dark:text-white">${p.amount}</td>
                                                                    <td class="px-6 py-4">
                                                                        <span class={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${p.status === 'paid'
                                                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                                                : p.status === 'refunded'
                                                                                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                                                    : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                                                            }`}>
                                                                            {p.status}
                                                                        </span>
                                                                    </td>
                                                                    <td class="px-6 py-4 text-body-color dark:text-dark-6">{p.date}</td>
                                                                    <td class="px-6 py-4 text-body-color dark:text-dark-6">
                                                                        <span class="flex items-center gap-1.5">
                                                                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                                                            {p.method}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}

                        </div>
                    </main>

                </div>
            </div>

            {/* ─── Payment Processing Modal ─── */}
            {paymentTarget.value !== null && (
                <div class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
                    <div class="w-full max-w-md overflow-hidden rounded-2xl border border-stroke bg-white shadow-2xl dark:border-dark-3 dark:bg-dark-2">
                        {/* Modal header */}
                        <div class="flex items-center justify-between border-b border-stroke px-6 py-4 dark:border-dark-3">
                            <div>
                                <h3 class="text-lg font-bold text-dark dark:text-white">Process Payment</h3>
                                <p class="mt-0.5 text-xs text-body-color dark:text-dark-6">Renew your subscription</p>
                            </div>
                            <button
                                onClick$={() => paymentTarget.value = null}
                                class="flex h-8 w-8 items-center justify-center rounded-lg text-body-color transition hover:bg-gray-100 dark:text-dark-6 dark:hover:bg-dark-3"
                            >
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Order summary */}
                        <div class="border-b border-stroke px-6 py-4 dark:border-dark-3">
                            <div class="rounded-lg bg-gray-50 p-4 dark:bg-dark-3">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm font-semibold text-dark dark:text-white">{paymentTarget.value.domain}</p>
                                        <p class="mt-0.5 text-xs text-body-color dark:text-dark-6">{paymentTarget.value.plan} — 12 months</p>
                                    </div>
                                    <p class="text-xl font-bold text-primary">${paymentTarget.value.amount}.00</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment form */}
                        <div class="px-6 py-5">
                            <div class="space-y-4">
                                {/* Cardholder name */}
                                <div>
                                    <label class="mb-1.5 block text-xs font-medium text-dark dark:text-white">Cardholder Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        class="w-full rounded-lg border border-stroke bg-transparent px-4 py-2.5 text-sm text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                {/* Card number */}
                                <div>
                                    <label class="mb-1.5 block text-xs font-medium text-dark dark:text-white">Card Number</label>
                                    <div class="relative">
                                        <input
                                            type="text"
                                            placeholder="4242 4242 4242 4242"
                                            maxLength={19}
                                            class="w-full rounded-lg border border-stroke bg-transparent px-4 py-2.5 pr-12 text-sm text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:text-white dark:focus:border-primary"
                                        />
                                        <div class="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
                                            <svg class="h-6 w-auto text-body-color/40 dark:text-dark-6/40" viewBox="0 0 24 16" fill="currentColor"><rect x="0" y="0" width="24" height="16" rx="2" opacity="0.15" /><rect x="1" y="4" width="6" height="3" rx="0.5" opacity="0.4" /><rect x="1" y="9" width="10" height="1.5" rx="0.5" opacity="0.2" /><rect x="1" y="12" width="7" height="1.5" rx="0.5" opacity="0.2" /></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Expiry + CVC row */}
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="mb-1.5 block text-xs font-medium text-dark dark:text-white">Expiry Date</label>
                                        <input
                                            type="text"
                                            placeholder="MM / YY"
                                            maxLength={7}
                                            class="w-full rounded-lg border border-stroke bg-transparent px-4 py-2.5 text-sm text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label class="mb-1.5 block text-xs font-medium text-dark dark:text-white">CVC</label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            maxLength={4}
                                            class="w-full rounded-lg border border-stroke bg-transparent px-4 py-2.5 text-sm text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                {/* Payment method selector */}
                                <div>
                                    <label class="mb-1.5 block text-xs font-medium text-dark dark:text-white">Payment Method</label>
                                    <div class="grid grid-cols-3 gap-2">
                                        <button class="flex items-center justify-center gap-1.5 rounded-lg border-2 border-primary bg-primary/5 px-3 py-2.5 text-xs font-medium text-primary dark:bg-primary/10">
                                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                            Card
                                        </button>
                                        <button class="flex items-center justify-center gap-1.5 rounded-lg border border-stroke px-3 py-2.5 text-xs font-medium text-body-color transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-6">
                                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>
                                            PayPal
                                        </button>
                                        <button class="flex items-center justify-center gap-1.5 rounded-lg border border-stroke px-3 py-2.5 text-xs font-medium text-body-color transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-6">
                                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                            E-Wallet
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal footer */}
                        <div class="flex items-center gap-3 border-t border-stroke px-6 py-4 dark:border-dark-3">
                            <button
                                onClick$={() => paymentTarget.value = null}
                                class="flex-1 rounded-lg border border-stroke px-4 py-2.5 text-sm font-medium text-body-color transition hover:bg-gray-50 dark:border-dark-3 dark:text-dark-6 dark:hover:bg-dark-3"
                            >
                                Cancel
                            </button>
                            <button
                                onClick$={() => {
                                    // Mock payment processing
                                    alert(`Payment of $${paymentTarget.value?.amount}.00 for ${paymentTarget.value?.domain} processed successfully!`);
                                    paymentTarget.value = null;
                                }}
                                class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90"
                            >
                                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                {`Pay $${paymentTarget.value?.amount}.00`}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Delete Confirmation Modal ─── */}
            {deleteTarget.value !== null && (
                <div class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
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
                <div class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
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
                                <button
                                    onClick$={() => {
                                        const site = subdomains.value.find(s => s.id === upgradeTarget.value);
                                        if (!site) { alert('Please select a site to upgrade first.'); return; }
                                        const domain = site.customDomain || `${site.subdomain}.authbox.app`;
                                        showPricing.value = false;
                                        paymentTarget.value = { domain, plan: 'Pro Plan', amount: 108 };
                                    }}
                                    class="mt-6 w-full rounded-md bg-primary py-2.5 text-sm font-medium text-white shadow transition hover:bg-opacity-90"
                                >
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
                                <button
                                    onClick$={() => {
                                        const site = subdomains.value.find(s => s.id === upgradeTarget.value);
                                        if (!site) { alert('Please select a site to upgrade first.'); return; }
                                        const domain = site.customDomain || `${site.subdomain}.authbox.app`;
                                        showPricing.value = false;
                                        paymentTarget.value = { domain, plan: 'Business Plan', amount: 348 };
                                    }}
                                    class="mt-6 w-full rounded-md border border-stroke py-2.5 text-sm font-medium text-body-color transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-6"
                                >
                                    Upgrade Now
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </section>
    );
});
