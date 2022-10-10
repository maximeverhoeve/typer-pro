import React from 'react';
import { Button, HStack, Input, VStack } from '@chakra-ui/react';
import { Joke } from '../hooks/useJokes';
import useTyper from '../hooks/useTyper';
import { RepeatIcon } from '@chakra-ui/icons';
import ShowedText from './ShowedText';

interface Props {
  jokes: Joke[];
  onRestart?: () => void;
}

const TypingContainer: React.FC<Props> = ({ jokes, onRestart }) => {
  // for now, only pick the first joke
  const text = jokes[0]?.joke || '';

  const {
    textToType,
    validText,
    wordToType,
    inputValue,
    handleChange,
    isFinished,
    timer,
    onReset,
  } = useTyper(text);

  const handleRestartClick = (): void => {
    onRestart?.();
    onReset();
  };

  const getWPM = (): number => {
    const { start, end } = timer;

    const totalTime = end - start;
    const oneMinInMs = 60000;
    const textLength = text.split(' ').length;

    const wpm = textLength * (oneMinInMs / totalTime);
    return Math.round(wpm);
  };

  return (
    <VStack
      spacing="5"
      bg="gray.100"
      p="6"
      borderRadius="md"
      w="600px"
      maxW="90%"
      align="stretch"
    >
      {isFinished ? (
        <>
          <p>WPM: {getWPM()}</p>
          <Button
            leftIcon={<RepeatIcon />}
            variant="solid"
            colorScheme="yellow"
            minW="32"
            onClick={handleRestartClick}
          >
            Restart
          </Button>
        </>
      ) : (
        <>
          <ShowedText
            validText={validText}
            currentWord={wordToType}
            text={textToType}
          />
          <HStack>
            <Input bg="white" onChange={handleChange} value={inputValue} />
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
