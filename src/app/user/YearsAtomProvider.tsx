'use client';

import { selectedYearsAtom } from '@/atoms';
import { useHydrateAtoms } from 'jotai/utils';
import { PropsWithChildren } from 'react';

export type BuilderProps = PropsWithChildren<{ years?: number[] }>;

const HydrateAtoms = ({ initialValues, children }: any) => {
    useHydrateAtoms(initialValues);
    return children;
};

export const YearsAtomProvider = ({ children, years }: BuilderProps) => {
    return (
        <HydrateAtoms initialValues={[[selectedYearsAtom, years]]}>
            <>{children}</>
        </HydrateAtoms>
    );
};
