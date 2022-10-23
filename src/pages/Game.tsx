import { Input, VStack } from '@chakra-ui/react';
import React from 'react';
import PlayersProgressView from '../components/game/PlayersProgressView';
import ShowedText from '../components/ShowedText';
import useGameContext from '../hooks/useGameContext';
import useTyper from '../hooks/useTyper';

const Game: React.FC = () => {
  const { textToType: text } = useGameContext();

  const {
    textToType,
    validText,
    wordToType,
    inputValue,
    handleChange,
    hasError,
  } = useTyper(text || '');

  return (
    <VStack spacing="6" align="stretch">
      <PlayersProgressView />
      <VStack spacing="5" px="6" w="100%" maxW="700px" align="stretch">
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
    </VStack>
  );
};

export default Game;
