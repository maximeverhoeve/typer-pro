import { AspectRatio, Box, Center, useBoolean } from '@chakra-ui/react';
import React, { MouseEvent, PropsWithChildren, useState } from 'react';

interface Props {
  hoverColor: string;
}

const LinkBoxContainer: React.FC<PropsWithChildren & Props> = ({
  hoverColor,
  children,
}) => {
  const [isHovering, setIsHovering] = useBoolean();

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>): void => {
    setIsHovering.on();
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>): void => {
    setIsHovering.off();
  };

  return (
    <Center
      _hover={{
        transform: 'scale(1.05)',
        color: 'white',
      }}
      transition="0.2s"
      border="1px solid"
      borderColor="text"
      w="210px"
      p="8"
      py="16"
      h="100%"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      _active={{
        transform: 'scale(0.95)',
      }}
      position="relative"
      overflow="hidden"
      bg="box"
    >
      <Box zIndex={1}>{children}</Box>
      <Box
        position="absolute"
        w="100%"
        h={isHovering ? '100%' : '0%'}
        bottom={0}
        left={0}
        bg={hoverColor}
        transition="0.2s"
      />
    </Center>
  );
};

export default LinkBoxContainer;
