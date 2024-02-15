import { Options } from '@/types';

export type ControlsProps = {
    options: Options;
    onChange: (options: Options) => void;
    setSelectedYear: (year: string) => void;
    year: string;
};
