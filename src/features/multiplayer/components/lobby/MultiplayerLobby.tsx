import React from 'react';
import { useParams } from 'react-router-dom';

const MultiplayerLobby: React.FC = () => {
  const { room } = useParams<{ room: string }>();
  return (
    <div>
      <p>Welcome to room: {room}</p>
    </div>
  );
};

export default MultiplayerLobby;
