/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from 'react';
import { Center, Spinner, Text, VStack } from '@chakra-ui/react';
import useJoke from '../../hooks/useJoke';
import TypingContainer from '../../components/TypingContainer';
import { motion } from 'framer-motion';
import usePostScore from './hooks/usePostScore';
import { useNavigate, useParams } from 'react-router-dom';
import usePreviousStats from '../../hooks/usePreviousStats';
import useSinglePlayerStore from '../../store/useSinglePlayerStore';
import { PlayerStats } from './types/GameTypes';
import { useMitt } from '../../hooks/useMitt';

const SinglePlayer: React.FC = () => {
  const { textId } = useParams<{ textId: string }>();
  const { emitter } = useMitt();
  const { joke, isLoading, onRestart } = useJoke(textId);
  const isLoadingEnvironment = useSinglePlayerStore(
    (state) => state.isLoadingEnvironment,
  );
  const setPreviousTime = useSinglePlayerStore(
    (state) => state.setPreviousTime,
  );
  const setIsFinishing = useSinglePlayerStore((state) => state.setIsFinishing);
  const setProgress = useSinglePlayerStore((state) => state.setProgress);
  const isFinishing = useSinglePlayerStore((state) => state.isFinishing);
  const postScore = usePostScore(textId != null ? textId : joke?.id);
  const {
    isLoading: isLoadingPrevious,
    data: previousData,
    refetch,
  } = usePreviousStats(textId != null ? textId : joke?.id);
  const navigate = useNavigate();

  const handleFinish = async (stats: PlayerStats): Promise<void> => {
    setIsFinishing.on();

    if (!previousData || stats.wpm > previousData.wpm) {
      await postScore(stats, joke?.joke || '');
    }
    /** Sent event to the threejs component to handle the finish */
    emitter.emit('sp_finish_animation', {
      stats,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      textId: joke!.id,
      isHighScore: stats.wpm > (previousData?.wpm || 0),
      highScore: previousData?.wpm || 0,
    });
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
      const wordCount = joke.joke.split(' ').length; // Number of words
      const typingSpeed = previousData.wpm; // WPM

      // Calculate the duration in seconds
      const durationInSeconds = (60 / typingSpeed) * wordCount;
      setPreviousTime(durationInSeconds);
    } else {
      setPreviousTime(undefined);
    }
  }, [previousData, joke]);

  useEffect(() => {
    // manually refetch on mount, because query-firstore does not have that prop
    refetch();

    return () => {
      /** Because the threejs scene has a transition of 500ms, change the progress after */
      setTimeout(() => {
        setProgress(0);
      }, 500);
    };
  }, []);

  if (isLoadingEnvironment) {
    return (
      <Center>
        <VStack>
          <Spinner size="lg" color="secondary" />
          <Text>Loading singleplayer</Text>
        </VStack>
      </Center>
    );
  }

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
          isDisabled={isFinishing}
          onFinish={(stats) => {
            handleFinish(stats);
          }}
        />
      </Center>
      <Text align="center" mt="5" fontSize="xs" color="gray.500">
        Press{' '}
        <Text as="span" color="primary">
          Esc
        </Text>{' '}
        to restart
      </Text>
    </motion.div>
  );
};

export default SinglePlayer;
