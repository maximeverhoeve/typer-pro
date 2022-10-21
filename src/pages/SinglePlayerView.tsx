import React, { useEffect } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import useJoke from '../hooks/useJoke';
import TypingContainer from '../components/TypingContainer';

const SinglePlayerView: React.FC = () => {
  const { joke, isLoading, onRestart } = useJoke();
  const keyDownHandler = (e: KeyboardEvent): void => {
    // Restart when Enter key is pressed
    if (e.key === 'Enter' && e.ctrlKey) {
      onRestart();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  if (isLoading) {
    return (
      <Box display="inline">
        <Spinner size="xl" color="yellow" />
      </Box>
    );
  }
  return <TypingContainer joke={joke} onRestart={onRestart} />;
};

export default SinglePlayerView;
