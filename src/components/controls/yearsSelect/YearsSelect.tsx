import * as Select from '@/components/ui/Select';
import { Box, Flex, Grid } from 'styled-system/jsx';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { YearsSelectProps } from './types';
import { useState } from 'react';

export function YearsSelect(props: YearsSelectProps) {
    type Item = { label: string; value: string; disabled?: boolean; years: number[] };
    const [selectedItem, setSelectedItem] = useState<Item>();

    if (!props.years) {
        return <div />;
    }

    const rangeItems = [
        {
            label: 'This Year',
            value: 'this-year',
            years: [props.years[0]],
        },
        {
            label: 'Last Year',
            value: 'last-year',
            years: [props.years[1]],
        },
        {
            label: 'All Years',
            value: 'all-years',
            years: props.years,
        },
    ];

    const individualItems = props.years.map((year) => {
        return {
            label: year.toString(),
            value: year.toString(),
            years: [year],
        };
    });

    const mergeItems: Item[] = [...rangeItems, ...individualItems];

    return (
        <div>
            <div>hi</div>
            <div>
                state:
                {selectedItem && selectedItem.years.map((x) => <div key={x}>{x}</div>)}
            </div>
            <Select.Root
                positioning={{ sameWidth: true }}
                width='2xs'
                // uses item.value internally as a key 🚨 Dear Arc, please add this to your docs 🤦‍♂️
                items={mergeItems}
                onValueChange={(e) => {
                    const thisItem = e.items[0] as Item;
                    setSelectedItem(thisItem);
                }}
            >
                <Select.Label style={{ display: 'none' }}>Framework</Select.Label>
                <Select.Control>
                    <Select.Trigger>
                        {/* @ts-expect-error: Ark Select Value Text not propoerly typed */}
                        <Select.ValueText placeholder='Select one' />
                        <ChevronsUpDownIcon />
                    </Select.Trigger>
                </Select.Control>
                <Select.Positioner>
                    <Select.Content>
                        <Select.ItemGroup id='rangeItems'>
                            {rangeItems.map((item, i) => (
                                <Select.Item key={i} item={item}>
                                    <Select.ItemText>{item.label}</Select.ItemText>
                                    <Select.ItemIndicator>
                                        <CheckIcon />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.ItemGroup>
                        <Box w='100' h='1px' py='1' px='1'>
                            {/* i do not understand why fg, fg-default, foreground, forground, or any equivilent does not work */}
                            <Box h='1px' backgroundColor='gray.a3' />
                        </Box>
                        <Select.ItemGroup id='individualItems'>
                            {individualItems.map((item, i) => (
                                <Select.Item key={i} item={item}>
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
        </div>
    );
}
