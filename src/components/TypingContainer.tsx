import React, { useEffect } from 'react';
import {
  Box,
  IconButton,
  Input,
  Spinner,
  VStack,
  Tooltip,
} from '@chakra-ui/react';
import { Joke } from '../hooks/useJoke';
import useTyper, { Stats } from '../hooks/useTyper';
import ShowedText from './ShowedText';
import { VscDebugRestart } from 'react-icons/vsc';

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
      <Input
        autoFocus
        border="none"
        fontSize="6xl"
        color={hasError ? 'red.500' : 'gray.600'}
        _focus={{ boxShadow: 'none' }}
        value={inputValue}
        borderRadius="none"
        textAlign="center"
        onChange={handleChange}
        height="auto"
      />
      <Tooltip label="Restart" hasArrow placement="top">
        <IconButton
          aria-label="restart"
          icon={<VscDebugRestart size="20px" />}
          variant="ghost"
          isLoading={isLoading}
          _hover={{ bg: 'gray.700', color: 'white' }}
          onClick={handleRestartClick}
        />
      </Tooltip>
    </VStack>
  );
};

export default TypingContainer;
