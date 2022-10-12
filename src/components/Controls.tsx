import React from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { IoMdReturnLeft } from 'react-icons/io';

const Controls: React.FC = () => {
  return (
    <HStack>
      <HStack
        py="2"
        px="4"
        color="gray.700"
        justify="center"
        bg="white"
        borderRadius="md"
        opacity="0.5"
      >
        <IoMdReturnLeft size="13px" />{' '}
        <Text fontWeight="bold" fontSize="12px">
          Enter
        </Text>
      </HStack>
      <Text color="white" opacity="0.5">
        = Restart
      </Text>
    </HStack>
  );
};

export default Controls;
