import { useMemo } from 'react';
import { Day } from '../types';

// use the hook in a "use client" component
export function useDayString(day: Day) {
    return useMemo(() => {
        return getDayString(day);
    }, [day]);
}

// this can be used server side if we ever want to pre-render this information
export function getDayString(day: Day) {
    const date = new Date();
    date.setDate(day);
    return date.toLocaleString('en-US', { weekday: 'long' });
}
