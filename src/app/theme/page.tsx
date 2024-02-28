import React from 'react';
import tailwindConfig from '../../../tailwind.config';
import { Button } from '@/components/ui/button';
const config: Config = tailwindConfig;
import './styles.css';
import { IconButton } from '@/components/ui/icon-button';
import { Cross2Icon, ReloadIcon } from '@radix-ui/react-icons';
import { ButtonSheet } from '@/components/ui/component-sheet';

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

export function ColorSheet() {
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
        <div className='grid grid-cols-5 gap-10 p-7'>
            {resolvedColors.map((color, index) => (
                <div key={index} className='flex gap-2 flex-col'>
                    <div className='h-24 rounded-lg' style={{ backgroundColor: color.value }}></div>
                    <p className='text-xs font-mono'>Name: {color.name}</p>
                    <p className='text-xs font-mono'>Value: {color.value}</p>
                </div>
            ))}
        </div>
    );
}

export default function ThemePage() {
    return (
        <div className='o'>
            <ColorSheet />
            <ButtonSheet />
        </div>
    );
}
