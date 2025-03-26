'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      router.refresh();
    }, 1000);
    return () => clearInterval(refreshInterval);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">Stopwatch</h1>
      <p className="text-2xl my-4">{time} s</p>
      <div className="flex gap-4">
        <button
          onClick={() => setRunning(!running)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => { setTime(0); setRunning(false); }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}