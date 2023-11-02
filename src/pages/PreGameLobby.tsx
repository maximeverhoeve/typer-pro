import { Button, Center, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Player } from '../types/socketTypes';
import { useSocket } from '../hooks/useSocket';
import MultiplayerLobbyTable from '../features/multiplayer/components/lobby/lobby-table/MultiplayerLobbyTable';

interface Props {
  players: Player[];
}

const PreGameLobby: React.FC<Props> = ({ players }) => {
  const { socket } = useSocket();
  const me = players.find(({ id }) => id === socket.id);

  const handleClickReady = (): void => {
    // Toggle ready
    if (me) {
      socket.emit('player:update-ready', !me.isReady);
    }
  };

  const handleStart = (): void => {
    // socket.emit('game:start');
  };

  const isEveryPlayerReady = players.every((p) => p.isReady);

  return (
    <Center>
      <VStack align="stretch" spacing="2" w="100%" maxW="xl">
        <MultiplayerLobbyTable players={players} />
        <HStack justify="flex-end">
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
