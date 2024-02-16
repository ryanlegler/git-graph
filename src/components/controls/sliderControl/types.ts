import { UseFormReturn } from 'react-hook-form';
import { InferredOptions } from '../types';

export type SliderControlProps = {
    form: UseFormReturn<any>;
    formKey: keyof InferredOptions;
    max: number;
    min: number;
    step?: number;
};
