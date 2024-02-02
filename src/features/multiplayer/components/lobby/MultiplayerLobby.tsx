import React, { useEffect } from 'react';
import { Center } from '@chakra-ui/react';
import { Outlet, useParams } from 'react-router-dom';
import { useSocket } from '../../../../hooks/useSocket';
import MultiplayerRoomJoinModal from '../join-room-modal/MultiplayerRoomJoinModal';
import useMultiplayerStore from '../../../../store/useMultiplayerStore';
import useRoomState from '../../../../store/useRoomState';

/** Checking room validation */
const MultiplayerLobby: React.FC = () => {
  const { socket } = useSocket();
  const { room } = useParams<{ room: string }>();
  const players = useMultiplayerStore((state) => state.players);
  const setPlayers = useMultiplayerStore((state) => state.setPlayers);
  const isInList = players.some(({ id }) => id === socket.id);
  const isFull = !isInList && players.length >= 4;
  const roomStatus = useRoomState((state) => state.status);
  const countdown = useRoomState((state) => state.countdown);
  const resetRoomState = useRoomState((state) => state.reset);

  useEffect(() => {
    socket.on('room:update', (_players) => {
      setPlayers(_players);
    });

    /** Update roomState to be in sync with server */
    socket.on('roomstate:update', (roomState) => {
      useRoomState.setState(roomState);
    });

    if (room) {
      socket.emit('room:request', room);
    }

    return () => {
      socket.off('room:update');
      socket.off('roomstate:update');
      socket.emit('room:leave');
      resetRoomState();
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
    <>
      <Outlet />
      {`${roomStatus} - ${countdown}`}
    </>
  );
};

export default MultiplayerLobby;
