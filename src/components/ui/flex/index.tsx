import { styled } from 'styled-system/jsx';
import { cva } from 'styled-system/css';

export const flexStyles = cva({
    base: {
        display: 'flex',
        flexDirection: 'column',
    },
    variants: {
        direction: {
            vertical: {
                flexDirection: 'column',
                alignItems: 'initial',
            },
            horizontal: {
                flexDirection: 'row',
            },
        },
        vAlign: {
            top: {
                alignItems: 'flex-start',
            },
            middle: {
                alignItems: 'center',
            },
            bottom: {
                alignItems: 'flex-end',
            },
            between: {
                alignItems: 'space-between',
            },
            around: {
                alignItems: 'space-around',
            },
            evenly: {
                alignItems: 'space-evenly',
            },
            stretch: {
                '& > *:not(.grow_0)': {
                    // outline: "10px solid red",
                    display: 'flex',
                    flex: '1 0 auto',
                },
            },
        },
        hAlign: {
            left: {
                justifyContent: 'flex-start',
            },
            center: {
                justifyContent: 'center',
            },
            right: {
                justifyContent: 'flex-end',
            },
            between: {
                justifyContent: 'space-between',
            },
            around: {
                justifyContent: 'space-around',
            },
            evenly: {
                justifyContent: 'space-evenly',
            },
            stretch: {
                '& > *:not(.grow_0)': {
                    // outline: "10px solid red",
                    display: 'flex',
                    flex: '1 0 auto',
                },
            },
        },
    },
    defaultVariants: {
        direction: 'horizontal',
    },
    compoundVariants: [
        {
            direction: 'vertical',
            css: {
                alignItems: 'initial',
            },
        },
        // top / middle / bottom
        {
            direction: 'vertical',
            vAlign: 'top',
            css: {
                justifyContent: 'flex-start',
            },
        },
        {
            direction: 'vertical',
            vAlign: 'middle',
            css: {
                justifyContent: 'center',
            },
        },
        {
            direction: 'vertical',
            vAlign: 'bottom',
            css: {
                justifyContent: 'flex-end',
            },
        },

        // space-between / space-around / space-evenly
        {
            direction: 'vertical',
            vAlign: 'between',
            css: {
                justifyContent: 'space-between',
            },
        },
        {
            direction: 'vertical',
            vAlign: 'around',
            css: {
                justifyContent: 'space-around',
            },
        },
        {
            direction: 'vertical',
            vAlign: 'evenly',
            css: {
                justifyContent: 'space-evenly',
            },
        },

        // left / center / right
        {
            direction: 'vertical',
            hAlign: 'left',
            css: {
                alignItems: 'flex-start',
            },
        },
        {
            direction: 'vertical',
            hAlign: 'center',
            css: {
                alignItems: 'center',
            },
        },

        {
            direction: 'vertical',
            hAlign: 'right',
            css: {
                alignItems: 'flex-end',
            },
        },
    ],
});

const StyledFlex = styled('div', flexStyles);
export { StyledFlex };
