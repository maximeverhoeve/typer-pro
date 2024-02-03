import { Box, Center, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import useTyping from 'react-typing-game-hook';
import TypingInput from '../features/singleplayer/components/TypingInput';
import useRoomState from '../store/useRoomState';

const MultiplayerGame: React.FC = () => {
  const { socket } = useSocket();
  const text = useRoomState((state) => state.text);
  const typerProps = useTyping(text, {
    skipCurrentWordOnSpace: false,
    pauseOnError: true,
    countErrors: 'everytime',
  });
  const {
    states: { currIndex, length, correctChar },
  } = typerProps;

  useEffect(() => {
    /** Sadly I have to listen to the currIndexd to set the progress because I can't put it in the onChange function of the typerHook */
    socket.emit('player:update', { progress: correctChar / length || 0 });
  }, [currIndex]);

  return (
    <Center>
      {text ? (
        <Box maxW="3xl">
          <TypingInput {...typerProps} text={text} onRestart={() => null} />
        </Box>
      ) : (
        <Spinner />
      )}
    </Center>
  );
};

export default MultiplayerGame;
