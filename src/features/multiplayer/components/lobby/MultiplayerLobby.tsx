import { Center } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';

/** Checking room validation */
const MultiplayerLobby: React.FC = () => {
  const { room } = useParams<{ room: string }>();
  return (
    <Center>
      <p>Welcome to room: {room}</p>
    </Center>
  );
};

export default MultiplayerLobby;
