import { Button, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { HiPlus } from 'react-icons/hi';

interface Props {
  onAddRoom: () => void;
}

const MultiPlayerRoomHeader: React.FC<Props> = ({ onAddRoom }) => {
  return (
    <HStack spacing="2" justify="space-between">
      <Text fontSize="2xl" fontWeight="600" flexGrow="1">
        Online rooms
      </Text>
      <Button
        size="md"
        variant="outline"
        onClick={onAddRoom}
        leftIcon={<HiPlus />}
      >
        Add room
      </Button>
    </HStack>
  );
};

export default MultiPlayerRoomHeader;
