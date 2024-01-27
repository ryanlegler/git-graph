import { useCallback } from 'react';
import * as Select from '@/components/ui/Select';
import { Box } from 'styled-system/jsx';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { YearsSelectProps } from './types';
import {} from '@ark-ui/react/select';

import { CollectionItem } from '@ark-ui/react/select';
import {} from '@ark-ui/react/select';
interface ValueChangeDetails<T extends CollectionItem = CollectionItem> {
    value: string[];
    items: T[];
}

export function YearsSelect({ years, setSelected, selected }: YearsSelectProps) {
    const rangeItems = [
        { label: 'This Year', value: 'this-year' },
        { label: 'Last Year', value: 'last-year' },
        { label: 'All Years', value: 'all-years' },
    ];

    const individualItems = years.map((year) => {
        return {
            label: year.toString(),
            value: year.toString(),
        };
    });

    const mergeItems = [...rangeItems, ...individualItems];

    // get the current year - user may not actually have data for this year but thats okay I think
    const thisYear = new Date().getFullYear();

    const handleOnChange = useCallback(
        ({ value }: ValueChangeDetails<CollectionItem>) => {
            if (value.includes('all-years')) {
                setSelected(years);
            } else if (value.includes('this-year')) {
                setSelected([thisYear]);
            } else if (value.includes('last-year')) {
                const lastYear = thisYear - 1;
                setSelected([lastYear]);
            } else {
                setSelected(value.map((year) => parseInt(year)));
            }
        },
        [setSelected, thisYear, years]
    );

    if (!years) {
        return <div />;
    }

    return (
        <Select.Root
            value={selected.map((year) => year.toString())}
            positioning={{ sameWidth: true }}
            width='2xs'
            // uses item.value internally as a key 🚨 Dear Arc, please add this to your docs 🤦‍♂️
            items={mergeItems}
            closeOnSelect={false}
            multiple={true}
            onValueChange={handleOnChange}
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
