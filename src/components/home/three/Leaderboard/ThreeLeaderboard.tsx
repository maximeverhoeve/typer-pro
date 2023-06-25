import React, { useEffect, useRef } from 'react';
import Player from '../Player';
import { Group } from 'three';
import { useThree } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

interface LocationType {
  state?: {
    stats?: {
      wpm: number;
    };
    isHighScore: boolean;
  };
}

const ThreeLeaderboard: React.FC = () => {
  const playerRef = useRef<Group>(null);
  const location = useLocation() as LocationType;
  const isHighScore = location?.state && location.state.isHighScore;
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 50);
    gsap.to(camera.position, { z: 5, duration: 2 });
    camera.rotation.set(0, 0, 0);
  }, []);

  return (
    <>
      <Player ref={playerRef} animation={isHighScore ? 'Cheering' : 'Sad'} />
    </>
  );
};

export default ThreeLeaderboard;
