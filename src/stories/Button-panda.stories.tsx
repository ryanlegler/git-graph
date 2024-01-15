import { Button } from '@/components/ui/button';
import { StyledFlex } from '@/components/ui/flex';
import type { Meta, StoryObj } from '@storybook/react';
import { css } from 'styled-system/css';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Button/Panda',
    decorators: [
        (Story) => {
            // this is to force dark mode - ideally we will add a switcher
            document.body.classList.add('dark');
            return Story();
        },
    ],
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {},
} satisfies Meta<typeof HTMLButtonElement>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
                _focus: {
                    bg: 'github.100',
                },
            })}>
            Click Me
        </button>
    ),
};
