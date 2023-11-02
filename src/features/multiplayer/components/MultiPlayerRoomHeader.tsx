import { Button, HStack, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { HiPlus, HiRefresh } from 'react-icons/hi';

interface Props {
  onAddRoom: () => void;
  onRefresh: () => void;
}

const MultiPlayerRoomHeader: React.FC<Props> = ({ onAddRoom, onRefresh }) => {
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
      <IconButton
        size="md"
        variant="outline"
        onClick={onRefresh}
        aria-label="refresh"
        icon={<HiRefresh />}
      />
    </HStack>
  );
};

export default MultiPlayerRoomHeader;
