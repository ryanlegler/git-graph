import React, { useCallback, useEffect } from "react";

// types
import { ControlsProps } from "./types";

import { Slider } from "@/components/ui/slider";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Label } from "../ui/label";
import { Options } from "@/types";
import { SwitchControl } from "./switchControl";
import { SliderControl } from "./sliderControl";
import { Button } from "../ui/button";

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
    colorScheme: z.enum(["dark", "light"]).default("dark"),
});

// type InferredOptions = z.infer<typeof FormSchema>;

function Controls({ options, onChange }: ControlsProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: options,
    });

    const all = useWatch({
        control: form.control,
    }) as Options;

    useEffect(() => {
        onChange?.(all);
    }, [all, onChange]);

    return (
        <Form {...form} data-testid="controls">
            <h2>Controls</h2>
            <form>
                <div className="grid grid-cols-2 gap-5 debug">
                    <div className="flex gap-2 flex-col debug ">
                        <SwitchControl form={form} formKey="showWeekdayLabels" />
                        <SwitchControl form={form} formKey="hideColorLegend" />
                        <SwitchControl form={form} formKey="hideMonthLabels" />
                        <SwitchControl form={form} formKey="hideTotalCount" />
                    </div>
                    <div className="flex gap-2 flex-col debug">
                        <SliderControl form={form} formKey="blockMargin" min={2} max={20} />
                        <SliderControl form={form} formKey="blockRadius" min={2} max={20} />
                        <SliderControl form={form} formKey="blockSize" min={2} max={20} />
                        <SliderControl form={form} formKey="fontSize" min={6} max={32} />
                        <SliderControl form={form} formKey="weekStart" min={0} max={6} />
                    </div>
                </div>
            </form>
        </Form>
    );
}

export { Controls };
