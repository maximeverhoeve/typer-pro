import React, { useEffect } from 'react';
import {
  Box,
  IconButton,
  Spinner,
  VStack,
  Tooltip,
  HStack,
} from '@chakra-ui/react';
import { Joke } from '../../../hooks/useJoke';
import { VscDebugRestart } from 'react-icons/vsc';
import { AiFillCaretRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import TypingInput from './TypingInput';
import useTyping, { PhaseType } from 'react-typing-game-hook';
import useSinglePlayerStore from '../../../store/useSinglePlayerStore';
import { getAcc, getWPM } from '../../../utils/stats';

interface Props {
  joke?: Joke;
  isLoading?: boolean;
  isDisabled?: boolean;
  onRestart?: () => void;
  onFinish: (stats: { wpm: number; acc: number }) => void;
}

const TypingContainer: React.FC<Props> = ({
  joke,
  onRestart,
  isLoading,
  isDisabled,
  onFinish,
}) => {
  const text = joke?.joke || '';
  const navigate = useNavigate();
  const setIsGameStarted = useSinglePlayerStore(
    (state) => state.setIsGameStarted,
  );
  const setProgress = useSinglePlayerStore((state) => state.setProgress);
  const typerProps = useTyping(text, {
    skipCurrentWordOnSpace: false,
    pauseOnError: true,
    countErrors: 'everytime',
  });

  const {
    states: {
      currIndex,
      length,
      correctChar,
      errorChar,
      phase,
      endTime,
      startTime,
    },
  } = typerProps;

  const handleRestartClick = (): void => {
    onRestart?.();
    typerProps.actions.resetTyping();
    setIsGameStarted.off();
  };

  useEffect(() => {
    typerProps.actions.resetTyping();
  }, [text]);

  useEffect(() => {
    if (phase === PhaseType.Started) {
      setIsGameStarted.on();
    }
    if (phase === PhaseType.Ended) {
      onFinish({
        wpm: getWPM({ endTime, startTime, text }),
        acc: getAcc({ correctChar, errorChar, text }),
      });
    }
  }, [phase]);

  useEffect(() => {
    /** Sadly I have to listen to the currIndexd to set the progress because I can't put it in the onChange function of the typerHook */
    setProgress(correctChar / length || 0);
  }, [currIndex]);

  return (
    <VStack spacing="8" height="100%" justify="flex-end" flexGrow={1}>
      <Box maxW="4xl">
        {isLoading ? (
          <Box display="inline">
            <Spinner size="xl" color="secondary" />
          </Box>
        ) : (
          <>
            <TypingInput
              {...typerProps}
              text={text}
              onRestart={handleRestartClick}
            />
          </>
        )}
      </Box>
      <HStack>
        <Tooltip label="Try again" placement="top" hasArrow>
          <IconButton
            isDisabled={isDisabled}
            variant="outline"
            size="lg"
            aria-label="Try again"
            onClick={handleRestartClick}
            icon={<VscDebugRestart />}
          />
        </Tooltip>
        <Tooltip label="Start a new game" placement="top" hasArrow>
          <IconButton
            isDisabled={isDisabled}
            variant="outline"
            size="lg"
            aria-label="New game"
            onClick={() => navigate('/singleplayer')}
            icon={<AiFillCaretRight />}
          />
        </Tooltip>
      </HStack>
    </VStack>
  );
};

export default TypingContainer;
