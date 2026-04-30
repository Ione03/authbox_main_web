import { server$ } from '@builder.io/qwik-city';

export type MidtransTransactionRequest = {
    orderId: string;
    amount: number;
    itemName: string;
    customerName?: string;
    customerEmail?: string;
};

export type MidtransSnapResponse = {
    token: string | null;
    redirect_url: string | null;
    error: string | null;
};

export const createSnapTransaction = server$(async function (
    req: MidtransTransactionRequest
): Promise<MidtransSnapResponse> {
    const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
    if (!SERVER_KEY) {
        return { token: null, redirect_url: null, error: 'Midtrans server key not configured' };
    }

    const isSandbox = SERVER_KEY.startsWith('SB-');
    const baseUrl = isSandbox
        ? 'https://app.sandbox.midtrans.com/snap/v1/transactions'
        : 'https://app.midtrans.com/snap/v1/transactions';

    const payload = {
        transaction_details: {
            order_id: req.orderId,
            gross_amount: req.amount,
        },
        item_details: [
            {
                id: req.orderId,
                price: req.amount,
                quantity: 1,
                name: req.itemName,
            },
        ],
        customer_details: {
            first_name: req.customerName || 'Customer',
            email: req.customerEmail || 'customer@authbox.web.id',
        },
    };

    try {
        const auth = Buffer.from(`${SERVER_KEY}:`).toString('base64');
        const res = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Basic ${auth}`,
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            return {
                token: null,
                redirect_url: null,
                error: (errData as any)?.error_messages?.join(', ') || `Midtrans error (${res.status})`,
            };
        }

        const data = await res.json();
        return {
            token: (data as any).token || null,
            redirect_url: (data as any).redirect_url || null,
            error: null,
        };
    } catch (err: any) {
        return { token: null, redirect_url: null, error: err.message || 'Failed to create transaction' };
    }
});
