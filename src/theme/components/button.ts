import { ComponentStyleConfig } from '@chakra-ui/react';

const button: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {
    lineHeight: '1.2',
    borderRadius: 'md',
    px: 3,
    py: 2,
    fontWeight: 'semibold',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _focusVisible: {
      boxShadow: 'outline',
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
    _hover: {
      _disabled: {
        bg: 'initial',
      },
    },
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    outline: {
      border: '1px solid',
      borderColor: 'border',
      size: 'md',
      p: 4,
      lineHeight: '1.2',
      borderRadius: 'md',
      fontWeight: 'semibold',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      _focusVisible: {
        boxShadow: 'outline',
      },
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
        boxShadow: 'none',
      },
      _hover: {
        bg: 'border',
        _disabled: {
          bg: 'initial',
        },
      },
    },
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: '',
    variant: '',
    colorScheme: '',
  },
};

export default button;
