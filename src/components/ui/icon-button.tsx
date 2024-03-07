import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { _disabled, _display, _focus, _ghost, _rest, _size, _typography } from './button';

export const _icon = 'h-9 w-9'; // Can refactor out to only icon button

const buttonVariants = cva([_display, _typography, _focus, _disabled, _rest, _icon, _ghost]);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return <Comp className={cn(buttonVariants({ className }))} ref={ref} {...props} />;
    }
);
IconButton.displayName = 'Icon Button';

export { IconButton, buttonVariants };
