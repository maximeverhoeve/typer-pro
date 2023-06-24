import React, { useEffect, useRef } from 'react';
import Player from '../Player';
import { Group } from 'three';
import { useThree } from '@react-three/fiber';

const ThreeLeaderboard: React.FC = () => {
  const playerRef = useRef<Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 5);
    camera.rotation.set(0, 0, 0);
  }, []);

  return (
    <>
      <Player ref={playerRef} animation="Sad" />
    </>
  );
};

export default ThreeLeaderboard;
