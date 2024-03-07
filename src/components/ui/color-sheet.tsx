import tailwindConfig from '../../../tailwind.config';
const config: Config = tailwindConfig;

type ColorObject = {
    [key: string]: string | undefined;
};

type Config = {
    theme: {
        extend: {
            colors: {
                [key: string]: string | ColorObject;
            };
        };
    };
};

type ColorEntry = {
    name: string;
    value?: string;
};

export function ColorSheet() {
    const colors = config.theme.extend.colors;
    const resolvedColors = Object.keys(colors).reduce((acc: ColorEntry[], colorKey: string) => {
        const obj: string | ColorObject = colors[colorKey];
        if (typeof obj === 'string') {
            return [
                ...acc,
                {
                    name: colorKey,
                    value: obj,
                },
            ];
        } else {
            const colorEntries: ColorEntry[] = Object.keys(obj)
                .filter((key) => typeof obj[key] === 'string')
                .map((key) => ({
                    name: `${colorKey}.${key}`,
                    value: obj[key] as string,
                }));

            return [...acc, ...colorEntries];
        }
    }, []);
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
