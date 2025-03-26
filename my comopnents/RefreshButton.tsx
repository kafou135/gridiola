'use client';

import { useRouter } from 'next/navigation';
import { useTransition, useEffect } from 'react';

export default function RefreshButton() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const interval = setInterval(() => {
            startTransition(() => router.refresh());
        }, 13000); // Refresh every 12 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [router]);

    return (
        <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            onClick={() => startTransition(() => router.refresh())}
            disabled={isPending}
        >
            {isPending ? 'Refreshing...' : 'Refresh Data'}
        </button>
    );
}
