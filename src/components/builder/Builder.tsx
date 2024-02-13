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
import { useMouse } from 'react-use';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from '../loadingSpinner';

const GRAPH_OFFSET = '-150px';
function Builder({ year, data }: BuilderProps) {
    const router = useRouter();
    const [ref, { width, height }] = useMeasure();

    const [pageRef, { width: pageWidth, height: pageHeight }] = useMeasure();

    const mouseRef = React.useRef(null);
    const { docX, docY } = useMouse(mouseRef as any);

    const [clientErrorMessage, setClientErrorMessage] = useState('');
    const [formIsSubmitting, setFormIsSubmitting] = useState(false);

    // this is the user name that is pending to be submitted
    const [pendingUserName, setPendingUserName] = useState<null | string>(null);

    // know we are loading if we have a year from the year switcher that doesn't match the year coming in from params
    const [selectedYear, setSelectedYear] = useState<string | null>(null);

    const [controlsOpen, setControlsOpen] = useState(false);

    const isLoadingYear = useMemo(() => {
        // know we are loading if we have a year from the year switcher (selectedYear) and that doesn't match the year coming in from params (year)
        return year && selectedYear && selectedYear !== year;
    }, [selectedYear, year]);

    useEffect(() => {
        if (data && !data.length) {
            setClientErrorMessage('No data found for this user');
        } else if (data && data.length) {
            setClientErrorMessage('');
        }
        setFormIsSubmitting(false);
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

    const onSubmitForm = useCallback(() => {
        setFormIsSubmitting(true);
        const validation = userNameSchema.safeParse(pendingUserName);

        if (!validation.success) {
            setClientErrorMessage(JSON.parse(validation?.error?.message)?.[0]?.message);
            setFormIsSubmitting(false);
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

    const transformOrigin = useMemo(() => {
        const centerX = pageWidth / 2;
        const centerY = pageHeight / 2;
        const deltaX = docX - centerX;
        const deltaY = docY - centerY;
        return `${50 - (deltaX / centerX) * 20}% ${50 - (deltaY / centerY) * 20}%`;
    }, [pageWidth, pageHeight, docX, docY]);

    // this is a hack to get the form to reset instantly when the user clicks to go back to the home page
    const [renderingData, setRenderingData] = useState(true);
    // it takes a bit of time from the client side router to update data back to empty
    const resolvedData = renderingData && data;
    const handleGoHome = useCallback(() => {
        setRenderingData(false);
    }, []);
    // whenever data changes we set it back to renderingData true
    useEffect(() => {
        setRenderingData(true);
    }, [data]);

    return (
        <main
            ref={pageRef as any}
            data-testid='builder'
            className='overflow-hidden graphPaper max-h-screen min-h-screen flex flex-col items-center  justify-center bg-darkBackground'
        >
            <div
                ref={mouseRef}
                className='spotlight origin-center pointer-events-none'
                style={{ transformOrigin }}
                // experimenting with the spotlight effect - and how to make it follow the mouse smoothly
                // I think framer has a way to have a animated interpolated value.
                // It would look more like the show chases the mouse with a little delay and easing / spring
                // style={{ transformOrigin, transition: 'transform-origin .1s ease' }}
            />
            <div
                data-testid='builder-inner'
                className='relative w-full py-[100px] flex  max-h-screen min-h-screen  flex-col items-center  justify-center'
            >
                <AnimatePresence>
                    {resolvedData && data?.length ? (
                        <div className='flex min-w-[900px] max-w-[1500px]  max-h-[900px] flex-col items-center justify-between gap-10 flex-1'>
                            <motion.div
                                transition={{ delay: 0.3 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Header onGoHome={handleGoHome} setSelectedYear={setSelectedYear} />
                            </motion.div>

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

                            <motion.div
                                transition={{ delay: 0.3 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <ControlBar
                                    controlsOpen={controlsOpen}
                                    setControlsOpen={setControlsOpen}
                                    year={year}
                                    options={options}
                                    onChange={handleOnChange}
                                    dimensions={dimensions}
                                    setSelectedYear={handleSetSelectedYear}
                                />
                            </motion.div>
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
                                        Get a personal view of your Github contribution history in
                                        just a few clicks. Customize the look and feel as you see
                                        fit, and embed it on your site in just a few clicks.
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className='flex flex-col gap-10 items-center relative'
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

                                    <Button
                                        type='submit'
                                        onClick={onSubmitForm}
                                        className='flex gap-2'
                                    >
                                        Submit{' '}
                                        {formIsSubmitting ? <LoadingSpinner size='sm' /> : null}
                                    </Button>
                                </div>

                                {clientErrorMessage ? (
                                    <motion.div
                                        className='absolute left-0 -bottom-10 w-full text-center'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className='text-red-500 text-sm '>
                                            {clientErrorMessage}
                                        </div>
                                    </motion.div>
                                ) : null}
                            </motion.div>
                        </div>
                    ) : null}
                </AnimatePresence>
            </div>
        </main>
    );
}

export { Builder };
