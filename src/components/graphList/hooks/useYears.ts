import { Contributions } from '@/dataLayer/getContributions';
import { useMemo } from 'react';
import { getYears } from '../utils/getYears';

export function useYears(contributions: Contributions) {
    return useMemo(() => getYears(contributions), [contributions]);
}
