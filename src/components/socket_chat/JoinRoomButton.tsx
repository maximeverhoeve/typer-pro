import { Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import JoinRoomModal from './JoinRoomModal';

const JoinRoomButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <JoinRoomModal isOpen={isOpen} onClose={onClose} />
      <Button ml="auto" onClick={onOpen}>
        Join chatroom
      </Button>
    </>
  );
};

export default JoinRoomButton;
