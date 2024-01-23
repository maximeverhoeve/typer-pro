import React from 'react';
import { VStack, Text, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { RoomInputs } from './MultiplayerRoomJoinModal';

const MultiplayerRoomJoinForm: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RoomInputs>();

  return (
    <VStack align="stretch" spacing="4">
      <VStack align="stretch">
        <Text>Nickname</Text>
        <Input
          {...register('nickname')}
          maxLength={20}
          borderColor={errors.nickname ? 'red.300' : 'border'}
          _focus={{
            borderColor: errors.nickname ? 'red.300' : 'border',
            outline: 'none',
            boxShadow: 'none',
          }}
        />
        {!!errors.nickname && (
          <Text color="red.300">{errors.nickname.message}</Text>
        )}
      </VStack>
    </VStack>
  );
};

export default MultiplayerRoomJoinForm;
