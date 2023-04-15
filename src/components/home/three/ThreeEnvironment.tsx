import { ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { Canvas, Vector3 } from '@react-three/fiber';
import React from 'react';
import SceneRouter from './SceneRouter';
import SceneLights from './SceneLights';

export const DEFAULT_CAMERA_POSITION = [0, 0, 5] as Vector3;

const ThreeEnvironment: React.FC = () => {
  return (
    <Canvas className="canvas" dpr={[1, 2]} style={{ transition: '0.2s' }}>
      <PerspectiveCamera
        makeDefault
        position={DEFAULT_CAMERA_POSITION}
        fov={45}
        near={0.01}
        aspect={window.innerWidth / window.innerHeight}
      />
      <SceneLights />

      <SceneRouter />
      <ContactShadows
        rotation={[Math.PI / 2, 0, 0]}
        color="#999"
        position={[0, -1.5, 0]}
        opacity={0.5}
        width={1}
        height={1}
        blur={2.5}
        far={1.5}
      />
    </Canvas>
  );
};

export default ThreeEnvironment;
