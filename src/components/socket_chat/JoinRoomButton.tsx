import { Button, useBoolean, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useSocketContext from '../../hooks/useSocketContext';
import JoinRoomModal from './JoinRoomModal';

const JoinRoomButton: React.FC = () => {
  const { socket } = useSocketContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isConnected, setIsConnected] = useBoolean(false);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected.on();
    });
    socket.on('disconnect', () => {
      setIsConnected.off();
    });

    return () => {
      socket.off('connect');
    };
  }, []);

  return (
    <>
      <JoinRoomModal isOpen={isOpen} onClose={onClose} />
      <Button disabled={!isConnected} ml="auto" onClick={onOpen}>
        Join chatroom
      </Button>
    </>
  );
};

export default JoinRoomButton;
