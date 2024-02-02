import React, { useEffect } from 'react';

import ThreeSuspense from '../components/ThreeSuspense';
import { useSocket } from '../../../hooks/useSocket';
import ThreeMutliplayerScene from './ThreeMutliplayerScene';

const ThreeMultiplayerGame: React.FC = () => {
  const { socket } = useSocket();

  const handlePlayerLoaded = (): void => {
    // !! this will not trigger when component was already loaded before
  };

  useEffect(() => {
    return () => {
      socket.emit('player:update', { isLoaded: false });
      socket.emit('player:update-ready', false);
    };
  }, []);

  return (
    <ThreeSuspense onFinish={handlePlayerLoaded}>
      <ThreeMutliplayerScene />
    </ThreeSuspense>
  );
};

export default ThreeMultiplayerGame;
