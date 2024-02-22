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

        // console.log('obj', obj);

        const colors = Object.keys(obj).map((key) => {
            if (typeof obj?.[key] === 'string') {
                return {
                    name: `${color}.${key}`,
                    value: obj?.[key],
                };
            }
            // return {
            //     name: `${color}.${key}`,
            //     value: obj?.[key],
            // };
        });
        console.log('colors', colors);
        // acc.push(colors);

        if (typeof obj === 'string') {
            acc.push({
                name: color,
                value: config?.theme?.extend?.colors?.[color],
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
            acc.push(...colors.flat());
        }
        return acc;
    }, []);

    console.log('resolvedColors', resolvedColors);

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
