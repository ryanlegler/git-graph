import React, { use, useCallback, useEffect, useState } from 'react';
// type InferredOptions = z.infer<typeof FormSchema>;

// types
import { ControlsProps } from './types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Options } from '@/types';
import { SwitchControl } from './switchControl';
import { SliderControl } from './sliderControl';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
    showWeekdayLabels: z.boolean().default(false),
    hideColorLegend: z.boolean().default(false),
    hideMonthLabels: z.boolean().default(false),
    hideTotalCount: z.boolean().default(false),
    blockMargin: z.number().default(4),
    blockRadius: z.number().default(2),
    blockSize: z.number().default(12),
    fontSize: z.number().default(14),
    weekStart: z.number().default(0),
    colorScheme: z.enum(['dark', 'light']).default('dark'),
});

function Controls({
    options,
    onChange,
    userName,
    year: initialYear,
    setSelectedYear,
}: ControlsProps) {
    const router = useRouter();
    const [years, setYears] = useState<string[]>([]);
    const currentYear = new Date().getFullYear().toString();
    const [year, setYear] = useState<string>(initialYear || currentYear);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: options,
    });

    // this set the year if the the current year is not in the list of years
    useEffect(() => {
        const noYear = !initialYear && years.includes(currentYear);
        if (noYear) {
            router.push(`/?userName=${userName}&year=${years[0]}`); // year needs to be dynamic - will need to fetch
        }
    }, [currentYear, initialYear, router, userName, years]);

    // this was some weird thing with react-hook-form
    const all = useWatch({
        control: form.control,
    }) as Options;
    useEffect(() => {
        onChange?.(all);
    }, [all, onChange]);

    // could probably use a server action here
    // or find a way to compose this as a server component
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/getYears/${userName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            const resolvedYears: string[] = data.map((year: number) => year.toString());
            setYears(resolvedYears);
        };

        fetchData();
    }, [userName]);

    const onYearChange = useCallback(
        (value: string) => {
            setYear(value); // sets the local year - could consolidate to just use setSelectedYear
            setSelectedYear(value); // sets the year in the parent
            router.push(`/?userName=${userName}&year=${value}`); // year needs to be dynamic - will need to fetch
        },
        [router, setSelectedYear, userName]
    );

    return (
        <Form {...form} data-testid='controls'>
            <div className='bg-black p-5 pb-8 rounded-2xl flex gap-5 flex-col'>
                <h2 className='text-2xl font-bold'>Controls</h2>
                <form>
                    <div className='grid grid-cols-2 gap-7'>
                        <div className='flex gap-5 flex-col '>
                            <Select onValueChange={onYearChange} defaultValue={year}>
                                <SelectTrigger className='w-[180px]'>
                                    <SelectValue placeholder='Choose a Year' />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map((year) => (
                                        <SelectItem key={year} value={year}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <SwitchControl form={form} formKey='showWeekdayLabels' />
                            <SwitchControl form={form} formKey='hideColorLegend' />
                            <SwitchControl form={form} formKey='hideMonthLabels' />
                            <SwitchControl form={form} formKey='hideTotalCount' />
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
