import { Input, VStack } from '@chakra-ui/react';
import React from 'react';
import PlayersProgressView from '../components/game/PlayersProgressView';
import ShowedText from '../components/ShowedText';
import StatsView from '../components/StatsView';
import useGameContext from '../hooks/useGameContext';
import useTyper from '../hooks/useTyper';

export interface Stats {
  cpm: number;
  wpm: number;
}

const Game: React.FC = () => {
  const { textToType: text } = useGameContext();

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
    <VStack spacing="6" align="stretch" px="6" w="100%" maxW="700px">
      <PlayersProgressView />
      {isFinished ? (
        <StatsView stats={getStats()} onRestart={() => null} />
      ) : (
        <VStack align="stretch">
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
  );
};

export default Game;
