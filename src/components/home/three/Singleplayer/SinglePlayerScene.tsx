import { useBoolean } from '@chakra-ui/react';
import { a, useSpring } from '@react-spring/three';
import React from 'react';
import useSinglePlayerStore from '../../../../store/useSinglePlayerStore';
import Player from '../Player';

const SinglePlayerScene: React.FC = () => {
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
        duration: 500,
      },
      onStart: setIsMoving.on,
      onRest: setIsMoving.off,
    },
    [progress],
  );

  return (
    <>
      <AnimatedPlayer scale={scale} color={isMoving ? '#0F0' : '#F00'} />
    </>
  );
};

export default SinglePlayerScene;
