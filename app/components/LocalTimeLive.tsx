'use client'

import { Livestates } from "@/types.d"
import { useEffect, useState } from "react"
import moment from 'moment';

type PageProps = {
    livefixture: Livestates
}

export default function LocalTime({
    livefixture
}: PageProps) {
    const [formattedTime, setFormattedTime] = useState('');

    useEffect(() => {
        function formatToLocalTime(timeUTC: string): string {
            const newTime = moment(timeUTC);
            const localDateString = newTime.format('dddd, LL');
            const localTimeString = newTime.format('LT');
            return `${localDateString} ${localTimeString}`;
        }

        const fixtureTime = livefixture.fixture.date;
        const formatted = formatToLocalTime(fixtureTime);
        setFormattedTime(formatted);
    }, []);

    return (
        <div className="flex justify-center items-center text-center">{formattedTime}</div>
    )
}