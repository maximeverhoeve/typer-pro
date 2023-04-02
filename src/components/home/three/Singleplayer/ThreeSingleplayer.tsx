import React, { useEffect, useRef } from 'react';
import { useBoolean } from '@chakra-ui/react';
import { useSpring, a, useSpringValue } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';
import useSinglePlayerStore from '../../../../store/useSinglePlayerStore';
import Player from '../Player';
import { Group } from 'three';

const ThreeSingleplayer: React.FC = () => {
  const playerRef = useRef<Group>(null);
  const animatedGroupRef = useRef<Group>(null);
  const [isMoving, setIsMoving] = useBoolean();
  const [isMovingGhost, setIsMovingGhost] = useBoolean();
  const { progress, previousTime, isGameStarted } = useSinglePlayerStore(
    (state) => state,
  );
  const { camera } = useThree();
  const previousZ = useSpringValue(0, {
    from: 0,
    onStart: setIsMovingGhost.on,
    onRest: setIsMovingGhost.off,
    reset: progress === 0,
  });
  const useCameraMovementZ = useSpringValue(0, {
    from: 0,
  });
  const useCameraMovementX = useSpringValue(0, {
    from: 0,
  });

  const updateCamera = (): void => {
    if (animatedGroupRef.current) {
      camera.position.set(
        -2,
        camera.position.y,
        animatedGroupRef.current.position.z + 5.5,
      );
      camera.lookAt(animatedGroupRef.current.position);
    }
  };

  const [{ z }, api] = useSpring(
    {
      z: progress * 100,
      onStart: async () => {
        setIsMoving.on();
        await previousZ.start({
          to: 100,
          config: {
            duration: (previousTime || 0) * 1000,
          },
        });
      },
      onChange: () => {
        updateCamera();
      },
      onRest: () => {
        setIsMoving.off();
        updateCamera();
      },
    },
    [progress],
  );

  useEffect(() => {
    if (!isGameStarted) {
      api.stop();
      api.set({ z: 0 });
      previousZ.stop();
      previousZ.set(0);
    }
    console.log('test');
  }, [isGameStarted]);

  return (
    <>
      <group>
        <a.group ref={animatedGroupRef} position-z={z}>
          <Player ref={playerRef} isMoving={isMoving} />
        </a.group>
        <a.group position-z={previousZ} visible={!!previousTime}>
          <Player
            // position={[2, 0, 0]}
            isGhost
            isMoving={isMovingGhost}
            color="#00CACA"
          />
        </a.group>
      </group>
    </>
  );
};

export default ThreeSingleplayer;
