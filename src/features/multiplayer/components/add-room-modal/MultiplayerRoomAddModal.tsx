import React from 'react';
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
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import MultiplayerRoomModalForm from './MultiplayerRoomForm';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../hooks/useSocket';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export interface RoomInputs {
  nickname: string;
  room: string;
  pass?: string;
}

const validationSchema = object({
  nickname: string().max(15).required(),
  room: string().max(15).required(),
  pass: string(),
});

const MultiplayerRoomAddModal: React.FC<Props> = ({ onClose, isOpen }) => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const methods = useForm<RoomInputs>({
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = methods.handleSubmit((values) => {
    // create room
    const cleanedRoomName = values.room.replace(' ', '-');
    socket.emit('room:join', {
      room: cleanedRoomName,
      nickname: values.nickname,
    });
    // when done and success
    navigate(`/multiplayer/${values.room}`);
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <FormProvider {...methods}>
        <ModalContent
          bg="background"
          color="white"
          border="1px solid"
          borderColor="#454545"
        >
          <ModalHeader>Create multiplayer room</ModalHeader>
          <ModalCloseButton />
          <ModalBody py="4">
            <MultiplayerRoomModalForm />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <Button variant="outline" size="md" onClick={handleSubmit}>
              Create room
            </Button>
          </ModalFooter>
        </ModalContent>
      </FormProvider>
    </Modal>
  );
};

export default MultiplayerRoomAddModal;
