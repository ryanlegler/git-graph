import React from "react";
import { FormField, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// types
import { SwitchControlProps } from "./types";

function SwitchControl({ form, formKey }: SwitchControlProps) {
    return (
        <FormField
            control={form.control}
            name={formKey}
            render={({ field }) => (
                <FormItem className="flex gap-2 w-full justify-between">
                    <Label htmlFor={formKey}>{formKey}</Label>
                    <Switch id={formKey} checked={field.value} onCheckedChange={field.onChange} />
                </FormItem>
            )}
        />
    );
}

export { SwitchControl };
