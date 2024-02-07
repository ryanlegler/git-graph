import { Options } from '@/types';

export type ControlsProps = {
    options: Options;
    onChange: (options: Options) => void;
    userName: string;
};
