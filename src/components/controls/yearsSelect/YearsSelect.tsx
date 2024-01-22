import * as Select from '@/components/ui/Select';
import { Box, Flex, Grid } from 'styled-system/jsx';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { YearsSelectProps } from './types';

export function YearsSelect(props: YearsSelectProps) {
    // type Item = { label: string; value: string; disabled?: boolean };
    // const [_, setSelectedItems] = useState<Item[]>([]);

    if (!props.years) {
        return <div />;
    }

    const rangeItems = [
        { label: 'This Year', id: [props.years[0]], value: 'this-year' },
        { label: 'Last Year', id: [props.years[1]], value: 'last-year' },
        { label: 'All Years', id: props.years, value: 'all-years' },
    ];

    const individualItems = props.years.map((year) => {
        return {
            label: year.toString(),
            value: [year],
            id: `${year.toString()}`,
        };
    });

    const mergeItems = [...rangeItems, ...individualItems];

    // console.log('mergeItems', mergeItems);

    return (
        <Select.Root
            positioning={{ sameWidth: true }}
            width='2xs'
            // uses item.value internally as a key 🚨 Dear Arc, please add this to your docs 🤦‍♂️
            items={mergeItems}
            bg='red.5'
            color='lime'
            onValueChange={(e) => {
                console.log(e.items);
                console.log(e);
            }}
        >
            <Select.Label style={{ display: 'none' }}>Framework</Select.Label>
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText />
                    <ChevronsUpDownIcon />
                </Select.Trigger>
            </Select.Control>
            <Select.Positioner>
                <Select.Content style={{ background: 'black' }}>
                    {/*
                     */}
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
                    <Box w='100' h='1px' py='1' px='2'>
                        <Box h='1px' bg='lime' />
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
    );
}
