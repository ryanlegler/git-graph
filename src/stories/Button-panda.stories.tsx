import type { Meta, StoryObj } from '@storybook/react';
import { RecipeVariantProps, css, cva } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const meta = {
    title: 'Button/Panda',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof HTMLButtonElement>;

export default meta;
type Story = StoryObj<typeof meta>;

// method 1
export const PrimaryCSS: Story = {
    render: (args) => (
        <button
            className={css({
                bg: 'github.400',
                px: 3,
                py: 2,
                borderRadius: 'md',
                color: 'white',
                cursor: 'pointer',
                _hover: {
                    bg: 'github.100',
                },
            })}>
            Click Me
        </button>
    ),
};

// method 2
const flexClassNames = css({
    bg: 'github.400',
    px: 3,
    py: 2,
    borderRadius: 'md',
    color: 'white',
    cursor: 'pointer',
    _hover: {
        bg: 'github.100',
    },
    _focus: {
        bg: 'github.100',
    },
});

export const ExtractedCSSStyles: Story = {
    render: () => <button className={flexClassNames}>Click Me</button>,
};

// method 3
const flexRecipeCVA = cva({
    base: {
        bg: 'github.400',
        px: 3,
        py: 2,
        borderRadius: 'md',
        color: 'white',
        cursor: 'pointer',
        _hover: {
            bg: 'github.100',
        },
        _focus: {
            bg: 'github.100',
        },
    },
    variants: {
        variant: {
            primary: {
                bg: 'github.400',
                _hover: {
                    bg: 'github.500',
                },
            },
            secondary: {
                bg: 'github.100',
                borderWidth: '1px',
                borderColor: 'github.400',
                color: 'white',
                _hover: {
                    bg: 'github.200',
                    borderColor: 'white',
                },
            },
        },
    },
});
export type ButtonVariants = RecipeVariantProps<typeof flexRecipeCVA>;
const StyledButtonCVA = styled('div', flexRecipeCVA);

type Story2 = StoryObj<ButtonVariants>;
export const StyledCVARecipe: Story2 = {
    argTypes: {
        variant: {
            options: ['primary', 'secondary'],
            control: 'select',
        },
    },
    render: (args: ButtonVariants) => <StyledButtonCVA {...args}> Click Me</StyledButtonCVA>,
    args: {
        variant: 'secondary',
    },
};
