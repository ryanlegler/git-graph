import { ContributionsByYear } from '@/dataLayer/getContributions';
import { useMemo } from 'react';
import { getYears } from '../utils/getYears';

export function useYears(contributions: ContributionsByYear) {
    return useMemo(() => getYears(contributions), [contributions]);
}
