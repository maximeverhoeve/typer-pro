/* eslint-disable @typescript-eslint/no-floating-promises */
import { a, useSpringValue } from '@react-spring/three';
import React, { Suspense, useEffect, useLayoutEffect } from 'react';
import useSinglePlayerStore from '../../../store/useSinglePlayerStore';
import Player from '../../../components/home/three/components/Player';
import { useBoolean } from '@chakra-ui/react';

const MovingGhost: React.FC = () => {
  const progress = useSinglePlayerStore((state) => state.progress);
  const previousTime = useSinglePlayerStore((state) => state.previousTime);
  const isGameStarted = useSinglePlayerStore((state) => state.isGameStarted);
  const [isMovingGhost, setIsMovingGhost] = useBoolean();

  const previousZ = useSpringValue(0, {
    from: 0,
    onStart: setIsMovingGhost.on,
    onRest: setIsMovingGhost.off,
    reset: progress === 0,
  });

  useEffect(() => {
    if (isGameStarted && progress > 0) {
      previousZ.start({
        to: 100,
        config: {
          duration: (previousTime || 0) * 1000,
        },
      });
    } else {
      previousZ.stop();
      previousZ.set(0);
    }
  }, [isGameStarted, progress]);

  useLayoutEffect(() => {
    previousZ.stop();
    previousZ.set(0);
  }, []);

  return (
    <a.group
      position-z={previousZ}
      visible={!!previousTime && previousZ.get() !== 100}
    >
      <Suspense fallback={null}>
        <Player
          isGhost
          animation={isMovingGhost ? 'Runner' : 'Standing'}
          color="#008585"
        />
      </Suspense>
    </a.group>
  );
};

export default MovingGhost;
