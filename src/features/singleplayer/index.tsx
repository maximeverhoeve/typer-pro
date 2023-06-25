/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react';
import { Center } from '@chakra-ui/react';
import useJoke from '../../hooks/useJoke';
import TypingContainer from '../../components/TypingContainer';
import { motion } from 'framer-motion';
import { Stats } from '../../hooks/useTyper';
import usePostScore from './hooks/usePostScore';
import { useNavigate, useParams } from 'react-router-dom';
import usePreviousStats from '../../hooks/usePreviousStats';
import useSinglePlayerStore from '../../store/useSinglePlayerStore';

const SinglePlayer: React.FC = () => {
  const [stats, setStats] = useState<Stats>();
  const { textId } = useParams<{ textId: string }>();
  const { joke, isLoading, onRestart } = useJoke(textId);
  const { setPreviousTime, isFinishing, setIsFinishing } = useSinglePlayerStore(
    (state) => state,
  );
  const postScore = usePostScore(textId != null ? textId : joke?.id);
  const {
    isLoading: isLoadingPrevious,
    data: previousData,
    refetch,
  } = usePreviousStats(textId != null ? textId : joke?.id);
  const navigate = useNavigate();

  const handleFinish = async (stats: Stats): Promise<void> => {
    setStats(stats);
    setIsFinishing.on();
    if (!previousData || stats.wpm > previousData.wpm) {
      await postScore(stats);
    }
  };

  useEffect(() => {
    // When no text id was provided, it should add the random generated textId to the url
    if (joke?.id && !textId) {
      navigate(`/singleplayer/${joke.id}`, { replace: true });
    }
  }, [joke?.id]);

  useEffect(() => {
    if (previousData?.wpm && joke) {
      // get the amount of words to calculate duration of the wpm
      const numWords = joke.joke.split(' ').length;
      const previousTime = (60 / previousData.wpm) * numWords;
      setPreviousTime(previousTime);
    } else {
      setPreviousTime(undefined);
    }
  }, [previousData, joke]);

  useEffect(() => {
    // manually refetch on mount, because query-firstore does not have that prop
    refetch();
  }, []);

  useEffect(() => {
    // When the finishing animation in the ThreeSingleplayer component is complete
    // Navigate to the leaderboard page
    if (!isFinishing && stats) {
      if (joke) {
        navigate(`/leaderboard/${joke.id}`, {
          state: {
            stats,
            textId: joke.id,
            isHighScore: stats.wpm > (previousData?.wpm || 0),
          },
        });
      }
    }
  }, [isFinishing]);

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

export default SinglePlayer;
