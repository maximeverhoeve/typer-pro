import React, { Suspense, useLayoutEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { DirectionalLight, Group } from 'three';
import gsap from 'gsap';
import SinglePlayerEnvironment from './SinglePlayerEnvironment';
import MovingPlayer from '../../../../features/singleplayer/components/MovingPlayer';
import MovingGhost from '../../../../features/singleplayer/components/MovingGhost';

const ThreeSingleplayer: React.FC = () => {
  const light = useRef<DirectionalLight>(null);
  const animatedGroupRef = useRef<Group>(null);
  const { camera } = useThree();

  useLayoutEffect(() => {
    gsap.set(camera.position, { x: -15, z: 0, y: 10 });
    const cameraAnimation = gsap.to(camera.position, {
      x: -7,
      z: 0,
      y: 1,
      duration: 3,
    });

    return () => {
      cameraAnimation.kill();
    };
  }, []);

  useFrame((props) => {
    if (animatedGroupRef.current) {
      props.camera.position.z = animatedGroupRef.current.position.z;
      if (light.current) {
        light.current.position.z = animatedGroupRef.current.position.z;
        light.current.target.position.z =
          animatedGroupRef.current.position.z - 4;
        light.current.target.updateMatrixWorld();
      }
      props.camera.lookAt(animatedGroupRef.current.position);
    }
  });

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
      <MovingPlayer ref={animatedGroupRef} />
      <MovingGhost />
    </>
  );
};

export default ThreeSingleplayer;
