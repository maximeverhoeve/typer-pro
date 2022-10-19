import { Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import useSocketContext from '../../hooks/useSocketContext';
import JoinRoomModal from './JoinRoomModal';

const JoinRoomButton: React.FC = () => {
  const { isConnected } = useSocketContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
