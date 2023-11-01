import React from 'react';
import { Button, Tbody, Td, Text, Tr, VStack } from '@chakra-ui/react';
import { Room } from '../../types/RoomTypes';
import { HiPlus } from 'react-icons/hi';

interface Props {
  rooms: Room[];
  onAdd: () => void;
}

const MultiplayerRoomTableBody: React.FC<Props> = ({ rooms, onAdd }) => {
  if (!rooms.length) {
    return (
      <Tbody>
        <Tr>
          <Td colSpan={3} p="10">
            <VStack spacing="4">
              <Text align="center">Oh no, no rooms online</Text>
              <Button
                size="md"
                variant="outline"
                onClick={onAdd}
                leftIcon={<HiPlus />}
              >
                Add room
              </Button>
            </VStack>
          </Td>
        </Tr>
      </Tbody>
    );
  }

  return (
    <Tbody>
      {rooms.map(({ name, count }) => {
        const isDisabled = count >= 4;
        return (
          <Tr key={name}>
            <Td display="flex" alignItems="center" gap="2">
              <Text>{name}</Text>
            </Td>
            <Td>{count} / 4</Td>
            <Td textAlign="end">
              <Button size="sm" variant="outline" isDisabled={isDisabled}>
                Join
              </Button>
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

export default MultiplayerRoomTableBody;
