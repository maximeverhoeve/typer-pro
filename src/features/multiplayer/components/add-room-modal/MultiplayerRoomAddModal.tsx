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

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export interface RoomInputs {
  name: string;
  pass?: string;
}

const validationSchema = object({
  name: string().required(),
  pass: string(),
});

const MultiplayerRoomAddModal: React.FC<Props> = ({ onClose, isOpen }) => {
  const navigate = useNavigate();
  const methods = useForm<RoomInputs>({
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = methods.handleSubmit((values) => {
    // create room

    // when done and success
    navigate(`/multiplayer/${values.name}`);
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
