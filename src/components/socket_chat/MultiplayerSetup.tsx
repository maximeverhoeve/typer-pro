import React, { SyntheticEvent, useState } from 'react';
import { Button, Text, VStack, Input } from '@chakra-ui/react';
import useSocketContext from '../../hooks/useSocketContext';
import { motion } from 'framer-motion';

const MultiplayerSetup: React.FC = () => {
  const { socket, nickname: contextNickname } = useSocketContext();
  const [nickname, setNickname] = useState<string>(contextNickname || '');
  const [room, setRoom] = useState<string>('');

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    socket.emit('room:join', { nickname, room });
  };

  return (
    <motion.div
      initial={{ transform: 'scale(0.1)' }}
      animate={{ transform: 'scale(1)' }}
      exit={{ transform: 'scale(0.1)', opacity: 0 }}
    >
      <Text>
        Want to chat while playing TyperPro? Set a nickname and join a room!
      </Text>
      <VStack mt="6" align="stretch" spacing="3">
        <Input
          placeholder="Nickname"
          name="nickname"
          autoFocus
          value={nickname}
          onChange={(e) => setNickname(e.currentTarget.value.trim())}
        />
        <Input
          placeholder="Room"
          name="room"
          value={room}
          onChange={(e) => setRoom(e.currentTarget.value.trim())}
        />
      </VStack>
      <Button onClick={handleSubmit}>Join</Button>
    </motion.div>
  );
};

export default MultiplayerSetup;
