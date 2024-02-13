import React, { useCallback, useState } from 'react';

import { HydrationProvider, Server, Client } from 'react-hydration-provider';

// types
import { ControlBarProps } from './types';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { EmbedCodeModal } from '../embedCodeModal';
import { Controls } from '../controls';

import { motion, AnimatePresence } from 'framer-motion';

function ControlBar({
    options,
    dimensions,

    controlsOpen,
    year,
    onChange,
    setSelectedYear,
    setControlsOpen,
}: ControlBarProps) {
    const handleToggleControls = useCallback(() => {
        setControlsOpen((prev) => !prev);
    }, [setControlsOpen]);

    return (
        <div
            data-testid='control-bar'
            className='flex flex-col gap-4 min-w-[900px] max-w-[1500px] relative'
        >
            <AnimatePresence>
                {controlsOpen ? (
                    <motion.div
                        className='absolute bottom-12 left-0 right-0'
                        initial={{ opacity: 0, translateY: '20px' }}
                        animate={{ opacity: 1, translateY: '0px' }}
                        exit={{ opacity: 0, translateY: '20px' }}
                    >
                        <Controls
                            setSelectedYear={setSelectedYear}
                            options={options}
                            onChange={onChange}
                            year={year}
                        />
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <div className='flex justify-center gap-4'>
                <Button onClick={handleToggleControls}>Customize</Button>
                <HydrationProvider>
                    <Client>
                        <Dialog>
                            <DialogTrigger>
                                <Button variant='secondary'>Get Embed</Button>
                            </DialogTrigger>
                            <EmbedCodeModal year={year} options={options} dimensions={dimensions} />
                        </Dialog>
                    </Client>
                    <Server>
                        <Button variant='secondary'>Get Embed</Button>
                    </Server>
                </HydrationProvider>
            </div>
        </div>
    );
}

export { ControlBar };
