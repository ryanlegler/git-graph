'use client';
import React, { useCallback, useState } from 'react';

// types
import { BuilderProps } from './types';
import { Header } from '../header';
import { Options } from '@/types';
import { ControlBar } from '../controlBar';
import { Graph } from '../graph';

function Builder({ userName, data }: BuilderProps) {
    const [options, setOptions] = useState<Options>({
        hideColorLegend: false,
        showWeekdayLabels: true,
        hideMonthLabels: false,
        hideTotalCount: false,
        blockMargin: 2,
        blockRadius: 0,
        blockSize: 10,
        fontSize: 14,
        weekStart: 4,
    });

    const handleOnChange = useCallback((options: Options) => {
        setOptions(options);
    }, []);

    return (
        <main
            data-testid='builder'
            className='bg-slate-900 flex min-h-screen flex-col items-center py-[100px] justify-center'
        >
            <div className='flex min-w-[900px] max-w-[1500px]  max-h-[900px] flex-col items-center justify-between gap-10 flex-1'>
                <Header userName={userName} />
                <Graph data={data} options={options} />
                <ControlBar options={options} onChange={handleOnChange} />
            </div>
        </main>
    );
}

export { Builder };
