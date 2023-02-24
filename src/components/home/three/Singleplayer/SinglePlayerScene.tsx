import React, { useRef } from 'react';
import { useBoolean } from '@chakra-ui/react';
import { useSpring, a } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import useSinglePlayerStore from '../../../../store/useSinglePlayerStore';
import Player from '../Player';
import { Group } from 'three';

const SinglePlayerScene: React.FC = () => {
  const playerRef = useRef<Group>(null);
  const animatedGroupRef = useRef<Group>(null);
  const [isMoving, setIsMoving] = useBoolean();
  const progress = useSinglePlayerStore((state) => state.progress);
  const [{ z }] = useSpring(
    {
      z: progress * 100,
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
    if (animatedGroupRef.current) {
      props.camera.position.z = animatedGroupRef.current.position.z + 5;
      // playerRef.current.rotation.y += delta * 0.5;
    }
  });

  const AnimatedPlayer = a(Player);

  return (
    <>
      <group>
        <a.group ref={animatedGroupRef} position-z={z}>
          <AnimatedPlayer ref={playerRef} isMoving={isMoving} />
        </a.group>
        <Player position={[2, 0, 0]} isMoving={!isMoving} color="#00CACA" />
        <Player position={[-2, 0, 0]} isMoving={!isMoving} color="#0a0" />
      </group>
    </>
  );
};

export default SinglePlayerScene;
