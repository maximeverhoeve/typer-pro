import { Box } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

interface Props {
  hoverColor: string;
  isHovering: boolean;
}

const LinkBoxContainer: React.FC<PropsWithChildren & Props> = ({
  hoverColor,
  children,
  isHovering,
}) => {
  return (
    <Box
      sx={
        isHovering
          ? {
              minH: '100%',
              boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
              bg: hoverColor,
              color: 'white',
            }
          : {}
      }
      transition="0.2s"
      w="100%"
      p="4"
      minH="0%"
      position="relative"
      overflow="hidden"
    >
      <Box flexGrow={1} zIndex={1}>
        {children}
      </Box>
    </Box>
  );
};

export default LinkBoxContainer;
