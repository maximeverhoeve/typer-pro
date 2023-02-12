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
import useTyper, { Stats } from '../hooks/useTyper';
import ShowedText from './ShowedText';
import { VscDebugRestart } from 'react-icons/vsc';
import { AiFillCaretRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import SinglePlayerTypingInput from '../features/singleplayer/components/SinglePlayerTypingInput';

interface Props {
  joke?: Joke;
  isLoading?: boolean;
  onRestart?: () => void;
  onFinish: (stats: Stats) => void;
}

const TypingContainer: React.FC<Props> = ({
  joke,
  onRestart,
  isLoading,
  onFinish,
}) => {
  const text = joke?.joke || '';
  const navigate = useNavigate();

  const {
    textToType,
    validText,
    wordToType,
    inputValue,
    handleChange,
    hasError,
    onReset,
  } = useTyper(text, onFinish);

  const handleRestartClick = (): void => {
    onRestart?.();
    onReset();
  };

  useEffect(() => {
    onReset();
  }, [text]);

  return (
    <VStack spacing="8" height="100%" justify="flex-end" flexGrow={1}>
      <Box maxW="4xl">
        {isLoading ? (
          <Box display="inline">
            <Spinner size="xl" color="secondary" />
          </Box>
        ) : (
          <ShowedText
            validText={validText}
            currentWord={wordToType}
            text={textToType}
          />
        )}
      </Box>
      <SinglePlayerTypingInput
        value={inputValue}
        hasError={hasError}
        onChange={handleChange}
      />
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
