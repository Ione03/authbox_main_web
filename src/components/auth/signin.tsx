import { component$ } from '@builder.io/qwik';
import { useSignIn } from '../../routes/plugin@auth';

export const SignIn = component$(() => {
    const signIn = useSignIn();

    return (
        <button
            onClick$={() => signIn.submit({ providerId: 'google' })}
            class="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow ring-1 ring-gray-300 hover:bg-gray-50 dark:bg-dark dark:text-white dark:ring-gray-600 dark:hover:bg-gray-800"
        >
            <img
                src="https://authjs.dev/img/providers/google.svg"
                alt="Google logo"
                class="h-5 w-5"
            />
            <span>Sign in with Google</span>
        </button>
    );
});
