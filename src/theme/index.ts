import { extendTheme } from '@chakra-ui/react';
import { merge } from 'lodash';

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

const customThemeLight = extendTheme(
  merge(defaultTheme, {
    semanticTokens: {
      colors: {
        background: '#F6F6F6',
        text: '#202124',
        box: '#fff',
      },
    },
  }),
);

const customThemeDark = extendTheme(
  merge(defaultTheme, {
    semanticTokens: {
      colors: {
        background: '#202124',
        box: '#131415',
        text: '#f6f6f6',
      },
    },
    fonts: {
      heading: 'Roboto Mono',
      body: 'Roboto Mono',
    },
  }),
);

export { customThemeLight, customThemeDark };
