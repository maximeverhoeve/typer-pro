import React, { useRef } from 'react';
import { useBoolean } from '@chakra-ui/react';
import { useSpring } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import useSinglePlayerStore from '../../../../store/useSinglePlayerStore';
import Player from '../Player';
import { Mesh } from 'three';

const SinglePlayerScene: React.FC = () => {
  const playerRef = useRef<Mesh>(null);
  const [isMoving, setIsMoving] = useBoolean();
  const progress = useSinglePlayerStore((state) => state.progress);
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
      <group>
        <Player isMoving={isMoving} />
        <Player position={[2, 0, 0]} isMoving={!isMoving} color="#00CACA" />
        <Player position={[-2, 0, 0]} isMoving={!isMoving} color="#0a0" />
      </group>
    </>
  );
};

export default SinglePlayerScene;
