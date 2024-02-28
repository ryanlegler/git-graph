import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Base Styles
export const _display = 'inline-flex items-center justify-center rounded-md';
export const _typography = 'whitespace-nowrap text-sm font-medium ';
export const _focus = 'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ';
export const _disabled = 'disabled:pointer-events-none disabled:opacity-50 ';
export const _rest = 'transition-colors ';

// Fill
const _fill = 'bg-accent border border-accent-secondary text-primary-foreground';
const _fillHover = 'hover:bg-accent-highlight';

// Stroke
const _stroke = 'bg-secondary text-secondary-foreground shadow-sm border  border-transparent';
const _strokeHover = 'hover:border-accent-secondary';

// Ghost
export const _ghost = 'text-muted-foreground hover:text-primary hover:bg-secondary'; // Maybe can refactor out?

// Sizes
export const _size = 'px-4 h-[34px] text-md';
export const _sm = 'h-8 rounded-md px-3 text-xs';
export const _lg = 'h-10 rounded-md px-8';
export const _icon = 'h-9 w-9'; // Can refactor out to only icon button

const buttonVariants = cva([_display, _typography, _focus, _disabled, _rest], {
    variants: {
        variant: {
            default: [_fill, _fillHover],
            secondary: [_stroke, _strokeHover],
            ghost: [_ghost],
        },
        size: {
            default: _size,
            sm: _sm,
            lg: _lg,
            icon: _icon,
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
