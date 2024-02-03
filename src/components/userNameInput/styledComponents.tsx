import { cva } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const inputStyles = cva({
    base: {
        px: '3',
        py: '2',
        bg: 'gray.5',
        color: 'black',
        _placeholder: { color: 'gray.9' },
        _dark: { bg: 'github.800', color: 'white' },
        borderRadius: 'md',
        cursor: 'pointer',
    },
});

export const StyledInput = styled('input', inputStyles);
