import React, { PropsWithChildren } from 'react';
import { Center, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <HStack spacing="4">
      <Link to="/singleplayer">
        <LinkBox>singleplayer</LinkBox>
      </Link>
      <Link to="/multiplayer">
        <LinkBox>multiplayer</LinkBox>
      </Link>
    </HStack>
  );
};

const LinkBox: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Center
      _hover={{ borderColor: 'primary' }}
      transition="0.2s"
      bg="box"
      border="1px solid"
      borderColor="text"
      w="210px"
      p="8"
    >
      <Text>{children}</Text>
    </Center>
  );
};

export default Home;
