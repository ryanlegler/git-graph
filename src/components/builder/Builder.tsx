'use client';
import React, { LegacyRef, useCallback, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';

// types
import { BuilderProps } from './types';
import { Header } from '../header';
import { Options } from '@/types';
import { ControlBar } from '../controlBar';
import { Graph } from '../graph';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useMeasure } from 'react-use';

function Builder({ userName, data }: BuilderProps) {
    const router = useRouter();
    const [ref, { width, height }] = useMeasure();

    const active = !!userName;
    const [pendingUserName, setPendingUserName] = useState('');
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

    const handleInputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPendingUserName(e.target.value);
    }, []);

    const onSubmit = useCallback(() => {
        // could do server action validation here

        if (!!pendingUserName) {
            router.push(`/?userName=${pendingUserName}&year=2024`); // year needs to be dynamic - will need to fetch
        }
    }, [pendingUserName, router]);

    const dimensions = useMemo(() => {
        return {
            width,
            height,
        };
    }, [width, height]);

    return (
        <main
            data-testid='builder'
            className='bg-slate-900 flex min-h-screen flex-col items-center py-[100px] justify-center'
        >
            {active ? (
                <div className='flex min-w-[900px] max-w-[1500px]  max-h-[900px] flex-col items-center justify-between gap-10 flex-1'>
                    <Header userName={userName} />
                    <div ref={ref as LegacyRef<HTMLDivElement>}>
                        <Graph data={data} options={options} />
                    </div>
                    <ControlBar
                        userName={userName}
                        options={options}
                        onChange={handleOnChange}
                        dimensions={dimensions}
                    />
                </div>
            ) : (
                <div className='flex flex-col gap-4 items-center'>
                    <div className='text-8xl'>🐙</div>
                    <div className='flex w-full max-w-sm items-center space-x-2'>
                        <Input
                            type='text'
                            name='userName'
                            placeholder='GitHub User Name'
                            onChange={handleInputOnChange}
                        />
                        <Button type='submit' onClick={onSubmit}>
                            Submit
                        </Button>
                    </div>
                </div>
            )}
        </main>
    );
}

export { Builder };
