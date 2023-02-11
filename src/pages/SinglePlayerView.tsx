/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from 'react';
import { Center } from '@chakra-ui/react';
import useJoke from '../hooks/useJoke';
import TypingContainer from '../components/TypingContainer';
import { motion } from 'framer-motion';
import { Stats } from '../hooks/useTyper';
import usePostScore from '../features/singleplayer/hooks/usePostScore';
import { useNavigate, useParams } from 'react-router-dom';
import usePreviousStats from '../hooks/usePreviousStats';

const SinglePlayerView: React.FC = () => {
  const { textId } = useParams<{ textId: string }>();
  const { joke, isLoading, onRestart } = useJoke(textId);
  const postScore = usePostScore(textId || joke?.id);
  const {
    isLoading: isLoadingPrevious,
    data: previousData,
    refetch,
  } = usePreviousStats(textId || joke?.id);
  const navigate = useNavigate();

  const handleFinish = async (stats: Stats): Promise<void> => {
    if (!previousData || stats.wpm > previousData.wpm) {
      await postScore(stats);
    }
    if (joke) {
      navigate(`/leaderboard/${joke.id}`, {
        state: {
          stats,
          textId: joke.id,
        },
      });
    }
  };

  useEffect(() => {
    // When no text id was provided, it should add the random generated textId to the url
    if (joke?.id && !textId) {
      navigate(`/singleplayer/${joke.id}`, { replace: true });
    }
  }, [joke?.id]);

  useEffect(() => {
    // manually refetch on mount, because query-firstore does not have that prop
    refetch();
  }, []);

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
          isLoading={isLoading || isLoadingPrevious}
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
