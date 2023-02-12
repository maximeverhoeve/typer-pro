import { extendTheme } from '@chakra-ui/react';
import { merge } from 'lodash';
import button from './components/button';
import table from './components/table';

const defaultTheme = {
  components: {
    Table: table,
    Button: button,
  },
  fonts: {
    heading: 'Roboto Mono',
    body: 'Roboto Mono',
  },
  semanticTokens: {
    colors: {
      primary: '#DC0077',
      secondary: '#00CACA',
      error: '#D90310',
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
        border: '#131415',
      },
    },
  }),
);

const customThemeDark = extendTheme(
  merge(defaultTheme, {
    semanticTokens: {
      colors: {
        background: '#121212',
        box: '#131415',
        text: '#f6f6f6',
        border: '#414141',
      },
    },
    fonts: {
      heading: 'Roboto Mono',
      body: 'Roboto Mono',
    },
  }),
);

export { customThemeLight, customThemeDark };
