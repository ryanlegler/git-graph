import React from 'react';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { ReloadIcon } from '@radix-ui/react-icons';

export const ButtonSheet = () => {
    return (
        <div className='space-y-2 p-7'>
            <h2>Buttons</h2>
            <h3>Variants</h3>
            <div className='flex gap-2 pb-2'>
                <Button variant='default'>Button</Button>
                <Button variant='secondary'>Button</Button>
                <Button variant='ghost'>Button</Button>
            </div>
            <h3>Icon Button</h3>
            <div className='flex gap-2 pb-2'>
                <IconButton>
                    <ReloadIcon className='h-4 w-4' />
                </IconButton>
            </div>
        </div>
    );
};
