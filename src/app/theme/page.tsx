import React from 'react';
import tailwindConfig from '../../../tailwind.config';
import { Button } from '@/components/ui/button';
const config: Config = tailwindConfig;
import './styles.css';
import { IconButton } from '@/components/ui/icon-button';
import { Cross2Icon, ReloadIcon } from '@radix-ui/react-icons';

interface ColorObject {
    DEFAULT?: string;
    foreground?: string;
    [key: string]: string | undefined;
}

interface ColorEntry {
    name: string;
    value: string | undefined;
}

interface Config {
    theme: {
        extend: {
            colors: {
                [key: string]: string | ColorObject;
            };
        };
    };
}

export default function ColorSheet() {
    const colors = config.theme.extend.colors;
    const resolvedColors: ColorEntry[] = Object.keys(colors).reduce(
        (acc: ColorEntry[], color: string) => {
            const obj: string | ColorObject = colors[color];

            if (typeof obj === 'string') {
                acc.push({
                    name: color,
                    value: colors?.[color] as any,
                });
            } else {
                const colors = Object.keys(obj).map((key) => {
                    if (typeof obj?.[key] === 'string') {
                        return {
                            name: `${color}.${key}`,
                            value: obj?.[key],
                        };
                    }
                });
                acc.push(...(colors.flat() as any));
            }
            return acc;
        },
        []
    );
    return (
        <div className='o'>
            <div className='grid grid-cols-5 gap-10 p-7'>
                {resolvedColors.map((color, index) => (
                    <div key={index} className='flex gap-2 flex-col'>
                        <div
                            className='h-24 rounded-lg'
                            style={{ backgroundColor: color.value }}
                        ></div>
                        <p className='text-xs font-mono'>Name: {color.name}</p>
                        <p className='text-xs font-mono'>Value: {color.value}</p>
                    </div>
                ))}
            </div>
            <div className='space-y-2 p-7'>
                <h2>Buttons</h2>
                <h3>Variants</h3>
                <div className='flex gap-2 pb-2'>
                    <Button variant='default'>Button</Button>
                    <Button variant='secondary'>Button</Button>
                    <Button variant='ghost'>Button</Button>
                </div>
                <h3>Sizes</h3>
                <div className='flex gap-2 pb-2'>
                    <Button>Button</Button>
                    <Button size='sm'>Button</Button>
                    <Button size='lg'>Button</Button>
                    <Button size='icon'>Button</Button>
                </div>
                <h3>Icon Button</h3>
                <div className='flex gap-2 pb-2'>
                    <Button size='icon'>
                        <ReloadIcon className='h-4 w-4' />
                    </Button>
                    <IconButton>
                        <ReloadIcon className='h-4 w-4' />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
