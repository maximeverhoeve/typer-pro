import React, { useEffect } from 'react';
import { Center } from '@chakra-ui/react';
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

  return (
    <motion.div
      style={{ flexGrow: 1, height: '100%' }}
      initial={{ transform: 'scale(0.1)' }}
      animate={{ transform: 'scale(1)' }}
      exit={{ transform: 'scale(0.1)', opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Center h="100%">
        <TypingContainer
          joke={joke}
          isLoading={isLoading}
          onRestart={onRestart}
        />
      </Center>
    </motion.div>
  );
};

export default SinglePlayerView;
