import { defineRecipe } from '@pandacss/dev';

export const buttonRecipe = defineRecipe({
    className: 'button',
    base: {},
    variants: {
        variant: {
            // this overrides the solid variant
            solid: {
                bg: 'github.400',
                color: 'white',
                transition: 'background 300ms, color 300ms',
                _hover: { bg: 'github.500' },
                _focus: { bg: 'github.500' },
                _disabled: {
                    color: 'gray.9',
                    bg: 'github.100',
                    pointerEvents: 'none',
                    cursor: 'not-allowed',
                },
            },
            // this is a new variant
            secondary: {
                borderWidth: '1px',
                bg: 'github.100',
                borderColor: 'github.400',
                color: 'white',
            },
        },
    },
});
