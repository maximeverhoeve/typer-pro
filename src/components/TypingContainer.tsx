import React from 'react';
import { Button, HStack, Input, VStack } from '@chakra-ui/react';
import { Joke } from '../hooks/useJoke';
import useTyper from '../hooks/useTyper';
import { RepeatIcon } from '@chakra-ui/icons';
import ShowedText from './ShowedText';
import StatsView from './StatsView';

interface Props {
  joke?: Joke;
  onRestart?: () => void;
}

export interface Stats {
  cpm: number;
  wpm: number;
}

const TypingContainer: React.FC<Props> = ({ joke, onRestart }) => {
  const text = joke?.joke || '';

  const {
    textToType,
    validText,
    wordToType,
    inputValue,
    handleChange,
    isFinished,
    timer,
    hasError,
    onReset,
  } = useTyper(text);

  const handleRestartClick = (): void => {
    onRestart?.();
    onReset();
  };

  const getStats = (): Stats => {
    const { start, end } = timer;

    const totalTime = end - start;
    const oneMinInMs = 60000;
    const textWordLength = text.split(' ').length;

    const cpm = text.length * (oneMinInMs / totalTime);
    const wpm = textWordLength * (oneMinInMs / totalTime);
    return {
      wpm: Math.round(wpm),
      cpm: Math.round(cpm),
    };
  };

  return (
    <VStack spacing="5" w="600px" maxW="90%" align="stretch">
      {isFinished ? (
        <StatsView stats={getStats()} onRestart={handleRestartClick} />
      ) : (
        <>
          <ShowedText
            validText={validText}
            currentWord={wordToType}
            text={textToType}
          />
          <HStack>
            <Input
              autoFocus={true}
              autoCapitalize="off"
              bg={hasError ? 'red.300' : 'white'}
              onChange={handleChange}
              fontWeight="bold"
              value={inputValue}
              _focus={{ boxShadow: 'unset', borderColor: 'black' }}
            />
            <Button
              leftIcon={<RepeatIcon />}
              variant="solid"
              colorScheme="yellow"
              minW="32"
              onClick={handleRestartClick}
            >
              Restart
            </Button>
          </HStack>
        </>
      )}
    </VStack>
  );
};

export default TypingContainer;
