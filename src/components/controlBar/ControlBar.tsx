import React, { useCallback, useState } from 'react';

import { HydrationProvider, Server, Client } from 'react-hydration-provider';

// types
import { ControlBarProps } from './types';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { EmbedCodeModal } from '../embedCodeModal';
import { Controls } from '../controls';

function ControlBar({ options, onChange, dimensions, userName, year }: ControlBarProps) {
    const [controlsOpen, setControlsOpen] = useState(false);

    const handleToggleControls = useCallback(() => {
        setControlsOpen((prev) => !prev);
    }, []);

    return (
        <div data-testid='control-bar' className='flex flex-col gap-4 min-w-[900px] max-w-[1500px]'>
            {controlsOpen ? (
                <Controls userName={userName} options={options} onChange={onChange} year={year} />
            ) : null}

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
