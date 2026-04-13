import { component$ } from '@builder.io/qwik';
import { SignIn } from '../../components/auth/signin';

export default component$(() => {
    return (
        <div class="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-dark">
            <div class="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md dark:bg-dark-2 sm:p-8">
                <div>
                    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Sign in to your account
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Welcome back! Please sign in to continue.
                    </p>
                </div>
                <div class="flex justify-center">
                    <SignIn />
                </div>
            </div>
        </div>
    );
});
