import React, { useEffect, useRef } from 'react';
import { useBoolean } from '@chakra-ui/react';
import { useSpring, a, useSpringValue } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';
import useSinglePlayerStore from '../../../../store/useSinglePlayerStore';
import Player from '../Player';
import { Group } from 'three';
import gsap from 'gsap';

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
  useFrame((props) => {
    if (animatedGroupRef.current && isMoving) {
      props.camera.position.z = animatedGroupRef.current.position.z + 5;
      props.camera.lookAt(animatedGroupRef.current.position);
    }
  });

  useEffect(() => {
    if (!isGameStarted) {
      api.stop();
      api.set({ z: 0 });
      previousZ.stop();
      previousZ.set(0);
      gsap.to(camera.position, {
        x: -2,
        z: 5.5,
        duration: 0.5,
        onComplete: () => {
          if (animatedGroupRef.current) {
            camera.lookAt(animatedGroupRef.current.position);
          }
        },
      });
    }
  }, [isGameStarted]);

  return (
    <>
      <group>
        <a.group ref={animatedGroupRef} position-z={z}>
          <Player ref={playerRef} isMoving={isMoving} />
        </a.group>
        <a.group position-z={previousZ} visible={!!previousTime}>
          <Player isGhost isMoving={isMovingGhost} color="#00CACA" />
        </a.group>
      </group>
    </>
  );
};

export default ThreeSingleplayer;
