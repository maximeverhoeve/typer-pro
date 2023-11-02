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

export default MultiplayerRoomJoinForm;
