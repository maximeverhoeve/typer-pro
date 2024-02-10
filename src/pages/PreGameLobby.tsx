import { Button, Center, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useSocket } from '../hooks/useSocket';
import MultiplayerLobbyTable from '../features/multiplayer/components/lobby/lobby-table/MultiplayerLobbyTable';
import MultiplayerLobbyPlayerSettings from '../features/multiplayer/components/lobby/MultiplayerLobbyPlayerSettings';
import { useNavigate, useParams } from 'react-router-dom';
import useMultiplayerStore from '../store/useMultiplayerStore';
import useRoomState from '../store/useRoomState';

const PreGameLobby: React.FC = () => {
  const players = useMultiplayerStore((state) => state.players);
  const { room } = useParams<{ room: string }>();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number>();
  const status = useRoomState((state) => state.status);
  const isInProgress = status === 'IN-PROGRESS';
  const me = players.find(({ id }) => id === socket.id);

  useEffect(() => {
    socket.on('room:update-countdown', (_count) => {
      setCountdown(_count);
    });
    socket.on('room:countdown-ended', handleStart);

    return () => {
      socket.off('room:update-countdown');
      socket.off('room:countdown-ended');
    };
  }, []);

  const handleClickReady = (): void => {
    // Toggle ready
    if (me) {
      socket.emit('player:update-ready', !me.isReady);
    }
  };

  const handleStart = (): void => {
    if (room) {
      navigate(`/multiplayer/${room}/game`);
    }
  };

  const isEveryPlayerReady = players.every((p) => p.isReady);

  return (
    <Center>
      <VStack align="stretch" spacing="4" w="100%" maxW="xl">
        {isInProgress ? (
          <Text align="center">Game is still progress</Text>
        ) : (
          isEveryPlayerReady && (
            <Text align="center">Game starting in {countdown}</Text>
          )
        )}

        <MultiplayerLobbyTable players={players} />
        <HStack justify="space-between" align="center">
          {me && <MultiplayerLobbyPlayerSettings player={me} />}
          <Button
            isDisabled={players.length < 2}
            leftIcon={me?.isReady ? <IoClose size="20px" /> : <FaCheck />}
            variant="outline"
            _hover={{ bg: 'gray.900' }}
            _active={{ bg: 'gray.700' }}
            colorScheme={me?.isReady ? 'primary' : 'secondary'}
            onClick={handleClickReady}
          >
            {me?.isReady ? 'Unready' : 'Ready up'}
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
};

export default PreGameLobby;
