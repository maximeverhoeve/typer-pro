import { motion } from 'framer-motion';
import React from 'react';
import MultiplayerRoomTable from './components/room-table/MultiplayerRoomTable';
import { Room } from './types/RoomTypes';
import { Box, Button, Center, HStack, Text, VStack } from '@chakra-ui/react';
import { HiPlus } from 'react-icons/hi';

const Multiplayer: React.FC = () => {
  // Check if socket server is connecting, show loading
  const rooms: Room[] = [
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
    { name: 'room 1', count: 3 },
  ];

  return (
    <motion.div
      style={{
        width: '100%',
      }}
      initial={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      exit={{ translateY: 0, opacity: 0 }}
    >
      <Center>
        <VStack spacing="4" align="stretch" maxW="2xl" w="100%">
          <HStack spacing="4" justify="space-between">
            <Text fontSize="2xl" fontWeight="600">
              Online rooms
            </Text>
            <Button
              size="md"
              variant="outline"
              onClick={() => null}
              leftIcon={<HiPlus />}
            >
              Add room
            </Button>
          </HStack>
          <MultiplayerRoomTable rooms={rooms} onAddRoom={() => null} />
          <Text align="center">{rooms.length} rooms online</Text>
        </VStack>
      </Center>
    </motion.div>
  );
};

export default Multiplayer;
