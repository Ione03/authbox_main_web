import { QwikAuth$ } from '@auth/qwik';
import Google from '@auth/qwik/providers/google';

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
    (event) => ({
        providers: [
            Google({
                clientId: event.env.get("AUTH_GOOGLE_ID"),
                clientSecret: event.env.get("AUTH_GOOGLE_SECRET"),
            }),
        ],
        trustHost: true,
    })
);
