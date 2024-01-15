import type { Meta, StoryObj } from '@storybook/react';
import { css, cva } from 'styled-system/css';
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
export const Primary: Story = {
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

export const ExtractedStyles: Story = {
    render: () => <button className={flexClassNames}>Click Me</button>,
};

// method 3
const flexRecipe = cva({
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
});
const StyledButton = styled('div', flexRecipe);

export const Styled: Story = {
    render: () => <StyledButton>Click Me</StyledButton>,
};
