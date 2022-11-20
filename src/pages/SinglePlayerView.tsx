import React, { useEffect } from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';
import useJoke from '../hooks/useJoke';
import TypingContainer from '../components/TypingContainer';
import { motion } from 'framer-motion';

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
      <motion.div
        initial={{ transform: 'translateY(10px)', opacity: 0 }}
        animate={{ transform: 'translateY(0px)', opacity: 1 }}
        exit={{ transform: 'scale(0)' }}
      >
        <Box display="inline">
          <Spinner size="xl" color="yellow" />
        </Box>
      </motion.div>
    );
  }
  return (
    <Center flexGrow={1}>
      <motion.div
        initial={{ transform: 'scale(0.1)' }}
        animate={{ transform: 'scale(1)' }}
        exit={{ transform: 'scale(0.1)', opacity: 0 }}
      >
        <TypingContainer joke={joke} onRestart={onRestart} />
      </motion.div>
    </Center>
  );
};

export default SinglePlayerView;
