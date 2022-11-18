import { Box, Center, useBoolean } from '@chakra-ui/react';
import { hover } from '@testing-library/user-event/dist/hover';
import React, {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  useState,
} from 'react';

interface Props {
  hoverColor: string;
}

const LinkBoxContainer: React.FC<PropsWithChildren & Props> = ({
  hoverColor,
  children,
}) => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isHovering, setIsHovering] = useBoolean();

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>): void => {
    const localX = event.clientX - event.currentTarget.offsetLeft;
    const localY = event.clientY - event.currentTarget.offsetTop;
    setMousePos({
      x: localX,
      y: localY,
    });
    setIsHovering.on();
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>): void => {
    const localX = event.clientX - event.currentTarget.offsetLeft;
    const localY = event.clientY - event.currentTarget.offsetTop;
    setMousePos({
      x: localX,
      y: localY,
    });
    setIsHovering.off();
  };

  return (
    <Center
      _hover={{
        transform: 'scale(1.05)',
        color: 'white',
      }}
      transition="0.2s"
      bg="box"
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
    >
      <Box zIndex={1}>{children}</Box>
      <Box
        position="absolute"
        w="100%"
        h="100%"
        top={0}
        left={0}
        bg={hoverColor}
        transformOrigin={`${mousePos.x}px ${mousePos.y}px`}
        transform={isHovering ? 'scale(1)' : 'scale(0)'}
        transition="transform 0.2s"
      />
    </Center>
  );
};

export default LinkBoxContainer;
