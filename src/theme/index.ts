import { extendTheme } from '@chakra-ui/react';

const defaultTheme = {
  fonts: {
    heading: 'Roboto Mono',
    body: 'Roboto Mono',
  },
  semanticTokens: {
    colors: {
      primary: '#DC0077',
      secondary: '#00CACA',
    },
  },
};

const customThemeLight = extendTheme({
  ...defaultTheme,
  semanticTokens: {
    colors: {
      background: '#F6F6F6',
      error: 'red.500',
      text: {
        default: 'gray.900',
        _dark: 'gray.50',
      },
    },
  },
});

const customThemeDark = extendTheme({
  ...defaultTheme,
  semanticTokens: {
    colors: {
      background: '#202124',
    },
  },
  fonts: {
    heading: 'Roboto Mono',
    body: 'Roboto Mono',
  },
});

export { customThemeLight, customThemeDark };
