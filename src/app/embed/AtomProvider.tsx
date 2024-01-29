'use client';

import { selectedYearAtom, optionsAtom, OPTIONS_DEFAULTS } from '@/atoms';
import { useHydrateAtoms } from 'jotai/utils';
import { PropsWithChildren } from 'react';
import { useHydrateSearchParams } from './hooks/useHydrateSearchParams';

export type BuilderProps = PropsWithChildren<{
    searchParams: Record<string, string>;
    fallbackYear: number;
}>;

const HydrateAtoms = ({ initialValues, children }: PropsWithChildren<any>) => {
    useHydrateAtoms(initialValues);
    return children;
};

export const AtomProvider = ({ children, searchParams, fallbackYear }: BuilderProps) => {
    const hydratedParams = useHydrateSearchParams(searchParams);
    const { year, ...options } = hydratedParams;

    const mergedOptions = { ...OPTIONS_DEFAULTS, ...options };
    const selectedYear = year || fallbackYear;

    return (
        <HydrateAtoms initialValues={[[selectedYearAtom, selectedYear]]}>
            <HydrateAtoms initialValues={[[optionsAtom, mergedOptions]]}>
                <>{children}</>
            </HydrateAtoms>
        </HydrateAtoms>
    );
};
