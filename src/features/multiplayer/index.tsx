import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MultiplayerRoomTable from './components/room-table/MultiplayerRoomTable';
import { Room } from './types/RoomTypes';
import { Center, Spinner, Text, VStack, useDisclosure } from '@chakra-ui/react';
import MultiPlayerRoomHeader from './components/MultiPlayerRoomHeader';
import MultiplayerRoomAddModal from './components/add-room-modal/MultiplayerRoomAddModal';
import { useSocket } from '../../hooks/useSocket';

const Multiplayer: React.FC = () => {
  // Check if socket server is connecting, show loading
  const { socket, isConnected } = useSocket();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [rooms, setRooms] = useState<Room[]>([]);

  const handleGetRoom = (rooms: Room[]): void => {
    setRooms(rooms);
  };

  useEffect(() => {
    // emmit event to get all rooms
    socket.emit('rooms:request');
    socket.on('rooms:get', handleGetRoom);

    return () => {
      socket.off('rooms:get');
    };
  }, []);

  if (!isConnected) {
    return (
      <VStack spacing="2">
        <Spinner color="secondary" size="md" />
        <Text>Connecting to server...</Text>
      </VStack>
    );
  }

  return (
    <motion.div
      style={{
        width: '100%',
      }}
      initial={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      exit={{ translateY: 0, opacity: 0 }}
    >
      <MultiplayerRoomAddModal
        isOpen={isOpen}
        onClose={onClose}
        rooms={rooms}
      />
      <Center>
        <VStack spacing="4" align="stretch" maxW="2xl" w="100%">
          <MultiPlayerRoomHeader onAddRoom={onOpen} />
          <MultiplayerRoomTable rooms={rooms} onAddRoom={onOpen} />
          {rooms.length && (
            <Text align="center">{rooms.length} rooms online</Text>
          )}
        </VStack>
      </Center>
    </motion.div>
  );
};

export default Multiplayer;
