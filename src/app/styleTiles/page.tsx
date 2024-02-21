import React from 'react';
import config from '../../../tailwind.config';

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
    const colors = Object.keys(config.theme.extend.colors);

    console.log('colors', colors);

    // some colors are objects like this:

    // {"DEFAULT":"hsl(var(--destructive))","foreground":"hsl(var(--destructive-foreground))"}
    // create a reduce function to handle this

    const resolvedColors: ColorEntry[] = colors.reduce((acc: ColorEntry[], color: string) => {
        const obj: string | ColorObject = config.theme.extend.colors[color];
        if (typeof obj === 'string') {
            acc.push({
                name: color,
                value: config?.theme?.extend?.colors?.[color],
            });
        } else {
            acc.push({
                name: `${color}.DEFAULT`,
                value: obj.DEFAULT,
            });
            acc.push({
                name: `${color}.foreground`,
                value: obj.foreground,
            });
        }
        return acc;
    }, []);

    return (
        <div className='grid grid-cols-5 gap-10 p-7'>
            {resolvedColors.map((color) => (
                <div key={color} className='flex gap-2 flex-col'>
                    <div className='h-24 rounded-lg' style={{ backgroundColor: color.value }}></div>
                    <p className='text-xs font-mono'>Name: {color.name}</p>
                    <p className='text-xs font-mono'>Value: {color.value}</p>
                </div>
            ))}
        </div>
    );
}
