import React, { useEffect } from 'react';
import {
  Box,
  IconButton,
  Spinner,
  VStack,
  Tooltip,
  HStack,
} from '@chakra-ui/react';
import { Joke } from '../hooks/useJoke';
import { VscDebugRestart } from 'react-icons/vsc';
import { AiFillCaretRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import TypingInput from '../features/singleplayer/components/TypingInput';
import useTyping, { PhaseType } from 'react-typing-game-hook';
import useSinglePlayerStore from '../store/useSinglePlayerStore';

interface Props {
  joke?: Joke;
  isLoading?: boolean;
  onRestart?: () => void;
  onFinish: (stats: { wpm: number; acc: number }) => void;
}

const TypingContainer: React.FC<Props> = ({
  joke,
  onRestart,
  isLoading,
  onFinish,
}) => {
  const text = joke?.joke || '';
  const navigate = useNavigate();
  const { setProgress, setIsGameStarted } = useSinglePlayerStore(
    (state) => state,
  );
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

  const getWPM = (): number => {
    if (endTime && startTime) {
      const duration = Math.floor((endTime - startTime) / 1000);
      return Math.round(((60 / duration) * correctChar) / 5);
    }
    return 0;
  };

  useEffect(() => {
    if (phase === PhaseType.Started) {
      setIsGameStarted.on();
    }
    if (phase === PhaseType.Ended) {
      onFinish({
        wpm: getWPM(),
        acc: ((correctChar - errorChar) / text.length) * 100,
      });
    }
  }, [phase]);

  useEffect(() => {
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
            {/* <ShowedText
              validText={validText}
              currentWord={wordToType}
              text={textToType}
            /> */}
            <TypingInput
              {...typerProps}
              text={text}
              onRestart={handleRestartClick}
            />
          </>
        )}
      </Box>
      {/* <SinglePlayerTypingInput
        value={inputValue}
        hasError={hasError}
        onChange={handleChange}
      /> */}
      <HStack>
        <Tooltip label="Try again" placement="top" hasArrow>
          <IconButton
            variant="outline"
            size="lg"
            aria-label="Try again"
            onClick={handleRestartClick}
            icon={<VscDebugRestart />}
          />
        </Tooltip>
        <Tooltip label="Start a new game" placement="top" hasArrow>
          <IconButton
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
