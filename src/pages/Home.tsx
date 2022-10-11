import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Spacer,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useJoke from '../hooks/useJoke';
import TypingContainer from '../components/TypingContainer';
import { IoMdReturnLeft } from 'react-icons/io';

const Home: React.FC = () => {
  const { joke, isLoading, onRestart } = useJoke();

  const keyDownHandler = (e: KeyboardEvent): void => {
    // Restart when Enter key is pressed
    if (e.key === 'Enter') {
      onRestart();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <Flex direction="column" bg="gray.800" h="100vh" overflow="hidden">
      <Box p="4">
        <Heading
          as="h1"
          size="xl"
          textAlign={{ base: 'center', md: 'left' }}
          color="white"
        >
          <Text as="span">DevMax </Text>
          TyperPro
        </Heading>
      </Box>
      <Center flexGrow={1}>
        {isLoading && (
          <Box display="inline">
            <Spinner size="xl" color="yellow" />
          </Box>
        )}
        {!isLoading && <TypingContainer joke={joke} onRestart={onRestart} />}
      </Center>
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
        <Text align="right" color="white" fontSize="2xl">
          v0.2.0
        </Text>
      </HStack>
    </Flex>
  );
};

export default Home;
