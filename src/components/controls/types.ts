import { Options } from '@/types';
import { z } from 'zod';
import { formSchema } from './Controls';
export type ControlsProps = {
    options: Options;
    onChange: (options: Options) => void;
    setSelectedYear: (year: string) => void;
    year: string;
};

export type InferredOptions = z.infer<typeof formSchema>;
