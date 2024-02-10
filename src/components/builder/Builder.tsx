'use client';
import React, { LegacyRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';

// types
import { BuilderProps, userNameSchema } from './types';
import { Header } from '../header';
import { Options } from '@/types';
import { ControlBar } from '../controlBar';
import { Graph } from '../graph';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useMeasure } from 'react-use';

import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from '../loadingSpinner';

const GRAPH_OFFSET = '-150px';
function Builder({ userName, year, data }: BuilderProps) {
    const router = useRouter();
    const [ref, { width, height }] = useMeasure();

    const [clientErrorMessage, setClientErrorMessage] = useState('');

    // this is the user name that is pending to be submitted
    const [pendingUserName, setPendingUserName] = useState<null | string>(null);

    // know we are loading if we have a year from the year switcher that doesn't match the year coming in from params
    const [selectedYear, setSelectedYear] = useState<string | null>(null);

    const [controlsOpen, setControlsOpen] = useState(false);

    // // this keeps track of when we have used the year switcher and are waiting for the new year to load from the root server component
    // const [isLoadingYear, setIsLoadingYear] = useState(false);
    // useEffect(() => {
    //     // know we are loading if we have a year from the year switcher (selectedYear) and that doesn't match the year coming in from params (year)
    //     if (year && selectedYear && selectedYear !== year) {
    //         setIsLoadingYear(true);
    //     } else {
    //         setIsLoadingYear(false);
    //     }
    // }, [selectedYear, router, userName, year]);

    // should be need for state
    const isLoadingYear = useMemo(() => {
        // know we are loading if we have a year from the year switcher (selectedYear) and that doesn't match the year coming in from params (year)
        if (year && selectedYear && selectedYear !== year) {
            return true;
        } else {
            return false;
        }
    }, [selectedYear, year]);

    useEffect(() => {
        if (data && !data.length) {
            setClientErrorMessage('No data found for this user');
        } else if (data && data.length) {
            setClientErrorMessage('');
        }
    }, [data]);

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

        // clear the error message when the user starts typing again
        setClientErrorMessage('');
    }, []);

    const onSubmit = useCallback(() => {
        const validation = userNameSchema.safeParse(pendingUserName);

        if (!validation.success) {
            setClientErrorMessage(JSON.parse(validation?.error?.message)?.[0]?.message);
        } else {
            setClientErrorMessage('');
            router.push(`/?userName=${pendingUserName}`); // we don't know the actual year yet. - we assume it's the current year
        }
    }, [pendingUserName, router]);

    const dimensions = useMemo(() => {
        return {
            width,
            height,
        };
    }, [width, height]);

    const handleSetSelectedYear = useCallback((year: string) => {
        setSelectedYear(year);
    }, []);

    return (
        <main
            data-testid='builder'
            className='flex min-h-screen flex-col items-center py-[100px] justify-center bg-darkBackground'
        >
            <AnimatePresence>
                {data?.length ? (
                    <div className='flex min-w-[900px] max-w-[1500px]  max-h-[900px] flex-col items-center justify-between gap-10 flex-1'>
                        <Header userName={userName} setSelectedYear={setSelectedYear} />

                        <div ref={ref as LegacyRef<HTMLDivElement>}>
                            <motion.div
                                initial={{ translateY: controlsOpen ? GRAPH_OFFSET : 0 }}
                                animate={{ translateY: controlsOpen ? GRAPH_OFFSET : 0 }}
                                exit={{ translateY: controlsOpen ? GRAPH_OFFSET : 0 }}
                            >
                                {isLoadingYear ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <LoadingSpinner />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        transition={{ delay: 0.3 }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <Graph data={data} options={options} />
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>

                        <ControlBar
                            controlsOpen={controlsOpen}
                            setControlsOpen={setControlsOpen}
                            year={year}
                            userName={userName}
                            options={options}
                            onChange={handleOnChange}
                            dimensions={dimensions}
                            setSelectedYear={handleSetSelectedYear}
                        />
                    </div>
                ) : null}
            </AnimatePresence>

            <AnimatePresence>
                {!data?.length ? (
                    <div className='absolute flex flex-col gap-10 items-center'>
                        <motion.div
                            className='flex flex-col gap-10 items-center'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, translateY: '-50px' }}
                        >
                            <div className='text-8xl'>🐙</div>
                            <div className='flex flex-col gap-4 items-center'>
                                <h1 className='text-5xl font-semibold'>Git Graph</h1>
                                <div className='text-center text-lg text-muted max-w-3xl leading-snug antialiased'>
                                    Get a personal view of your Github contribution history in just
                                    a few clicks. Customize the look and feel as you see fit, and
                                    embed it on your site in just a few clicks.
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className='flex flex-col gap-10 items-center'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, translateY: '50px' }}
                        >
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

                            {clientErrorMessage ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className='text-red-500 text-sm'>{clientErrorMessage}</div>
                                </motion.div>
                            ) : null}
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
        </main>
    );
}

export { Builder };
