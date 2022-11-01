import { Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const Header: React.FC = () => {
  return (
    <VStack p="4" spacing="4">
      <Heading as="h1" size="lg" textAlign={{ base: 'center', md: 'left' }}>
        <Text as="span" color="primary">
          [
        </Text>
        <Text as="span" px="4">
          typer:pro
        </Text>
        <Text as="span" color="secondary">
          ]
        </Text>
      </Heading>
      <Text>by devmax</Text>
    </VStack>
  );
};

export default Header;
