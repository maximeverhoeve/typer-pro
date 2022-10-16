import React, { useEffect } from 'react';
import { Box, Center, Grid, Spinner } from '@chakra-ui/react';
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
    <Grid
      templateRows="repeat(3, 33%)"
      bg="gray.800"
      h="100vh"
      overflow="hidden"
    >
      <Header />
      <Center flexShrink={0}>
        {isLoading && (
          <Box display="inline">
            <Spinner size="xl" color="yellow" />
          </Box>
        )}
        {!isLoading && <TypingContainer joke={joke} onRestart={onRestart} />}
      </Center>
      <Footer />
    </Grid>
  );
};

export default Home;
