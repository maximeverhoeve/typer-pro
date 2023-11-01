import { motion } from 'framer-motion';
import React from 'react';
import MultiplayerRoomTable from './components/room-table/MultiplayerRoomTable';
import { Room } from './types/RoomTypes';
import { Center, Text, VStack } from '@chakra-ui/react';
import MultiPlayerRoomHeader from './components/MultiPlayerRoomHeader';

const Multiplayer: React.FC = () => {
  // Check if socket server is connecting, show loading
  const rooms: Room[] = [
    { name: 'room 1', count: 3 },
    { name: 'room 2', count: 3 },
    { name: 'room 3', count: 3 },
    { name: 'room 4', count: 3 },
    { name: 'room 5', count: 3 },
    { name: 'room 6', count: 3 },
    { name: 'room 7', count: 3 },
    { name: 'room 8', count: 3 },
    { name: 'room 9', count: 3 },
    { name: 'room 10', count: 3 },
    { name: 'room 11', count: 3 },
    { name: 'room 12', count: 3 },
    { name: 'room 13', count: 3 },
    { name: 'room 14', count: 3 },
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
          <MultiPlayerRoomHeader onAddRoom={() => null} />
          <MultiplayerRoomTable rooms={rooms} onAddRoom={() => null} />
          {rooms.length && (
            <Text align="center">{rooms.length} rooms online</Text>
          )}
        </VStack>
      </Center>
    </motion.div>
  );
};

export default Multiplayer;
