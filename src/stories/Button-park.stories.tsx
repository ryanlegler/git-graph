import { Button } from '@/components/ui/button';
import { StyledFlex } from '@/components/ui/flex';
import type { Meta, StoryObj } from '@storybook/react';
import { css } from 'styled-system/css';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Button/ParkUI',
    component: Button,
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
        controls: {
            include: ['variant', 'size'],
        },
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        variant: {
            options: ['solid', 'outline', 'ghost', 'link'],
            control: 'select',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithControls: Story = {
    args: {
        variant: 'solid',
        children: 'Click Me',
        size: 'md',
    },
};

export const AllTheSizes: Story = {
    parameters: {
        controls: { hideNoControlsWarning: true, include: [] },
    },
    render: (args) => (
        <StyledFlex direction='vertical' gap='3'>
            <Button size='xs'>Size: xs</Button>
            <Button size='sm'>Size: sm</Button>
            <Button size='md'>Size: md</Button>
            <Button size='xl'>Size: xl</Button>
            <Button size='lg'>Size: lg</Button>
            <Button size='2xl'>Size: 2xl</Button>
        </StyledFlex>
    ),
};

export const AllTheVariants: Story = {
    parameters: {
        controls: { hideNoControlsWarning: true, include: [] },
    },
    render: (args) => (
        <StyledFlex direction='vertical' gap='3'>
            <Button variant='solid'>solid</Button>
            <Button variant='link'>link</Button>
            <Button variant='ghost'>ghost</Button>
            <Button variant='outline'>outline</Button>
            <Button variant='secondary'>secondary</Button>
        </StyledFlex>
    ),
};

// This is maybe NOT the best way to handle things...
// In this case The utility of park-ui seems questionable - note how the variants will interact with the css function derived classes
export const WithCSS: Story = {
    args: {
        variant: 'solid',
        children: 'Click Me',
        size: 'md',
    },
    render: (args) => (
        <Button
            {...args}
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
            Custom
        </Button>
    ),
};
