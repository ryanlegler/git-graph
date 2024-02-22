'use client';
import React, { LegacyRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';

// types
import { BuilderProps, userNameSchema } from './types';
import { Header } from '../header';
import { ControlBar } from '../controlBar';
import { Graph } from '../graph';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useMeasure } from 'react-use';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from '../loadingSpinner';
import { useTransformOrigin } from './hooks/useTransformOrigin';
import { GRAPH_OFFSET, INITIAL_OPTIONS } from './constants';
import { useAtom } from 'jotai';
import { fetchingAtom } from '@/app/atoms';
import { InferredOptions } from '../controls/types';

function Builder({ year, data, years }: BuilderProps) {
    const [fetching, setFetching] = useAtom(fetchingAtom);
    const router = useRouter();
    const [ref, { width, height }] = useMeasure();
    const [clientErrorMessage, setClientErrorMessage] = useState('');
    const [formIsSubmitting, setFormIsSubmitting] = useState(true);

    // this is the user name that is pending to be submitted
    const [pendingUserName, setPendingUserName] = useState<null | string>(null);

    // we add some delay to the enter animation if the user name is already set
    const enterDelay = pendingUserName ? 0.3 : 0;

    const [controlsOpen, setControlsOpen] = useState(false);
    const [options, setOptions] = useState<InferredOptions>(INITIAL_OPTIONS);

    useEffect(() => {
        if (data && !data.length) {
            setClientErrorMessage('No data found for this user');
        } else if (data && data.length) {
            setClientErrorMessage('');
        }
        setFormIsSubmitting(false);
    }, [data]);

    const handleOnChange = useCallback((options: InferredOptions) => {
        setOptions(options);
    }, []);

    const handleInputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPendingUserName(e.target.value);
        // clear the error message when the user starts typing again
        setClientErrorMessage('');
    }, []);

    const onSubmitForm = useCallback(() => {
        // show the loading spinner
        setFormIsSubmitting(true);
        const validation = userNameSchema.safeParse(pendingUserName);

        if (!validation.success) {
            setClientErrorMessage(JSON.parse(validation?.error?.message)?.[0]?.message);
            // hide the loading spinner
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

    // Custom hook that takes the ref of the page and the ref of the mouse
    // and returns the transformOrigin for the spotlight effect
    const { transformOrigin, pageRef, mouseRef } = useTransformOrigin();

    useEffect(() => {
        setFetching(false);
    }, [data, setFetching]);

    useEffect(() => {
        console.log('mount');
    }, []);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitForm();
    };

    return (
        <main
            ref={pageRef as any}
            data-testid='builder'
            className='overflow-hidden graphPaper max-h-screen min-h-screen flex flex-col items-center justify-center bg-primary-background'
        >
            <div
                ref={mouseRef}
                className='spotlight origin-center pointer-events-none'
                style={{ transformOrigin }}
            />
            <div
                data-testid='builder-inner'
                className='relative w-full py-[100px] flex  max-h-screen min-h-screen  flex-col items-center  justify-center'
            >
                <AnimatePresence>
                    {data && data?.length ? (
                        <div className='flex min-w-[900px] max-w-[1500px]  max-h-[900px] flex-col items-center justify-between gap-10 flex-1'>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                                exit={{ opacity: 0 }}
                            >
                                <Header />
                            </motion.div>

                            <div ref={ref as LegacyRef<HTMLDivElement>}>
                                <motion.div
                                    initial={{ translateY: controlsOpen ? GRAPH_OFFSET : 0 }}
                                    animate={{ translateY: controlsOpen ? GRAPH_OFFSET : 0 }}
                                    exit={{ translateY: controlsOpen ? GRAPH_OFFSET : 0 }}
                                >
                                    {fetching ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <LoadingSpinner />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, transition: { delay: 0.3 } }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <Graph data={data} options={options} />
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                                exit={{ opacity: 0 }}
                            >
                                <ControlBar
                                    controlsOpen={controlsOpen}
                                    setControlsOpen={setControlsOpen}
                                    year={year}
                                    years={years}
                                    options={options}
                                    onChange={handleOnChange}
                                    dimensions={dimensions}
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
                                animate={{ opacity: 1, transition: { delay: enterDelay } }}
                                exit={{ opacity: 0, translateY: '-50px' }}
                            >
                                <div className='text-8xl'>🐙</div>
                                <div className='flex flex-col gap-4 items-center'>
                                    <h1 className='text-5xl font-semibold'>Git Graph</h1>
                                    <div className='text-center text-lg text-muted-foreground max-w-3xl leading-snug antialiased'>
                                        Get a personal view of your Github contribution history.
                                        Customize the look and feel as you see fit, and embed it on
                                        your site in just a few clicks.
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className='flex flex-col gap-10 items-center relative'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: enterDelay } }}
                                exit={{ opacity: 0, translateY: '50px' }}
                            >
                                <form
                                    onSubmit={handleOnSubmit}
                                    className='flex w-full max-w-sm items-center space-x-2'
                                >
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
                                </form>

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
