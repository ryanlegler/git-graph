import { z } from 'zod';
import { formSchema } from './Controls';
export type ControlsProps = {
    options: InferredOptions;
    onChange: (options: InferredOptions) => void;
    year: string;
    years?: string[];
    handleToggleControls: () => void;
    onReset: () => void;
};

export type InferredOptions = z.infer<typeof formSchema>;
