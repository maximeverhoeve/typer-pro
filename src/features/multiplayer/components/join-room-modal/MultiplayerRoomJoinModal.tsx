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
import MultiplayerRoomJoinModalForm from './MultiplayerRoomJoinForm';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../hooks/useSocket';

interface Props {
  isOpen: boolean;
  room: string;
}

export interface RoomInputs {
  nickname: string;
}

const validationSchema = object({
  nickname: string().required(),
});

const MultiplayerRoomJoinModal: React.FC<Props> = ({ room, isOpen }) => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const methods = useForm<RoomInputs>({
    resolver: yupResolver(validationSchema),
  });

  const handleClose = (): void => {
    navigate('/multiplayer');
  };

  const handleSubmit = methods.handleSubmit((values) => {
    // create room
    socket.emit('room:join', { room, nickname: values.nickname });
  });

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <FormProvider {...methods}>
        <ModalContent
          bg="background"
          color="white"
          border="1px solid"
          borderColor="#454545"
        >
          <ModalHeader>Join {room}</ModalHeader>
          <ModalCloseButton />
          <ModalBody py="4">
            <MultiplayerRoomJoinModalForm />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Return
            </Button>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <Button variant="outline" size="md" onClick={handleSubmit}>
              Join
            </Button>
          </ModalFooter>
        </ModalContent>
      </FormProvider>
    </Modal>
  );
};

export default MultiplayerRoomJoinModal;
