import React from 'react';
import { Box, Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { Joke } from '../hooks/useJoke';
import useTyper from '../hooks/useTyper';
import ShowedText from './ShowedText';
import StatsView from './StatsView';
import { VscDebugRestart } from 'react-icons/vsc';
import { AnimatePresence, motion } from 'framer-motion';

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
    const _end = end || Date.now();
    const totalTime = _end - start;
    const oneMinInMs = 60000;
    const textWordLength = text.split(' ').length;

    const cpm = text.length * (oneMinInMs / totalTime);
    const wpm = textWordLength * (oneMinInMs / totalTime);
    return {
      wpm: Math.round(wpm),
      cpm: Math.round(cpm),
    };
  };
  if (joke) {
    return (
      <Box maxW="3xl" w="100%">
        <HStack mb="4" fontSize="xl" spacing="10">
          <Text color="text">WPM:{getStats().wpm}</Text>
          <Text color="text">CPM:{getStats().cpm}</Text>
        </HStack>
        <AnimatePresence mode="wait">
          {isFinished ? (
            <motion.div
              key="stats"
              initial={{ translateX: '20%', opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <VStack
                bg="box"
                border="1px solid"
                borderColor="border"
                p="6"
                align="stretch"
                spacing="6"
                overflowX="hidden"
              >
                <StatsView stats={getStats()} onRestart={handleRestartClick} />
              </VStack>
            </motion.div>
          ) : (
            <motion.div
              key="input"
              exit={{ translateX: '-20%', opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <VStack
                bg="box"
                border="1px solid"
                borderColor="border"
                p="6"
                align="stretch"
                spacing="6"
                overflowX="hidden"
              >
                <ShowedText
                  validText={validText}
                  currentWord={wordToType}
                  text={textToType}
                />
                <Input
                  autoFocus={true}
                  autoCapitalize="off"
                  bg={hasError ? 'error' : 'box'}
                  borderRadius="none"
                  onChange={handleChange}
                  fontWeight="bold"
                  value={inputValue}
                  borderColor="border"
                  h="40px"
                  fontSize="xl"
                  _focus={{ boxShadow: 'unset', borderColor: 'border' }}
                />
              </VStack>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    );
  }

  return (
    <VStack spacing="5" px="6" w="100%" maxW="600px" align="stretch">
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
              leftIcon={<VscDebugRestart size="20px" />}
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
