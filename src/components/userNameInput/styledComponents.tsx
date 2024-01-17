import { cva } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const inputStyles = cva({
    base: {
        px: '3',
        py: '2',
        bg: 'github.100',
        color: 'gray.1',
        borderRadius: 'md',
        _placeholder: { color: 'gray.9' },
        cursor: 'pointer',
    },
});

export const StyledInput = styled('input', inputStyles);
