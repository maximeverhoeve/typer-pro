import { Box, Text, keyframes, Flex } from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import React from 'react';

interface Props {
  name: string;
  color: string;
  isMe?: boolean;
}

const arrowAnimation = keyframes`
0% {transform: translate(-10px, 0)}
50% {transform: translate(0, 0)}
100% {transform: translate(-10px, 0)}
`;

const PlayerRow: React.FC<Props> = ({ name, color, isMe }) => {
  const spinAnimation = `${arrowAnimation} infinite 1.5s ease`;
  return (
    <Flex
      mt="0"
      px="4"
      py="3"
      justify="space-between"
      borderTop="1px solid"
      borderColor="gray.500"
      _first={{ border: 'none' }}
      position="relative"
      gridGap="1"
    >
      {/* ARROW */}
      {isMe && (
        <Box
          animation={spinAnimation}
          position="absolute"
          right="calc(100% + 10px)"
          mt="3px"
        >
          <AiOutlineArrowRight />
        </Box>
      )}
      <Text color={isMe ? 'white' : 'gray.400'}>{name}</Text>
      <Box
        borderRadius="full"
        borderColor="white"
        bg={color}
        w="20px"
        h="20px"
        transition="0.2s"
        flexShrink={0}
      />
    </Flex>
  );
};

export default PlayerRow;
