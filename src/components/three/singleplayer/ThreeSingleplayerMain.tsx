import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { DirectionalLight, Group } from 'three';
import SinglePlayerEnvironment from './SinglePlayerEnvironment';
import MovingPlayer from '../../../features/singleplayer/components/MovingPlayer';
import MovingGhost from '../../../features/singleplayer/components/MovingGhost';
import { SoftShadows } from '@react-three/drei';

const ENVIRONMENT_OFFSET = -0.5;

const ThreeSingleplayerMain: React.FC = () => {
  const light = useRef<DirectionalLight>(null);
  const playerRef = useRef<Group>(null);
  const { camera } = useThree();

  const setIsometricCameraView = (): void => {
    const angle = Math.PI / 6; // 30 degrees in radians

    camera.position.set(10, 6, 11);
    camera.lookAt(0, 0, 0);
    camera.rotation.x = -angle;
    camera.rotation.y = angle;
  };

  useEffect(() => {
    camera.position.set(10 + ENVIRONMENT_OFFSET, 3, 11);
    // camera.rotation.set(-0.3, 0, 0);
    // if (playerRef.current) {
    //   camera.lookAt(playerRef.current.position);
    // }
    // setIsometricCameraView();
  }, []);

  useFrame((props) => {
    if (playerRef.current) {
      if (
        playerRef.current.position.x >= 9 &&
        playerRef.current.position.x < 70
      ) {
        props.camera.position.x =
          playerRef.current.position.x + 1 + ENVIRONMENT_OFFSET;
      } else if (playerRef.current.position.x < 9) {
        props.camera.position.x = 10 + ENVIRONMENT_OFFSET;
        camera.lookAt(playerRef.current.position);
      } else {
        props.camera.position.x =
          playerRef.current.position.x + 1 + ENVIRONMENT_OFFSET;
      }
      if (light.current) {
        light.current.position.x = playerRef.current.position.x;
        light.current.target.position.x = playerRef.current.position.x - 4;
        light.current.target.updateMatrixWorld();
      }
      // props.camera.lookAt(playerRef.current.position);
    }
  });

  return (
    <>
      <group position={[0, 0, 0]}>
        <directionalLight
          position={[10, 10, 5]}
          ref={light}
          castShadow
          intensity={0.7}
          shadow-mapSize={2048 * 2}
          shadow-bias={-0.001}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-8.5, 15, 8.5, -8.5, 0.1, 20]}
          />
        </directionalLight>
        <SinglePlayerEnvironment />
        <MovingPlayer ref={playerRef} />
        <MovingGhost />
      </group>
    </>
  );
};

export default ThreeSingleplayerMain;
