import { UseFormReturn } from 'react-hook-form';
import { InferredOptions } from '../types';

export type SwitchControlProps = {
    form: UseFormReturn<any>;
    formKey: keyof InferredOptions;
};
