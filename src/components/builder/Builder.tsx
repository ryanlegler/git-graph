'use client';
import React, { LegacyRef, Suspense, useCallback, useMemo, useState } from 'react';
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

function Builder({ userName, year, data }: BuilderProps) {
    const router = useRouter();
    const [ref, { width, height }] = useMeasure();

    const active = !!userName;
    const [pendingUserName, setPendingUserName] = useState('');

    const [isLoading, setIsLoading] = useState(false);
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
        // we now assume the current year is valid...
        // the idea with some of this refactor is to fetch as little data up front as possible.
        // previously we fetched all the users contributions before showing anything.
        // now we just fetch the contributions for the current year and then fetch the rest as needed.

        if (!!pendingUserName) {
            // router.push(`/?userName=${pendingUserName}&year=${year}`); // year needs to be dynamic - will need to fetch
            router.push(`/?userName=${pendingUserName}`); // we don't know the actual year yet. - we assume it's the current year
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
                        <Suspense fallback={<div>Loading...</div>}>
                            <Graph data={data} options={options} />
                        </Suspense>
                    </div>

                    <ControlBar
                        year={year}
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
