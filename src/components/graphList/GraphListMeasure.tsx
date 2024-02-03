'use client';

import { dimensionsAtom } from '@/atoms';
import { useAtom } from 'jotai/react';

import { LegacyRef, use, useEffect } from 'react';
import { useMeasure } from 'react-use';

export type Dimensions = { height: number; width: number };

export function GraphListMeasure({ children }: { children: React.ReactNode }) {
    const [ref, { width, height }] = useMeasure();
    const [_, setDimensions] = useAtom(dimensionsAtom);

    useEffect(() => {
        if (width && height) {
            setDimensions({ width, height });
        }
    }, [width, height, setDimensions]);

    return <div ref={ref as LegacyRef<HTMLDivElement>}>{children}</div>;
}
