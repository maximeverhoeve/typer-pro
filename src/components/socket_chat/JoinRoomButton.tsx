import { Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import useSocketContext from '../../hooks/useSocketContext';
import JoinRoomModal from './MultiplayerSetup';

const JoinRoomButton: React.FC = () => {
  const { isConnected } = useSocketContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button disabled={!isConnected} ml="auto" onClick={onOpen}>
        Join chatroom
      </Button>
    </>
  );
};

export default JoinRoomButton;
