import { HStack, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { IoMdReturnLeft } from 'react-icons/io';

const Footer: React.FC = () => {
  return (
    <HStack p="4">
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
      <Spacer />
      <Text align="right" color="white" fontSize="xl">
        v0.3.0
      </Text>
    </HStack>
  );
};

export default Footer;
