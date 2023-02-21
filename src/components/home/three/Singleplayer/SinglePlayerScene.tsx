import React, { useRef } from 'react';
import { useBoolean } from '@chakra-ui/react';
import { a, useSpring } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import useSinglePlayerStore from '../../../../store/useSinglePlayerStore';
import Player from '../Player';
import { Mesh } from 'three';

const SinglePlayerScene: React.FC = () => {
  const playerRef = useRef<Mesh>(null);
  const [isMoving, setIsMoving] = useBoolean();
  const progress = useSinglePlayerStore((state) => state.progress);
  const AnimatedPlayer = a(Player);
  const [{ scale }] = useSpring(
    {
      scale: progress,
      config: {
        mass: 1,
        tension: 100,
        friction: 20,
        precision: 0.01,
        duration: 400,
      },
      onStart: setIsMoving.on,
      onRest: setIsMoving.off,
    },
    [progress],
  );

  useFrame((props, delta) => {
    if (playerRef.current) {
      playerRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <>
      <AnimatedPlayer
        ref={playerRef}
        scale={scale}
        color={isMoving ? '#00CACA' : '#DC0077'}
      />
    </>
  );
};

export default SinglePlayerScene;
