import React from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { IoMdReturnLeft } from 'react-icons/io';

const Controls: React.FC = () => {
  return (
    <HStack
      opacity="0.5"
      display={{ base: 'none', md: 'flex' }}
      alignSelf="flex-end"
    >
      <HStack
        py="2"
        px="4"
        color="gray.700"
        justify="center"
        bg="white"
        borderRadius="md"
      >
        <Text fontWeight="bold" fontSize="12px">
          Ctrl
        </Text>
      </HStack>
      <Text color="white" px="1">
        +
      </Text>
      <HStack
        py="2"
        px="4"
        color="gray.700"
        justify="center"
        bg="white"
        borderRadius="md"
      >
        <IoMdReturnLeft size="18px" />{' '}
        {/* <Text fontWeight="bold" fontSize="12px">
          Enter
        </Text> */}
      </HStack>
      <Text color="white">= Restart</Text>
    </HStack>
  );
};

export default Controls;
