import React, { Suspense, useEffect, useRef } from 'react';
import { useBoolean } from '@chakra-ui/react';
import { useSpring, a, useSpringValue } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';
import useSinglePlayerStore from '../../../../store/useSinglePlayerStore';
import Player from '../Player';
import { DirectionalLight, Group } from 'three';
import gsap from 'gsap';
import SinglePlayerEnvironment from './SinglePlayerEnvironment';

const ThreeSingleplayer: React.FC = () => {
  const cameraAngle = -6;
  const playerRef = useRef<Group>(null);
  const light = useRef<DirectionalLight>(null);
  const animatedGroupRef = useRef<Group>(null);
  const [isMoving, setIsMoving] = useBoolean();

  const [isMovingGhost, setIsMovingGhost] = useBoolean();
  const { progress, previousTime, isGameStarted, isFinishing, setIsFinishing } =
    useSinglePlayerStore((state) => state);
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
        // When camera position is not initially correct on page load. It should correct it
        if (camera.position.x !== cameraAngle) {
          if (animatedGroupRef.current) {
            gsap.to(camera.position, { x: cameraAngle, y: 1 });
          }
        }
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
    if (animatedGroupRef.current) {
      props.camera.position.z = animatedGroupRef.current.position.z + 5;
      if (light.current) {
        light.current.position.z = animatedGroupRef.current.position.z;
        light.current.target.position.z =
          animatedGroupRef.current.position.z - 4;
        light.current.target.updateMatrixWorld();
      }
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
        x: cameraAngle,
        z: 5,
        y: 1,
        duration: 0.5,
      });
    }
  }, [isGameStarted]);

  useEffect(() => {
    if (isFinishing) {
      // startfinish animation
      if (animatedGroupRef.current) {
        gsap.to(animatedGroupRef.current.rotation, {
          y: Math.PI * 4,
          onComplete: () => {
            if (animatedGroupRef.current) {
              animatedGroupRef.current.rotation.y = 0;
              setIsFinishing.off();
            }
          },
        });
      }
    }
  }, [isFinishing]);

  return (
    <Suspense>
      <directionalLight
        ref={light}
        position={[0, 10, 0.4]}
        intensity={0.3}
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-top={20}
        shadow-camera-right={20}
        shadow-camera-bottom={-20}
        shadow-camera-left={-20}
      />
      <SinglePlayerEnvironment />
      <group>
        <a.group ref={animatedGroupRef} position-z={z}>
          <Player
            ref={playerRef}
            animation={isMoving ? 'Runner' : 'Standing'}
          />
        </a.group>
        <a.group
          position-z={previousZ}
          visible={!!previousTime && previousZ.get() !== 100}
        >
          <Player
            isGhost
            animation={isMovingGhost ? 'Runner' : 'Standing'}
            color="#008585"
          />
        </a.group>
      </group>
    </Suspense>
  );
};

export default ThreeSingleplayer;
