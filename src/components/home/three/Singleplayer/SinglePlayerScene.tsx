import React, { useEffect, useRef } from 'react';
import { useBoolean } from '@chakra-ui/react';
import { useSpring, a, useSpringValue } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import useSinglePlayerStore from '../../../../store/useSinglePlayerStore';
import Player from '../Player';
import { Group } from 'three';

const SinglePlayerScene: React.FC = () => {
  const playerRef = useRef<Group>(null);
  const animatedGroupRef = useRef<Group>(null);
  const [isMoving, setIsMoving] = useBoolean();
  const [isMovingGhost, setIsMovingGhost] = useBoolean();
  const { progress, previousTime, isGameStarted } = useSinglePlayerStore(
    (state) => state,
  );
  const previousZ = useSpringValue(0, {
    from: 0,
    onStart: setIsMovingGhost.on,
    onRest: setIsMovingGhost.off,
    reset: progress === 0,
  });

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
      onRest: setIsMoving.off,
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
  }, [isGameStarted]);

  useFrame((props, delta) => {
    if (animatedGroupRef.current) {
      props.camera.position.z = animatedGroupRef.current.position.z + 5.5;
      props.camera.lookAt(animatedGroupRef.current.position);
      props.camera.position.x = -2;
      // playerRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <>
      <group>
        <a.group ref={animatedGroupRef} position-z={z}>
          <Player ref={playerRef} isMoving={isMoving} />
        </a.group>
        {previousTime && (
          <a.group position-z={previousZ}>
            <Player
              // position={[2, 0, 0]}
              isGhost
              isMoving={isMovingGhost}
              color="#00CACA"
            />
          </a.group>
        )}
      </group>
    </>
  );
};

export default SinglePlayerScene;
