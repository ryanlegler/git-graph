'use client';

import { selectedYearsAtom, optionsAtom, OPTIONS_DEFAULTS } from '@/atoms';
import { useHydrateAtoms } from 'jotai/utils';
import { PropsWithChildren } from 'react';
import { useHydrateSearchParams } from './hooks/useHydrateSearchParams';

export type BuilderProps = PropsWithChildren<{
    searchParams: Record<string, string>;
    years: number[];
}>;

const HydrateAtoms = ({ initialValues, children }: PropsWithChildren<any>) => {
    useHydrateAtoms(initialValues);
    return children;
};

export const AtomProvider = ({ children, searchParams, years: initialYears }: BuilderProps) => {
    const hydratedParams = useHydrateSearchParams(searchParams);
    const { years = [], ...options } = hydratedParams;

    const mergedOptions = { ...OPTIONS_DEFAULTS, ...options };
    const mergedYears = years?.length ? years : initialYears;

    return (
        <HydrateAtoms initialValues={[[selectedYearsAtom, mergedYears]]}>
            <HydrateAtoms initialValues={[[optionsAtom, mergedOptions]]}>
                <>{children}</>
            </HydrateAtoms>
        </HydrateAtoms>
    );
};
