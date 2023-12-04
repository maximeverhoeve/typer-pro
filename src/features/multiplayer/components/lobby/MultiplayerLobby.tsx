import React, { useEffect } from 'react';
import { Center } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../../../../hooks/useSocket';
import MultiplayerRoomJoinModal from '../join-room-modal/MultiplayerRoomJoinModal';
import PreGameLobby from '../../../../pages/PreGameLobby';
import useMultiplayerStore from '../../../../store/useMultiplayerStore';

/** Checking room validation */
const MultiplayerLobby: React.FC = () => {
  const { socket } = useSocket();
  const { room } = useParams<{ room: string }>();
  const players = useMultiplayerStore((state) => state.players);
  const setPlayers = useMultiplayerStore((state) => state.setPlayers);
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

  return <PreGameLobby players={players} />;
};

export default MultiplayerLobby;
