import React, { ChangeEvent } from 'react';
import { VStack, Text, Input } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { RoomInputs } from './MultiplayerRoomAddModal';

const MultiplayerRoomModalForm: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RoomInputs>();

  const handleRoomChange = (
    event: ChangeEvent<HTMLInputElement>,
    callbackFn: (value?: string) => void,
  ): void => {
    // Make it impossible to add spaces to the roominput
    callbackFn(event?.currentTarget?.value?.replaceAll(' ', ''));
  };

  return (
    <VStack align="stretch" spacing="4">
      <VStack align="stretch">
        <Text>Room name</Text>
        <Controller
          name="room"
          render={({ field }) => (
            <>
              <Input
                {...field}
                /** Adding value manually to make sure it is a controlled input */
                value={field.value as string}
                onChange={(e) => handleRoomChange(e, field.onChange)}
                borderColor={errors.room ? 'red.300' : 'border'}
                _focus={{
                  borderColor: errors.room ? 'red.300' : 'border',
                  outline: 'none',
                  boxShadow: 'none',
                }}
              />
              {!!errors.room && (
                <Text color="red.300">{errors.room.message}</Text>
              )}
            </>
          )}
        />
      </VStack>
      <VStack align="stretch">
        <Text>Nickname</Text>
        <Input
          {...register('nickname')}
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

export default MultiplayerRoomModalForm;
