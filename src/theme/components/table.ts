import { ComponentStyleConfig } from '@chakra-ui/react';

const table: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {
    table: {
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    thead: {
      bg: 'background',
    },
    th: {
      py: '3',
      px: '4',
      borderBottom: '1px solid',
      borderColor: 'border',
      textTransform: 'unset',
      fontWeight: 'medium',
      fontFamily: 'unset',
    },
    td: {
      py: '2',
      px: '4',
    },
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {},
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: '',
    variant: '',
    colorScheme: '',
  },
};

export default table;
