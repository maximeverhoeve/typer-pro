import React from 'react';
import { Center } from '@chakra-ui/react';
import useJoke from '../hooks/useJoke';
import TypingContainer from '../components/TypingContainer';
import { motion } from 'framer-motion';
import { Stats } from '../hooks/useTyper';
import usePostScore from '../features/singleplayer/hooks/usePostScore';
import { useNavigate } from 'react-router-dom';

const SinglePlayerView: React.FC = () => {
  const { joke, isLoading, onRestart } = useJoke();
  const postScore = usePostScore(joke?.id);
  const navigate = useNavigate();

  const handleFinish = async (stats: Stats): Promise<void> => {
    const isSuccess = await postScore(stats);
    if (isSuccess) {
      navigate('/singleplayer/results', {
        state: {
          stats,
          textId: joke?.id,
        },
      });
    }
  };

  return (
    <motion.div
      style={{ flexGrow: 1 }}
      initial={{ transform: 'scale(0.1)' }}
      animate={{ transform: 'scale(1)' }}
      exit={{ transform: 'scale(0.1)', opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Center h="100%" px="5">
        <TypingContainer
          joke={joke}
          isLoading={isLoading}
          onRestart={onRestart}
          onFinish={(stats) => {
            handleFinish(stats);
          }}
        />
      </Center>
    </motion.div>
  );
};

export default SinglePlayerView;
