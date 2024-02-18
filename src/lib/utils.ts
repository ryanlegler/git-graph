import { Activity } from 'react-activity-calendar';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getZeroFilledContributions(contributions: Activity[]) {
    const currentYear = contributions.find((c) => c.date)?.date?.split('-')[0];
    const daysOfTheYear = Array.from({ length: 365 }, (_, i) => {
        const date = new Date(parseInt(currentYear || '', 10) || new Date().getFullYear(), 0, 1); // Start from January 1, 2024
        date.setDate(date.getDate() + i); // Add the current index to the date
        return date.toISOString().split('T')[0]; // Format the date as 'YYYY-MM-DD'
    });

    return daysOfTheYear.map((day) => {
        const contribution = contributions.find((c) => c.date === day);
        return contribution || { date: day, count: 0, level: 0 };
    }) satisfies Activity[];
}
