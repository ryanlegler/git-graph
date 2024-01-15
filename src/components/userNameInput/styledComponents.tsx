import { defineRecipe } from '@pandacss/dev';
import { Button } from '../ui/button';
import { css, cva, type RecipeVariantProps } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { ComponentProps } from 'styled-system/types';

// this is just an experiment to see if we can extend the recipe system.
// we should also be able use the global theme and extend the recipes from the panda.config.js file.
// https://park-ui.com/docs/panda/theme/customize#recipes

const buttonStyle = cva({
    base: {
        px: '3',
        py: '1',
        bg: 'github.400',
        color: 'gray.3',
        borderRadius: 'sm',
        cursor: 'pointer',
        transition: 'background 300ms, color 300ms',
        _hover: { bg: 'github.500', color: 'gray.3' },
        _focus: { bg: 'github.500', color: 'gray.3' },
        _disabled: {
            color: 'gray.9',
            bg: 'github.100',
            pointerEvents: 'none',
            cursor: 'not-allowed',
        },
    },
    variants: {
        flavor: {
            secondary: {
                borderWidth: '1px',
                bg: 'github.100',
                borderColor: 'github.400',
                color: 'white',
            },
            outline: { borderWidth: '1px', borderColor: 'red.200' },
        },
        size: {
            sm: { padding: '4', fontSize: '12px' },
            lg: { padding: '8', fontSize: '24px' },
        },
    },
});

export type ButtonVariants = RecipeVariantProps<typeof buttonStyle>;
export const StyledButton = (props: ComponentProps<typeof Button> & ButtonVariants) => (
    <Button className={buttonStyle({ flavor: props.flavor })} {...props} />
);

// This
const inputStyles = cva({
    base: {
        px: '3',
        py: '2',
        bg: 'github.100',
        color: 'gray.1',
        borderRadius: 'md',
        _placeholder: { color: 'gray.9' },
        cursor: 'pointer',
    },
});

export const StyledInput = styled('input', inputStyles);
