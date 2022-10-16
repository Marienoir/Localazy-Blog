import { extendTheme, ThemeOverride, UseToastOptions, withDefaultColorScheme } from '@chakra-ui/react';

export const customTheme = extendTheme(
  {
    initialColorMode: 'light',
    useSystemColorMode: true,
    fonts: {
      heading: "'Poppins', sans-serif",
      body: "'Poppins', sans-serif",
      brand: "'Poppins', sans-serif",
    },
    // We suggest you to use https://www.tailwindshades.com/ to generate your color palettes easily.
    colors: {
      primary: {
        DEFAULT: '#E87464',
        '50': '#FDF1F0',
        '100': '#FAE4E0',
        '200': '#F6C8C1',
        '300': '#F1ACA2',
        '400': '#ED9083',
        '500': '#E87464',
        '600': '#DF3C26',
        '700': '#A52918',
        '800': '#671A0F',
        '900': '#280A06',
      },
      gray: {
        DEFAULT: '#696D8C',
        '50': '#F8F8FA',
        '100': '#E8E8ED',
        '200': '#C8C9D5',
        '300': '#A8AABD',
        '400': '#888BA5',
        '500': '#696D8C',
        '600': '#585B74',
        '700': '#46495D',
        '800': '#353746',
        '900': '#23242F',
      },
    },
    components: {
      Button: {
        baseStyle: {
          rounded: 'full',
        },
        variants: {
          outline: () => ({
            border: '2px solid',
          }),
        },
      },
    },
  } as ThemeOverride,
  withDefaultColorScheme({ colorScheme: 'primary', components: ['Button'] })
);

export const defaultToastOptions = {
  position: 'top',
  duration: 5000,
  isClosable: true,
} as UseToastOptions;
