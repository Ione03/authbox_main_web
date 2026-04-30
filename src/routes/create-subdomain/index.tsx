import { component$, useSignal, $ } from '@builder.io/qwik';
import { server$, useNavigate } from '@builder.io/qwik-city';
import { createSnapTransaction } from '../../lib/midtrans';

const checkSubdomain = server$(async function (sub: string) {
    sub = sub.trim().toLowerCase();
    if (!sub || !/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(sub) || sub.length < 2) {
        return { available: false, error: 'Invalid subdomain (letters, numbers, hyphens only)' };
    }

    const fullDomain = `${sub}.authbox.web.id`;

    // Option 1: cPanel API (if credentials are configured)
    const CPANEL_URL = process.env.CPANEL_URL;       // e.g. https://yourdomain.com:2083
    const CPANEL_USER = process.env.CPANEL_USER;
    const CPANEL_TOKEN = process.env.CPANEL_TOKEN;    // API token

    if (CPANEL_URL && CPANEL_USER && CPANEL_TOKEN) {
        try {
            const res = await fetch(
                `${CPANEL_URL}/execute/SubDomain/list_subdomains`,
                { headers: { Authorization: `cpanel ${CPANEL_USER}:${CPANEL_TOKEN}` } }
            );
            const data = await res.json();
            const exists = data?.data?.some((s: any) => s.domain === fullDomain || s.subdomain === sub);
            return { available: !exists, error: null };
        } catch {
            // fall through to DNS check
        }
    }

    // Option 2: DNS lookup fallback
    const dns = await import('dns');
    const { promisify } = await import('util');
    const resolve = promisify(dns.resolve);
    try {
        await resolve(fullDomain);
        return { available: false, error: null }; // DNS records found → taken
    } catch (err: any) {
        if (err.code === 'ENOTFOUND' || err.code === 'ENODATA') {
            return { available: true, error: null }; // no records → available
        }
        return { available: false, error: 'Could not check subdomain' };
    }
});

type DomainResult = {
    domain: string;
    tld: string;
    available: boolean;
    price: string | null;
    currency: string;
};

const checkDomainPricing = server$(async function (domainInput: string) {
    // Clean input — extract base name
    let cleaned = domainInput.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/.*$/, '').trim().toLowerCase();
    const baseName = cleaned.split('.')[0];
    if (!baseName || !/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(baseName) || baseName.length < 2) {
        return { results: [] as DomainResult[], error: 'Invalid domain name' };
    }

    const API_KEY = process.env.GODADDY_API_KEY;
    const API_SECRET = process.env.GODADDY_API_SECRET;
    const tlds = ['com', 'net', 'org', 'io', 'dev', 'app', 'co', 'xyz', 'site', 'online'];

    // If GoDaddy API keys are configured, use the real API
    if (API_KEY && API_SECRET) {
        const results: DomainResult[] = await Promise.all(
            tlds.map(async (tld): Promise<DomainResult> => {
                const domain = `${baseName}.${tld}`;
                try {
                    const res = await fetch(
                        `https://api.godaddy.com/v1/domains/available?domain=${domain}`,
                        { headers: { Authorization: `sso-key ${API_KEY}:${API_SECRET}` } }
                    );
                    if (!res.ok) return { domain, tld, available: false, price: null, currency: 'USD' };
                    const data = await res.json();
                    // GoDaddy returns price in micro-units (1 USD = 1_000_000)
                    const price = data.price ? (data.price / 1_000_000).toFixed(2) : null;
                    return { domain, tld, available: !!data.available, price, currency: data.currency || 'USD' };
                } catch {
                    return { domain, tld, available: false, price: null, currency: 'USD' };
                }
            })
        );
        return { results, error: null };
    }

    // Fallback: DNS-based check (no real pricing)
    const dns = await import('dns');
    const { promisify } = await import('util');
    const resolve = promisify(dns.resolve);
    const fallbackPrices: Record<string, string> = {
        com: '11.99', net: '12.99', org: '9.99', io: '39.99', dev: '15.49',
        app: '16.99', co: '11.99', xyz: '1.99', site: '2.99', online: '3.99',
    };

    const results: DomainResult[] = await Promise.all(
        tlds.map(async (tld): Promise<DomainResult> => {
            const domain = `${baseName}.${tld}`;
            try {
                await resolve(domain);
                return { domain, tld, available: false, price: fallbackPrices[tld] || null, currency: 'USD' };
            } catch (err: any) {
                const avail = err.code === 'ENOTFOUND' || err.code === 'ENODATA';
                return { domain, tld, available: avail, price: fallbackPrices[tld] || null, currency: 'USD' };
            }
        })
    );
    return { results, error: null };
});

export default component$(() => {
    // Generates an 8-character long hexadecimal string at component setup (runs during SSR
    // and is serialized to the client, so no useVisibleTask$ / hydration mismatch).
    const initialSubdomain = Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');
    // Stores the randomly generated hex string
    const subdomain = useSignal<string>(initialSubdomain);
    // Tracks which domain option is selected
    const domainOption = useSignal<'subdomain' | 'custom' | 'existing'>('subdomain');
    // Stores the user's custom domain input
    const customDomain = useSignal<string>('');
    // Stores the user's existing domain input
    const existingDomain = useSignal<string>('');
    // Subdomain check state
    const subStatus = useSignal<'idle' | 'checking' | 'available' | 'taken' | 'error'>('idle');
    const subError = useSignal<string>('');

    const handleCheckSubdomain = $(async () => {
        const s = subdomain.value.trim();
        if (!s) return;
        subStatus.value = 'checking';
        subError.value = '';
        try {
            const result = await checkSubdomain(s);
            if (result.error) {
                subStatus.value = 'error';
                subError.value = result.error;
            } else {
                subStatus.value = result.available ? 'available' : 'taken';
            }
        } catch {
            subStatus.value = 'error';
            subError.value = 'Network error';
        }
    });

    // Domain check state
    const domainStatus = useSignal<'idle' | 'checking' | 'done' | 'error'>('idle');
    const domainError = useSignal<string>('');
    const domainResults = useSignal<DomainResult[]>([]);
    const selectedDomain = useSignal<DomainResult | null>(null);
    // Registration modal
    const showRegister = useSignal(false);
    const registerLoading = useSignal(false);
    const nav = useNavigate();

    const handleMidtransRegister = $(async () => {
        if (!selectedDomain.value) return;
        registerLoading.value = true;
        const orderId = `DOM-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const amount = parseFloat(selectedDomain.value.price || '0');
        const { token, error } = await createSnapTransaction({
            orderId,
            amount: Math.round(amount * 100), // convert to cents / smallest unit
            itemName: `Domain Registration: ${selectedDomain.value.domain} (1 year)`,
        });
        registerLoading.value = false;

        if (error || !token) {
            alert(error || 'Failed to create payment');
            return;
        }

        showRegister.value = false;

        (window as any).snap.pay(token, {
            onSuccess: async () => {
                alert(`Domain ${selectedDomain.value?.domain} registered successfully!`);
                await nav('/dashboard');
            },
            onPending: () => {
                alert('Payment pending. We will notify you once completed.');
            },
            onError: () => {
                alert('Payment failed. Please try again.');
            },
            onClose: () => {},
        });
    });

    const handleCheckDomain = $(async () => {
        const d = customDomain.value.trim();
        if (!d) return;
        domainStatus.value = 'checking';
        domainError.value = '';
        domainResults.value = [];
        selectedDomain.value = null;
        try {
            const { results, error } = await checkDomainPricing(d);
            if (error) {
                domainStatus.value = 'error';
                domainError.value = error;
            } else {
                domainResults.value = results;
                // Auto-select first available
                const first = results.find(r => r.available);
                if (first) selectedDomain.value = first;
                domainStatus.value = 'done';
            }
        } catch {
            domainStatus.value = 'error';
            domainError.value = 'Network error';
        }
    });

    return (
        <>
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

                        {/* Card header strip (Toolbar) */}
                        <div
                            class="flex flex-col justify-between border-b border-stroke px-6 py-6 dark:border-dark-3 sm:flex-row sm:items-center sm:px-8"
                            style="background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.05) 100%);"
                        >
                            <div class="flex items-center gap-4">
                                <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-md dark:bg-dark-3">
                                    <svg class="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                                <div class="text-left">
                                    <h1 class="text-2xl font-bold tracking-tight text-dark dark:text-white">
                                        Platform Domain
                                    </h1>
                                    <p class="mt-1 text-sm text-body-color dark:text-dark-6">
                                        Where will your app be hosted?
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card body */}
                        <div class="px-8 py-8">
                            <div class="space-y-6">
                                
                                {/* Free Subdomain Option */}
                                <div 
                                    class={`cursor-pointer rounded-xl border-2 p-5 transition-all ${
                                        domainOption.value === 'subdomain'
                                            ? 'border-primary bg-primary/5 dark:bg-primary/10 ring-2 ring-primary ring-opacity-20' 
                                            : 'border-stroke hover:border-primary/50 dark:border-dark-3'
                                    }`}
                                    onClick$={() => domainOption.value = 'subdomain'}
                                >
                                    <div class="flex items-center justify-between mb-3">
                                        <h3 class="font-semibold text-dark dark:text-white">Generated Subdomain</h3>
                                        <div class={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${domainOption.value === 'subdomain' ? 'border-primary bg-primary text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                            {domainOption.value === 'subdomain' && (
                                                <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div class={`flex items-center overflow-hidden rounded-md border bg-white dark:bg-dark-2 transition-colors ${
                                        subStatus.value === 'available' ? 'border-emerald-400' :
                                        subStatus.value === 'taken' || subStatus.value === 'error' ? 'border-red-400' :
                                        domainOption.value === 'subdomain' ? 'border-primary border-opacity-50 dark:border-primary dark:border-opacity-50' : 'border-stroke dark:border-dark-3'
                                    }`}>
                                        <input 
                                            type="text" 
                                            disabled={false}
                                            value={subdomain.value} 
                                            onInput$={(e) => {
                                                subdomain.value = (e.target as HTMLInputElement).value;
                                                subStatus.value = 'idle';
                                            }}
                                            onKeyDown$={(e) => { if (e.key === 'Enter') handleCheckSubdomain(); }}
                                            class="w-full bg-transparent px-4 py-2.5 text-sm text-dark outline-none dark:text-white disabled:opacity-50" 
                                            placeholder="8-digit hex" 
                                        />
                                        <span class="border-l border-stroke bg-gray-50 px-4 py-2.5 text-sm font-medium text-body-color dark:border-dark-3 dark:bg-dark-3">
                                            .authbox.web.id
                                        </span>
                                        <button
                                            type="button"
                                            onClick$={handleCheckSubdomain}
                                            disabled={subStatus.value === 'checking' || !subdomain.value.trim()}
                                            class="shrink-0 border-l border-stroke bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                        >
                                            {subStatus.value === 'checking' ? (
                                                <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                            ) : 'Check'}
                                        </button>
                                    </div>
                                    {domainOption.value === 'subdomain' && (
                                        <div class="mt-2">
                                            {subStatus.value === 'available' && (
                                                <p class="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                                                    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {subdomain.value}.authbox.web.id is available!
                                                </p>
                                            )}
                                            {subStatus.value === 'taken' && (
                                                <p class="flex items-center gap-1 text-[11px] font-medium text-red-500 dark:text-red-400">
                                                    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    {subdomain.value}.authbox.web.id is already taken
                                                </p>
                                            )}
                                            {subStatus.value === 'error' && (
                                                <p class="flex items-center gap-1 text-[11px] font-medium text-red-500 dark:text-red-400">
                                                    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {subError.value}
                                                </p>
                                            )}
                                            {subStatus.value === 'idle' && (
                                                <p class="text-[11px] text-body-color dark:text-dark-6">
                                                    This temporary URL can be used immediately for testing.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Custom Domain Option (Premium) */}
                                <div 
                                    class={`cursor-pointer rounded-xl border-2 p-5 transition-all ${
                                        domainOption.value === 'custom'
                                            ? 'border-primary bg-primary/5 dark:bg-primary/10 ring-2 ring-primary ring-opacity-20' 
                                            : 'border-stroke hover:border-primary/50 dark:border-dark-3'
                                    }`}
                                    onClick$={() => domainOption.value = 'custom'}
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
                                        <div class={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${domainOption.value === 'custom' ? 'border-primary bg-primary text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                            {domainOption.value === 'custom' && (
                                                <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>

                                    {domainOption.value === 'custom' && (
                                        <div class="mt-4 animate-[fadeIn_0.3s_ease-out]">
                                            <div class="flex flex-col gap-2 sm:flex-row">
                                                <input 
                                                    type="text" 
                                                    value={customDomain.value}
                                                    onInput$={(e) => {
                                                        customDomain.value = (e.target as HTMLInputElement).value;
                                                        domainStatus.value = 'idle';
                                                    }}
                                                    onKeyDown$={(e) => { if (e.key === 'Enter') handleCheckDomain(); }}
                                                    class={`w-full sm:flex-1 rounded-md border bg-white px-4 py-2.5 text-sm text-dark outline-none dark:bg-dark-2 dark:text-white ${
                                                        domainStatus.value === 'done' && domainResults.value.some(r => r.available) ? 'border-emerald-400 focus:border-emerald-500' :
                                                        domainStatus.value === 'error' ? 'border-red-400 focus:border-red-500' :
                                                        'border-stroke focus:border-primary dark:border-dark-3 dark:focus:border-primary'
                                                    }`}
                                                    placeholder="e.g. yourcompany.com"
                                                />
                                                <button
                                                    type="button"
                                                    onClick$={handleCheckDomain}
                                                    disabled={domainStatus.value === 'checking' || !customDomain.value.trim()}
                                                    class="w-full sm:w-auto shrink-0 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                                >
                                                    {domainStatus.value === 'checking' ? (
                                                        <svg class="mx-auto h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                        </svg>
                                                    ) : 'Check'}
                                                </button>
                                            </div>

                                            {/* Status messages */}
                                            {domainStatus.value === 'done' && domainResults.value.length > 0 && (
                                                <div class="mt-3 space-y-2">
                                                    <p class="text-xs font-semibold text-dark dark:text-white">Available extensions:</p>
                                                    <div class="max-h-52 space-y-1.5 overflow-y-auto rounded-lg border border-stroke p-2 dark:border-dark-3">
                                                        {domainResults.value.map((r) => (
                                                            <div
                                                                key={r.domain}
                                                                onClick$={() => { if (r.available) selectedDomain.value = r; }}
                                                                class={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm transition ${
                                                                    !r.available
                                                                        ? 'opacity-40 cursor-not-allowed bg-gray-50 dark:bg-dark-3/50'
                                                                        : selectedDomain.value?.domain === r.domain
                                                                            ? 'border-2 border-primary bg-primary/5 cursor-pointer dark:bg-primary/10'
                                                                            : 'border border-transparent cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-3'
                                                                }`}
                                                            >
                                                                <div class="flex items-center gap-2">
                                                                    {/* Radio */}
                                                                    {r.available && (
                                                                        <div class={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                                                                            selectedDomain.value?.domain === r.domain
                                                                                ? 'border-primary bg-primary text-white'
                                                                                : 'border-gray-300 dark:border-gray-600'
                                                                        }`}>
                                                                            {selectedDomain.value?.domain === r.domain && (
                                                                                <svg class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                                                                </svg>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    {!r.available && (
                                                                        <svg class="h-4 w-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    )}
                                                                    <span class={`font-medium ${r.available ? 'text-dark dark:text-white' : 'text-body-color line-through dark:text-dark-6'}`}>
                                                                        {r.domain}
                                                                    </span>
                                                                </div>
                                                                <div class="flex items-center gap-2">
                                                                    {r.price && (
                                                                        <span class={`text-xs font-bold ${r.available ? 'text-emerald-600 dark:text-emerald-400' : 'text-body-color dark:text-dark-6'}`}>
                                                                            ${r.price}
                                                                            <span class="font-normal text-[10px]">/yr</span>
                                                                        </span>
                                                                    )}
                                                                    {r.available ? (
                                                                        <span class="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">AVAILABLE</span>
                                                                    ) : (
                                                                        <span class="rounded bg-red-100 px-1.5 py-0.5 text-[9px] font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">TAKEN</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {!domainResults.value.some(r => r.available) && (
                                                        <p class="mt-1 text-center text-xs text-red-500 dark:text-red-400">
                                                            No extensions available for this name. Try a different domain.
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                            {domainStatus.value === 'error' && (
                                                <p class="mt-2 flex items-center gap-1 text-[11px] font-medium text-red-500 dark:text-red-400">
                                                    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {domainError.value}
                                                </p>
                                            )}
                                            {domainStatus.value === 'idle' && (
                                                <p class="mt-2 text-[11px] text-amber-600 dark:text-amber-500">
                                                    Enter a domain name and click Check to see available extensions.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Existing Domain Option */}
                                <div 
                                    class={`cursor-pointer rounded-xl border-2 p-5 transition-all ${
                                        domainOption.value === 'existing'
                                            ? 'border-primary bg-primary/5 dark:bg-primary/10 ring-2 ring-primary ring-opacity-20' 
                                            : 'border-stroke hover:border-primary/50 dark:border-dark-3'
                                    }`}
                                    onClick$={() => domainOption.value = 'existing'}
                                >
                                    <div class="flex items-center justify-between mb-3">
                                        <div class="flex items-center gap-2">
                                            <h3 class="font-semibold text-dark dark:text-white">Existing Domain</h3>
                                            <span class="flex items-center gap-1 rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-600 shadow-sm dark:bg-amber-900/30 dark:text-amber-500">
                                                {/* Premium Star Icon */}
                                                <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                PRO
                                            </span>
                                        </div>
                                        <div class={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${domainOption.value === 'existing' ? 'border-primary bg-primary text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                            {domainOption.value === 'existing' && (
                                                <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>

                                    {domainOption.value === 'existing' && (
                                        <div class="mt-4 animate-[fadeIn_0.3s_ease-out] space-y-4">
                                            <div>
                                                <label class="mb-1.5 block text-xs font-medium text-dark dark:text-white">Your domain</label>
                                                <input 
                                                    type="text" 
                                                    value={existingDomain.value}
                                                    onInput$={(e) => existingDomain.value = (e.target as HTMLInputElement).value}
                                                    class="w-full rounded-md border border-stroke bg-white px-4 py-2.5 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary" 
                                                    placeholder="e.g. yourdomain.com"
                                                />
                                            </div>

                                            <div class="rounded-lg border border-sky-200 bg-sky-50/50 p-4 dark:border-sky-800 dark:bg-sky-900/20">
                                                <div class="flex items-center gap-2 mb-3">
                                                    <svg class="h-4 w-4 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span class="text-xs font-semibold text-sky-700 dark:text-sky-400">Change your nameservers to:</span>
                                                </div>
                                                <div class="space-y-2">
                                                    {[
                                                        { label: 'Nameserver 1', value: 'best.jagoanhosting.com' },
                                                        { label: 'Nameserver 2', value: 'great.jagoanhosting.com' },
                                                        { label: 'Nameserver 3', value: 'one.jagoanhosting.com' },
                                                    ].map((ns) => (
                                                        <div key={ns.label} class="flex items-center justify-between rounded-md border border-stroke bg-white px-3 py-2 dark:border-dark-3 dark:bg-dark-2">
                                                            <div>
                                                                <p class="text-[10px] text-body-color dark:text-dark-6">{ns.label}</p>
                                                                <p class="text-xs font-mono font-semibold text-dark dark:text-white">{ns.value}</p>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick$={() => navigator.clipboard.writeText(ns.value)}
                                                                class="flex h-7 w-7 items-center justify-center rounded-md text-body-color transition hover:bg-gray-100 hover:text-primary dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-primary cursor-pointer"
                                                                title={`Copy ${ns.value}`}
                                                            >
                                                                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                                <p class="mt-3 text-[11px] text-sky-600 dark:text-sky-400">
                                                    Update these at your domain registrar. DNS propagation may take up to 48 hours.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    disabled={
                                        (domainOption.value === 'subdomain' && !subdomain.value.trim()) ||
                                        (domainOption.value === 'custom' && !customDomain.value.trim()) ||
                                        (domainOption.value === 'existing' && !existingDomain.value.trim())
                                    }
                                    onClick$={async () => await nav('/dashboard')}
                                    class="mt-8 flex w-full items-center justify-center rounded-md bg-primary px-8 py-3.5 text-center text-base font-medium text-white shadow-md transition hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    Complete Setup
                                    <svg class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

            {/* ─── Domain Registration Payment Modal ─── */}
            {showRegister.value && (
                <div
                    class="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
                    onClick$={(e) => { if (e.target === e.currentTarget) showRegister.value = false; }}
                >
                    <div class="w-full max-w-md overflow-hidden rounded-2xl border border-stroke bg-white shadow-2xl dark:border-dark-3 dark:bg-dark-2">

                        {/* Modal header */}
                        <div
                            class="relative px-8 py-6 text-center"
                            style="background: linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(52,211,153,0.08) 100%);"
                        >
                            <button
                                onClick$={() => showRegister.value = false}
                                class="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-body-color transition hover:bg-gray-100 dark:text-dark-6 dark:hover:bg-dark-3"
                                aria-label="Close"
                            >
                                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md dark:bg-dark-3">
                                <svg class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            </div>
                            <h2 class="text-xl font-bold text-dark dark:text-dark">Register Domain</h2>
                            <p class="mt-1 text-sm text-body-color dark:text-dark-6">
                                {selectedDomain.value?.domain || customDomain.value}
                            </p>
                        </div>

                        {/* Order summary */}
                        <div class="border-b border-stroke px-8 py-4 dark:border-dark-3">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-dark dark:text-white">{selectedDomain.value?.domain}</p>
                                    <p class="text-xs text-body-color dark:text-dark-6">1 year · Auto-renew · SSL included</p>
                                </div>
                                <p class="text-lg font-bold text-dark dark:text-white">${selectedDomain.value?.price}</p>
                            </div>
                        </div>

                        {/* Payment via Midtrans */}
                        <div class="px-8 py-6 space-y-4">
                            <div class="rounded-lg border border-sky-200 bg-sky-50/50 p-3 dark:border-sky-800 dark:bg-sky-900/20">
                                <p class="flex items-center gap-2 text-xs text-sky-700 dark:text-sky-400">
                                    <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    You'll be redirected to Midtrans secure payment page.
                                </p>
                            </div>

                            <button
                                type="button"
                                disabled={registerLoading.value}
                                onClick$={handleMidtransRegister}
                                class="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-8 py-3.5 text-base font-medium text-white shadow-md transition hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {registerLoading.value ? (
                                    <svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                ) : (
                                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                )}
                                {registerLoading.value ? 'Processing...' : `Pay $${selectedDomain.value?.price} & Register`}
                            </button>

                            <p class="text-center text-[11px] text-body-color dark:text-dark-6">
                                Secure payment powered by Midtrans. Domain renews at ${selectedDomain.value?.price}/year.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});
