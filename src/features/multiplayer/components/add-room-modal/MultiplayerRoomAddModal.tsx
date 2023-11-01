import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MultiplayerRoomAddModal: React.FC<Props> = ({ onClose, isOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="background"
        color="white"
        border="1px solid"
        borderColor="#454545"
      >
        <ModalHeader>Create multiplayer room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>body</p>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="outline" size="md">
            Create room
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MultiplayerRoomAddModal;
