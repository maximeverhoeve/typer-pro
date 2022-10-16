import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  Input,
} from '@chakra-ui/react';
import useSocketContext from '../../hooks/useSocketContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const JoinRoomModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { socket } = useSocketContext();
  const [nickname, setNickname] = useState<string>('');
  const [room, setRoom] = useState<string>('');

  const onSubmit = (): void => {
    socket.emit('join_room', { nickname, room });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Join a chatroom</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Want to chat while playing TyperPro? Set a nickname and join a room!
          </Text>
          <VStack mt="6" align="stretch" spacing="3">
            <Input
              placeholder="Nickname"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.currentTarget.value)}
            />
            <Input
              placeholder="Room"
              name="room"
              value={room}
              onChange={(e) => setRoom(e.currentTarget.value)}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            isDisabled={!nickname || !room}
            colorScheme="purple"
            variant="solid"
            onClick={onSubmit}
          >
            Join Room
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JoinRoomModal;
