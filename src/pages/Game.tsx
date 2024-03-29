import { Flex, Input, VStack } from '@chakra-ui/react';
import React from 'react';
import PlayersProgressView from '../components/legacy/game/PlayersProgressView';
import RoomLeaderboard from '../components/legacy/game/RoomLeaderboard';
import ShowedText from '../components/legacy/ShowedText';
import useTyper from '../hooks/legacy/useTyper';

export interface Stats {
  cpm: number;
  wpm: number;
}

/**
 * @deprecated Old component that is not used anymore, removed once first finished version comes out
 */
const Game: React.FC = () => {
  // const { textToType: text } = useGameContext();
  const text = 'text';

  const {
    textToType,
    validText,
    wordToType,
    inputValue,
    handleChange,
    isFinished,
    timer,
    hasError,
  } = useTyper(text || '');

  const getStats = (): Stats => {
    const { start, end } = timer;

    const totalTime = end - start;
    const oneMinInMs = 60000;
    const textWordLength = (text || '').split(' ').length;

    const cpm = (text || '').length * (oneMinInMs / totalTime);
    const wpm = textWordLength * (oneMinInMs / totalTime);
    return {
      wpm: Math.round(wpm),
      cpm: Math.round(cpm),
    };
  };

  return (
    <Flex align="center" flexGrow={1} justify="center" flexShrink={0}>
      <VStack spacing="8" align="stretch" px="6" w="100%" maxW="700px">
        <PlayersProgressView />
        {isFinished ? (
          <RoomLeaderboard stats={getStats()} />
        ) : (
          <VStack bg="gray.800" borderRadius="md" spacing="6" align="stretch">
            <ShowedText
              validText={validText}
              currentWord={wordToType}
              text={textToType}
            />
            <Input
              autoFocus={true}
              autoCapitalize="off"
              bg={hasError ? 'red.300' : 'white'}
              onChange={handleChange}
              fontWeight="bold"
              value={inputValue}
              _focus={{ boxShadow: 'unset', borderColor: 'black' }}
            />
          </VStack>
        )}
      </VStack>
    </Flex>
  );
};

export default Game;
