'use client';

import { useRouter } from 'next/navigation';
import { useTransition, useEffect } from 'react';

export default function RefreshButton() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition(); // Optimize UI during refresh

    // Auto-click every minute (60000ms)
    useEffect(() => {
        const interval = setInterval(() => {
            startTransition(() => router.refresh());
        }, 60000); // 60000ms = 1 minute

        return () => clearInterval(interval); // Clear interval when component unmounts
    }, [router, startTransition]);

    return (
        <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            onClick={() => startTransition(() => router.refresh())}
            disabled={isPending}
            style={{ display: 'none' }} // Hide the button
        >
            {isPending ? 'Refreshing...' : 'Refresh Data'}
        </button>
    );
}
