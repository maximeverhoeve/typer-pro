import React, { useEffect } from 'react';
import { Box, Center, Flex, Spinner } from '@chakra-ui/react';
import useJoke from '../hooks/useJoke';
import TypingContainer from '../components/TypingContainer';

import Footer from '../components/Footer';
import Header from '../components/Header';

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
      <Header />
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
