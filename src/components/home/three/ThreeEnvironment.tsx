import React from 'react';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import { OrbitControls } from '@react-three/drei';
import { Canvas, Vector3 } from '@react-three/fiber';
import SceneRouter from './SceneRouter';
import SceneLights from './SceneLights';
import SceneShadows from './environment/SceneShadows';

export const DEFAULT_CAMERA_POSITION = [0, 0, 5] as Vector3;

const ThreeEnvironment: React.FC = () => {
  const { showPerf, showOrbit } = useControls({
    showPerf: false,
    showOrbit: false,
  });

  return (
    <Canvas
      shadows
      className="canvas"
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 3],
      }}
      style={{ transition: '0.2s' }}
    >
      {showPerf && <Perf position="bottom-left" />}
      {/* <PerspectiveCamera
        makeDefault
        position={DEFAULT_CAMERA_POSITION}
        fov={45}
        near={0.01}
        aspect={window.innerWidth / window.innerHeight}
      /> */}

      <SceneLights />

      {showOrbit && <OrbitControls />}
      <SceneRouter />

      <SceneShadows />
    </Canvas>
  );
};

export default ThreeEnvironment;
