import { extendTheme } from '@chakra-ui/react';
import { merge } from 'lodash';
import table from './components/table';

const defaultTheme = {
  components: {
    Table: table,
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
        background: '#202020',
        box: '#131415',
        text: '#f6f6f6',
        border: '#fff',
      },
    },
    fonts: {
      heading: 'Roboto Mono',
      body: 'Roboto Mono',
    },
  }),
);

export { customThemeLight, customThemeDark };
