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
import RunningLane from './RunningLane';
import EnvironmentBorder from './EnvironmentBorder';
import Ground from './Ground';

type GLTFResult = GLTF & {
  nodes: {
    environment: THREE.Mesh;
  };
  materials: {
    colormap: THREE.MeshStandardMaterial;
  };
};

interface Props {
  /** Amount of lanes for the players to run on */
  lanes?: number;
}

/** Calculated lane depth (z-axis) */
const LANE_DEPTH = 1.0285;

const GameEnvironment: React.FC<GroupProps & Props> = ({
  lanes = 3,
  ...props
}) => {
  const { nodes } = useGLTF('/objects/game-environment.glb') as GLTFResult;
  const groundRef = useRef<Group>(null);

  useEffect(() => {
    if (groundRef.current) {
      gsap.set(groundRef.current.scale, { y: 0 });
      gsap.to(groundRef.current.scale, {
        y: 1,
        ease: Power2.easeOut,
        duration: 0.6,
      });
    }
  }, []);

  return (
    <group {...props}>
      <mesh
        position={[30, 0, -4]}
        scale={[100, 30, 1]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[1, 1, 1]} />
        <meshStandardMaterial metalness={0} roughness={1} color="#000" />
      </mesh>
      <Clone
        position={[
          nodes.environment.position.x,
          nodes.environment.position.y,
          -(lanes * LANE_DEPTH) - 0.6,
        ]}
        ref={groundRef}
        object={nodes.environment}
        castShadow
        receiveShadow
      />

      {Array.from({ length: lanes }).map((_, index) => (
        <RunningLane position-z={-index} key={index} />
      ))}
      <EnvironmentBorder position-z={-LANE_DEPTH - 0.1} />
      <SoftShadows samples={16} size={50} />
    </group>
  );
};

export default GameEnvironment;
