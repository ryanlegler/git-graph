import React, { useCallback, useEffect, useMemo, useState } from 'react';

// types
import { ControlsProps, InferredOptions } from './types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { Form, FormItem } from '@/components/ui/form';
import { SwitchControl } from './switchControl';
import { SliderControl } from './sliderControl';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useSearchParams, useRouter } from 'next/navigation';
import { Label } from '../ui/label';
import { useAtom } from 'jotai';
import { fetchingAtom } from '@/app/atoms';
import { Cross2Icon, ReloadIcon } from '@radix-ui/react-icons';

import { Button } from '../ui/button';
import { INITIAL_OPTIONS } from '../builder/constants';
import { Day } from '@/types';

export const formSchema = z.object({
    showWeekdayLabels: z.boolean().default(true),
    showColorLegend: z.boolean().default(true),
    showMonthLabels: z.boolean().default(true),
    showTotalCount: z.boolean().default(true),
    blockMargin: z.number().default(4),
    blockRadius: z.number().default(2),
    blockSize: z.number().default(12),
    fontSize: z.number().default(14),
    weekStart: z.number().default(0),
    // colorScheme: z.enum(['dark', 'light']).default('dark'),
});

function Controls({
    options,
    onChange,
    year,
    years,
    handleToggleControls,
    onReset,
}: ControlsProps) {
    const [_, setFetching] = useAtom(fetchingAtom);
    const searchParams = useSearchParams();
    const userName = searchParams.get('userName');
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: options,
    });

    const handleReset = useCallback(() => {
        form.reset(INITIAL_OPTIONS);
        onReset?.();
    }, [form, onReset]);

    // this was some weird thing with react-hook-form
    const derivedOptions = useWatch({
        control: form.control,
    }) as InferredOptions;
    useEffect(() => {
        onChange?.(derivedOptions);
    }, [derivedOptions, onChange]);

    const handleYearChange = useCallback(
        (value: string) => {
            setFetching(true);
            router.push(`/?userName=${userName}&year=${value}`); // year needs to be dynamic - will need to fetch
        },
        [router, setFetching, userName]
    );

    const hasChanges = useMemo(() => {
        // there's a react-hook form way to do this
        // form.formState.isDirty()
        // but is stays dirty after reset..;
        return JSON.stringify(INITIAL_OPTIONS) !== JSON.stringify(options);
    }, [options]);

    return (
        <Form {...form} data-testid='controls'>
            <div className='bg-black p-5 pb-8 rounded-2xl flex gap-5 flex-col'>
                <div className='flex justify-between'>
                    <h2 className='text-2xl font-bold'>Controls</h2>

                    <div className='flex'>
                        {hasChanges ? (
                            <Button variant='ghost' size='icon' onClick={handleReset}>
                                <ReloadIcon className='h-4 w-4' />
                            </Button>
                        ) : null}
                        <Button variant='ghost' size='icon' onClick={handleToggleControls}>
                            <Cross2Icon className='h-4 w-4' />
                        </Button>
                    </div>
                </div>
                <form>
                    <div className='grid grid-cols-2 gap-7'>
                        <div className='flex gap-5 flex-col '>
                            <FormItem className='flex gap-2 w-full justify-between align-middle'>
                                <Label className='flex items-center' htmlFor={'year'}>
                                    Year
                                </Label>
                                <Select onValueChange={handleYearChange} defaultValue={year}>
                                    <SelectTrigger className='w-[180px]'>
                                        <SelectValue placeholder='Choose a Year' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {years?.map((year) => (
                                            <SelectItem key={year} value={year}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>

                            <SwitchControl form={form} formKey='showWeekdayLabels' />
                            <SwitchControl form={form} formKey='showColorLegend' />
                            <SwitchControl form={form} formKey='showMonthLabels' />
                            <SwitchControl form={form} formKey='showTotalCount' />
                        </div>
                        <div className='flex gap-5 flex-col'>
                            <SliderControl form={form} formKey='blockMargin' min={2} max={20} />
                            <SliderControl form={form} formKey='blockRadius' min={2} max={20} />
                            <SliderControl form={form} formKey='blockSize' min={2} max={20} />
                            <SliderControl form={form} formKey='fontSize' min={6} max={32} />
                            <SliderControl form={form} formKey='weekStart' min={0} max={6} />
                        </div>
                    </div>
                </form>
            </div>
        </Form>
    );
}

export { Controls };
