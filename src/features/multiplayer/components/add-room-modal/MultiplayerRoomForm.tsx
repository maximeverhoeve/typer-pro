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
        <Text
          sx={{
            span: {
              color: 'red',
            },
          }}
        >
          Room name <span>*</span>
        </Text>
        <Input
          {...register('room')}
          borderColor={errors.room ? 'red' : undefined}
          _focus={{
            borderColor: errors.room ? 'red' : undefined,
            outline: 'none',
            boxShadow: 'none',
          }}
        />
      </VStack>
      <VStack align="stretch">
        <Text
          sx={{
            span: {
              color: 'red',
            },
          }}
        >
          Nickname <span>*</span>
        </Text>
        <Input
          {...register('nickname')}
          _focus={{
            borderColor: errors.nickname ? 'red' : undefined,
            outline: 'none',
            boxShadow: 'none',
          }}
        />
      </VStack>
    </VStack>
  );
};

export default MultiplayerRoomModalForm;
