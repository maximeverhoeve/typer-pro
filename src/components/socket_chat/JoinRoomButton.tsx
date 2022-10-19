import { Button, useBoolean, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useSocketContext from '../../hooks/useSocketContext';
import JoinRoomModal from './JoinRoomModal';

const JoinRoomButton: React.FC = () => {
  const { socket } = useSocketContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <JoinRoomModal isOpen={isOpen} onClose={onClose} />
      <Button disabled={!socket.connected} ml="auto" onClick={onOpen}>
        Join chatroom
      </Button>
    </>
  );
};

export default JoinRoomButton;
