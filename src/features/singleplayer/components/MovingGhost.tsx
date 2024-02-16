/* eslint-disable @typescript-eslint/no-floating-promises */
import { a, useSpringValue } from '@react-spring/three';
import React, { Suspense, useEffect, useLayoutEffect } from 'react';
import useSinglePlayerStore from '../../../store/useSinglePlayerStore';
import Player from '../../../components/three/components/Player';
import { useBoolean } from '@chakra-ui/react';
import Soldier from '../../../components/three/components/Soldier';

const MovingGhost: React.FC = () => {
  const progress = useSinglePlayerStore((state) => state.progress);
  const previousTime = useSinglePlayerStore((state) => state.previousTime);
  const isGameStarted = useSinglePlayerStore((state) => state.isGameStarted);
  const [isMovingGhost, setIsMovingGhost] = useBoolean();

  const previousX = useSpringValue(0, {
    from: 0,
    onStart: setIsMovingGhost.on,
    onRest: setIsMovingGhost.off,
    reset: progress === 0,
  });

  useEffect(() => {
    if (isGameStarted && progress > 0) {
      previousX.start({
        to: 100,
        config: {
          duration: (previousTime || 0) * 1000,
        },
      });
    } else {
      previousX.stop();
      previousX.set(0);
    }
  }, [isGameStarted, progress]);

  useLayoutEffect(() => {
    previousX.stop();
    previousX.set(0);
  }, []);

  return (
    <a.group
      position-x={previousX}
      visible={!!previousTime && previousX.get() !== 100}
    >
      <Suspense fallback={null}>
        <Soldier
          isGhost
          rotation={[0, Math.PI / 2, 0]}
          position={[0, -1.5, 0]}
          animation={isMovingGhost ? 'sprint' : 'idle'}
        />
      </Suspense>
    </a.group>
  );
};

export default MovingGhost;
