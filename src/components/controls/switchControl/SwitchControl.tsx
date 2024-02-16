import React from 'react';
import { FormField, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { SwitchControlProps } from './types';
import { Switch } from '@/components/ui/switch';
import { FORM_LABELS } from '../constants';

function SwitchControl({ form, formKey }: SwitchControlProps) {
    return (
        <FormField
            control={form.control}
            name={formKey}
            render={({ field }) => (
                <FormItem className='flex gap-2 w-full justify-between'>
                    <Label className='flex items-center' htmlFor={formKey}>
                        {FORM_LABELS[formKey]}
                    </Label>
                    <Switch id={formKey} checked={field.value} onCheckedChange={field.onChange} />
                </FormItem>
            )}
        />
    );
}

export { SwitchControl };
