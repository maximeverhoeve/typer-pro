import {
  AccumulativeShadows,
  Clone,
  RandomizedLight,
  SoftShadows,
  useGLTF,
} from '@react-three/drei';
import { GroupProps, useThree } from '@react-three/fiber';
import gsap, { Power2 } from 'gsap';
import React, { useEffect, useRef } from 'react';
import { Group } from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    environment: THREE.Mesh;
  };
  materials: {
    colormap: THREE.MeshStandardMaterial;
  };
};

const GameEnvironment: React.FC<GroupProps> = (props) => {
  const { nodes } = useGLTF('/objects/typer-pro-environment.glb') as GLTFResult;
  const groundRef = useRef<Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (groundRef.current) {
      gsap.set(groundRef.current.scale, { y: 0 });
      gsap.to(groundRef.current.scale, {
        y: 1,
        ease: Power2.easeOut,
        duration: 1,
      });
    }
  }, []);

  return (
    <group {...props}>
      <directionalLight
        position={[10, 10, 1]}
        castShadow
        intensity={0.7}
        shadow-mapSize={2048}
        shadow-bias={-0.001}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
        />
      </directionalLight>
      <Clone
        ref={groundRef}
        object={nodes.environment}
        castShadow
        receiveShadow
      />
      <SoftShadows samples={16} />
    </group>
  );
};

export default GameEnvironment;
