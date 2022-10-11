import { Box, Center, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useJoke from '../hooks/useJoke';
import TypingContainer from '../components/TypingContainer';

import Footer from '../components/Footer';

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
          size="lg"
          textAlign={{ base: 'center', md: 'left' }}
          color="white"
        >
          <Text as="span" color="yellow.400">
            DevMax{' '}
          </Text>
          - TyperPro
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
      <Footer />
    </Flex>
  );
};

export default Home;
