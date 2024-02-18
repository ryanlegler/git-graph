import { Options } from '@/types';
import { z } from 'zod';
import { formSchema } from './Controls';
export type ControlsProps = {
    options: Options;
    onChange: (options: Options) => void;
    year: string;
    years?: string[];
    handleToggleControls: () => void;
    onReset: () => void;
};

export type InferredOptions = z.infer<typeof formSchema>;
