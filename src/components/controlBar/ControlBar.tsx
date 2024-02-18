import React, { useCallback } from 'react';

import { HydrationProvider, Server, Client } from 'react-hydration-provider';

// types
import { ControlBarProps } from './types';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { EmbedCodeModal } from '../embedCodeModal';
import { Controls } from '../controls';

import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_OPTIONS } from '../builder/constants';

function ControlBar({
    options,
    dimensions,
    years,
    controlsOpen,
    year,
    onChange,
    setControlsOpen,
}: ControlBarProps) {
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleToggleControls = useCallback(() => {
        setControlsOpen((prev) => !prev);
    }, [setControlsOpen]);
    const handleOnReset = useCallback(() => {
        onChange(INITIAL_OPTIONS);
    }, [onChange]);

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
                            years={years}
                            handleToggleControls={handleToggleControls}
                            onReset={handleOnReset}
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
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger>
                                <Button variant='secondary'>Get Embed</Button>
                            </DialogTrigger>
                            <EmbedCodeModal
                                year={year}
                                options={options}
                                dimensions={dimensions}
                                setDialogOpen={setDialogOpen}
                            />
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
