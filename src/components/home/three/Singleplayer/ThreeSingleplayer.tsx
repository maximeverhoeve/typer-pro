import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useBoolean } from '@chakra-ui/react';
import { useSpring, a, useSpringValue } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';
import useSinglePlayerStore from '../../../../store/useSinglePlayerStore';
import Player, { PlayerAnimation } from '../components/Player';
import { DirectionalLight, Group } from 'three';
import gsap from 'gsap';
import SinglePlayerEnvironment from './SinglePlayerEnvironment';

const ThreeSingleplayer: React.FC = () => {
  const cameraAngle = -6;
  const playerRef = useRef<Group>(null);
  const light = useRef<DirectionalLight>(null);
  const animatedGroupRef = useRef<Group>(null);
  const [animation, setAnimation] = useState<PlayerAnimation>('Standing');

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
        if (!isFinishing) setAnimation('Runner');
        await previousZ.start({
          to: 100,
          config: {
            duration: (previousTime || 0) * 1000,
          },
        });
      },
      config: {
        duration: 300,
      },
      onRest: () => !isFinishing && setAnimation('Standing'),
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

  useLayoutEffect(() => {
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
  }, []);

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
        setAnimation('wall_flip');
        setTimeout(() => {
          setIsFinishing.off();
        }, 1500);
      }
    }
  }, [isFinishing]);

  return (
    <>
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
      <Suspense fallback={null}>
        <SinglePlayerEnvironment />
      </Suspense>
      <group>
        <a.group ref={animatedGroupRef} position-z={z}>
          <Suspense fallback={null}>
            <Player ref={playerRef} animation={animation} />
          </Suspense>
        </a.group>
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
      </group>
    </>
  );
};

export default ThreeSingleplayer;
