import { Center, Spinner, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import useTyping, { PhaseType } from 'react-typing-game-hook';
import TypingInput from '../features/singleplayer/components/TypingInput';
import useRoomState from '../store/useRoomState';
import { getAcc, getWPM } from '../utils/stats';
import { useNavigate } from 'react-router-dom';

const MultiplayerGame: React.FC = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const roomName = useRoomState((state) => state.name);
  const text = useRoomState((state) => state.text);
  const status = useRoomState((state) => state.status);
  const countdown = useRoomState((state) => state.countdown);
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
      endTime,
      startTime,
      phase,
    },
  } = typerProps;

  useEffect(() => {
    /** Sadly I have to listen to the currIndexd to set the progress because I can't put it in the onChange function of the typerHook */
    socket.emit('player:update', { progress: correctChar / length || 0 });
  }, [currIndex]);

  useEffect(() => {
    if (phase === PhaseType.Ended && text) {
      const stats = {
        wpm: getWPM({ endTime, startTime, text }),
        acc: getAcc({ correctChar, errorChar, text }),
      };
      // Send stats to BE
      socket.emit('room:finished', stats);
      if (roomName) {
        navigate(`/multiplayer/${roomName}/finish`);
      }
    }
  }, [phase]);

  return (
    <Center>
      {text ? (
        <VStack maxW="3xl" position="relative">
          {status === 'IN-PROGRESS' ? (
            <TypingInput {...typerProps} text={text} onRestart={() => null} />
          ) : (
            countdown > 0 && (
              <Text textAlign="center" fontSize="2xl">
                {countdown}
              </Text>
            )
          )}
        </VStack>
      ) : (
        <Spinner />
      )}
    </Center>
  );
};

export default MultiplayerGame;
