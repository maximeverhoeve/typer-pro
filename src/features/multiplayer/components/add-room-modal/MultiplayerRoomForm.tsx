import React from 'react';
import { VStack, Text, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { RoomInputs } from './MultiplayerRoomAddModal';

const MultiplayerRoomModalForm: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RoomInputs>();

  return (
    <VStack align="stretch" spacing="4">
      <VStack align="stretch">
        <Text>Room name</Text>
        <Input
          {...register('room')}
          borderColor={errors.room ? 'red' : 'border'}
          _focus={{
            borderColor: errors.room ? 'red' : 'border',
            outline: 'none',
            boxShadow: 'none',
          }}
        />
      </VStack>
      <VStack align="stretch">
        <Text>Nickname</Text>
        <Input
          {...register('nickname')}
          borderColor={errors.room ? 'red' : 'border'}
          _focus={{
            borderColor: errors.nickname ? 'red' : 'border',
            outline: 'none',
            boxShadow: 'none',
          }}
        />
      </VStack>
    </VStack>
  );
};

export default MultiplayerRoomModalForm;
