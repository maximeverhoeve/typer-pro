import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { a } from '@react-spring/three';
import React from 'react';
import SceneRouter from './SceneRouter';

const ThreeEnvironment: React.FC = () => {
  return (
    <Canvas className="canvas" dpr={[1, 2]}>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 5]}
        fov={45}
        aspect={window.innerWidth / window.innerHeight}
      >
        {/* @ts-expect-error: https://github.com/pmndrs/react-spring/issues/1515 */}
        <a.ambientLight intensity={1} />
        <a.pointLight position-z={-15} intensity={1} color="#DC0077" />
      </PerspectiveCamera>
      <SceneRouter />
      <Environment preset="forest" />
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
      <OrbitControls
        // enablePan={false}
        // enableRotate={false}
        // enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

export default ThreeEnvironment;
