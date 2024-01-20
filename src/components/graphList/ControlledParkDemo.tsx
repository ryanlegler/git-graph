'use client';
import { useState } from 'react';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import * as Select from '@/components/ui/select';
import { Box } from 'styled-system/jsx';

export const ControlledParkDemo = (props: any) => {
    type Item = { label: string; value: string; disabled?: boolean };
    const [_, setSelectedItems] = useState<Item[]>([]);

    const items: Item[] = [
        { label: 'React', value: 'react' },
        { label: 'Solid', value: 'solid' },
        { label: 'Vue', value: 'vue' },
        { label: 'Svelte', value: 'svelte', disabled: true },
    ];

    return (
        <Box bg='fg'>
            <Select.Root
                positioning={{ sameWidth: true }}
                width='2xs'
                {...props}
                items={items}
                // this isn't typesafe, its right from the docs
                // this breaks the build
                onValueChange={(e) => setSelectedItems(e.items)}>
                <Select.Label>Framework</Select.Label>
                <Select.Control>
                    <Select.Trigger>
                        {/* ditto on ts */}
                        <Select.ValueText placeholder='Select a Framework' />
                        <ChevronsUpDownIcon />
                    </Select.Trigger>
                </Select.Control>
                <Select.Positioner>
                    <Select.Content>
                        <Select.ItemGroup id='framework'>
                            <Select.ItemGroupLabel htmlFor='framework'>
                                Framework
                            </Select.ItemGroupLabel>
                            {items.map((item) => (
                                <Select.Item key={item.value} item={item}>
                                    <Select.ItemText>{item.label}</Select.ItemText>
                                    <Select.ItemIndicator>
                                        <CheckIcon />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.ItemGroup>
                    </Select.Content>
                </Select.Positioner>
            </Select.Root>
        </Box>
    );
};
