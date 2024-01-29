'use client';

import { selectedYearAtom } from '@/atoms';
import { useHydrateAtoms } from 'jotai/utils';
import { PropsWithChildren } from 'react';

export type BuilderProps = PropsWithChildren<{ initialYear?: number }>;

const HydrateAtoms = ({ initialValues, children }: any) => {
    useHydrateAtoms(initialValues);
    return children;
};

export const YearsAtomProvider = ({ children, initialYear }: BuilderProps) => {
    return (
        <HydrateAtoms initialValues={[[selectedYearAtom, initialYear]]}>
            <>{children}</>
        </HydrateAtoms>
    );
};
