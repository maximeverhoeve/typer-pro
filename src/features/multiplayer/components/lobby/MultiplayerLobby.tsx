import React, { useEffect, useState } from 'react';
import { Center, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../../../../hooks/useSocket';
import { Player } from '../../../../types/socketTypes';
import MultiplayerRoomJoinModal from '../join-room-modal/MultiplayerRoomJoinModal';

/** Checking room validation */
const MultiplayerLobby: React.FC = () => {
  const { socket } = useSocket();
  const { room } = useParams<{ room: string }>();
  const [players, setPlayers] = useState<Player[]>([]);
  const isInList = players.some(({ id }) => id === socket.id);
  const isFull = !isInList && players.length >= 4;

  useEffect(() => {
    socket.on('room:update', (_players) => {
      setPlayers(_players);
    });

    if (room) {
      socket.emit('room:request', room);
    }

    return () => {
      socket.off('room:update');
      socket.emit('room:leave');
    };
  }, []);

  if (isFull) {
    return (
      <Center>
        <p>{room} is currently full</p>
      </Center>
    );
  }

  if (!isInList && room) {
    return <MultiplayerRoomJoinModal room={room} isOpen />;
  }

  return (
    <Center>
      <VStack>
        <p>Welcome to room: {room}</p>
        {players.map(({ nickname, id }) => (
          <Text key={id} color={id === socket.id ? 'secondary' : 'white'}>
            {nickname}
          </Text>
        ))}
      </VStack>
    </Center>
  );
};

export default MultiplayerLobby;
