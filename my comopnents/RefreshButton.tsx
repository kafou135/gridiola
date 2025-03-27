'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function RefreshButton() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition(); // Optimize UI during refresh

    return (
        <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            onClick={() => startTransition(() => router.refresh())}
            disabled={isPending} // Disable button while refreshing
        >
            {isPending ? 'Refreshing...' : 'Refresh Data'}
        </button>
    );
}
