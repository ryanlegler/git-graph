import { defineConfig } from '@pandacss/dev';

export default defineConfig({
    preflight: true,
    presets: ['@pandacss/preset-base', '@park-ui/panda-preset'],
    include: ['./src/**/*.{js,jsx,ts,tsx}'],
    jsxFramework: 'react', // allows for jsx style props -  https://panda-css.com/docs/guides/dynamic-styling#jsx-style-props

    // Files to exclude
    exclude: [],
    theme: {
        extend: {
            // should be able to extend the ark recipes and add new variants - have't gotten it to work though
            // recipes: {
            //     button: {
            //         variants: {
            //             solid: {
            //                 base: {
            //                     bg: '#bada55',
            //                 },
            //             },
            //         },
            //     },
            // },
            tokens: {
                colors: {
                    ['github.100']: { value: '#161B22' },
                    ['github.200']: { value: '#0D4429' },
                    ['github.300']: { value: '#016D32' },
                    ['github.400']: { value: '#27A641' },
                    ['github.500']: { value: '#3AD353' },
                },
            },
        },
    },
    // strictTokens: true,
    // strictPropertyValues: true, // according to the docs this will make sure we use valid css
    emitPackage: false, // this puts the styled-system in the node_modules
    outdir: 'styled-system',
});
