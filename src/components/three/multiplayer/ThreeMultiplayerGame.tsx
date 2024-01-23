import React, { useEffect } from 'react';

import ThreeSuspense from '../components/ThreeSuspense';
import { useSocket } from '../../../hooks/useSocket';
import ThreeMutliplayerScene from './ThreeMutliplayerScene';

const ThreeMultiplayerGame: React.FC = () => {
  const { socket } = useSocket();

  const handlePlayerLoaded = (): void => {
    socket.emit('player:update', { isLoaded: true });
  };

  useEffect(() => {
    return () => {
      socket.emit('player:update', { isLoaded: false });
    };
  }, []);

  return (
    <ThreeSuspense onFinish={handlePlayerLoaded}>
      <ThreeMutliplayerScene />
    </ThreeSuspense>
  );
};

export default ThreeMultiplayerGame;
