import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Iframe',
    argTypes: {},
} satisfies Meta;

export default meta;
type Story = Meta<{ userName: string; hideColorLegend: boolean }>;

export const Primary: Story = {
    args: {
        userName: 'ryanlegler',
        hideColorLegend: false,
    },
    render: ({ userName, hideColorLegend }) => (
        <iframe
            height='800px'
            width='100%'
            src={`https://git-graph.vercel.app/embed/${userName}?hideColorLegend=${hideColorLegend}`}></iframe>
    ),
};
