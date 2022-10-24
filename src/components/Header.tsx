import { Heading, HStack, Text } from '@chakra-ui/react';
import React from 'react';

const Header: React.FC = () => {
  return (
    <HStack p="4" align="flex-start" spacing="4">
      <Heading
        as="h1"
        size="lg"
        textAlign={{ base: 'center', md: 'left' }}
        color="white"
      >
        <Text as="span" color="yellow.400">
          DevMax{' '}
        </Text>
        - TyperPro
      </Heading>
    </HStack>
  );
};

export default Header;
