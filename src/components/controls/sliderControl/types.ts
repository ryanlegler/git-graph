import { UseFormReturn } from "react-hook-form";

export type SliderControlProps = {
    form: UseFormReturn<any>;
    formKey: string;
    max: number;
    min: number;
    step?: number;
};
