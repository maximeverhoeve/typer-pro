import React, { SyntheticEvent, useState } from 'react';
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
  const { socket, nickname: contextNickname } = useSocketContext();
  const [nickname, setNickname] = useState<string>(contextNickname || '');
  const [room, setRoom] = useState<string>('');

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    socket.emit('join_room', { nickname, room });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
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
              autoFocus
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
            colorScheme="yellow"
            variant="solid"
            type="submit"
          >
            Join Room
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JoinRoomModal;
