import { useCallback } from 'react';
import * as Select from '@/components/ui/Select';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { YearsSelectProps } from './types';
import { CollectionItem } from '@ark-ui/react/select';

interface ValueChangeDetails<T extends CollectionItem = CollectionItem> {
    value: string[];
    items: T[];
}

export function YearsSelect({ availableYears, setSelected, selected }: YearsSelectProps) {
    const mergeItems = availableYears?.map((year) => {
        return {
            label: year.toString(),
            value: year.toString(),
        };
    });

    const handleOnChange = useCallback(
        ({ value }: ValueChangeDetails<CollectionItem>) => {
            const valueAsNumber = parseInt(value?.[0]);
            setSelected(valueAsNumber);
        },
        [setSelected]
    );

    return (
        <Select.Root
            value={[selected.toString()]}
            positioning={{ sameWidth: true }}
            width='2xs'
            // uses item.value internally as a key 🚨 Dear Arc, please add this to your docs 🤦‍♂️
            items={mergeItems}
            closeOnSelect={true}
            multiple={false}
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
                    <Select.ItemGroup id='individualItems'>
                        {mergeItems.map((item, i) => (
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
