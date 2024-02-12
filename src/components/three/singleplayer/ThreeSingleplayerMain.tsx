import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { DirectionalLight, Group } from 'three';
import gsap from 'gsap';
import SinglePlayerEnvironment from './SinglePlayerEnvironment';
import MovingPlayer from '../../../features/singleplayer/components/MovingPlayer';
import MovingGhost from '../../../features/singleplayer/components/MovingGhost';
import { useControls } from 'leva';

const ThreeSingleplayerMain: React.FC = () => {
  const light = useRef<DirectionalLight>(null);
  const animatedGroupRef = useRef<Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(10.4, 3.1, 7.1);
    camera.rotation.set(-0.5, 0.66, 0.33);
    console.log('devmax', camera);
  }, []);
  animatedGroupRef?.current?.scale.set(0.5, 0.5, 0.5);
  animatedGroupRef?.current?.position.set(0, -0.7, 0);
  useFrame((props) => {
    if (animatedGroupRef.current) {
      props.camera.position.x = animatedGroupRef.current.position.x + 10.4;
      if (light.current) {
        light.current.position.x = animatedGroupRef.current.position.x;
        light.current.target.position.x =
          animatedGroupRef.current.position.x - 4;
        light.current.target.updateMatrixWorld();
      }
      // props.camera.lookAt(animatedGroupRef.current.position);
    }
  });

  return (
    <>
      <group position={[0, 0, 0]}>
        <SinglePlayerEnvironment />
        <MovingPlayer ref={animatedGroupRef} />
        <MovingGhost />
      </group>
    </>
  );
};

export default ThreeSingleplayerMain;
