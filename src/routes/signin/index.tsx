import { component$ } from '@builder.io/qwik';
import { SignIn } from '../../components/auth/signin';

export default component$(() => {
    return (
        <section class="relative flex flex-col items-center justify-center bg-white px-4 py-24 dark:bg-dark sm:py-32">
            {/* Subtle background gradient that respects dark/light mode */}
            <div
                class="pointer-events-none absolute inset-0 -z-10"
                style="background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%);"
            />

            {/* Card */}
            <div class="w-full max-w-md overflow-hidden rounded-2xl border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-dark-2">

                {/* Card header strip */}
                <div
                    class="px-8 py-8 text-center"
                    style="background: linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.08) 100%);"
                >
                    <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md dark:bg-dark-3">
                        <svg class="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 class="text-2xl font-bold tracking-tight text-dark dark:text-dark">
                        Welcome back
                    </h1>
                    <p class="mt-1 text-sm text-body-color dark:text-dark-6">
                        Sign in to your Authbox account to continue
                    </p>
                </div>

                {/* Card body */}
                <div class="px-8 py-8">
                    <div class="flex flex-col items-center gap-4">
                        <SignIn />
                        <p class="text-center text-xs text-body-color dark:text-dark-6">
                            By signing in, you agree to our{' '}
                            <a href="/terms" class="text-primary underline-offset-2 hover:underline">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="/privacy" class="text-primary underline-offset-2 hover:underline">
                                Privacy Policy
                            </a>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
});
