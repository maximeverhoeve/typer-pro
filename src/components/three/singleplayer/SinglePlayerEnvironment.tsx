/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useGraph } from '@react-three/fiber';
import { SkinnedMesh } from 'three';
import GameEnvironment from '../components/GameEnvironment';

const SinglePlayerEnvironment: React.FC = () => {
  const { scene } = useGLTF('/singleplayer-scene.glb');
  const { nodes } = useGraph(scene);
  const bakedTexture = useTexture('/baked.jpg');
  bakedTexture.flipY = false;

  return <GameEnvironment position={[0, -1.5, 0]} rotation={[0, 0, 0]} />;

  return (
    <>
      <group
        rotation={[(Math.PI / 2) * 2, 0, 0]}
        position={[0, -1.5, -2]}
        scale={[2.8, -2.8, 2.8]}
      >
        <mesh
          geometry={(nodes.baked as SkinnedMesh).geometry}
          position={(nodes.baked as SkinnedMesh).position}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          geometry={(nodes.poleLights as SkinnedMesh).geometry}
          position={(nodes.poleLights as SkinnedMesh).position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>
        <mesh
          geometry={(nodes.portalLight as SkinnedMesh).geometry}
          position={(nodes.portalLight as SkinnedMesh).position}
        >
          <meshBasicMaterial color="#edf9ff" />
        </mesh>
      </group>
      <group position={[0, -1.5, 95]} scale={2.8}>
        <mesh
          geometry={(nodes.baked as SkinnedMesh).geometry}
          position={(nodes.baked as SkinnedMesh).position}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          geometry={(nodes.poleLights as SkinnedMesh).geometry}
          position={(nodes.poleLights as SkinnedMesh).position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>
        <mesh
          geometry={(nodes.portalLight as SkinnedMesh).geometry}
          position={(nodes.portalLight as SkinnedMesh).position}
        >
          <meshBasicMaterial color="#edf9ff" />
        </mesh>
      </group>
    </>
  );
};
export default SinglePlayerEnvironment;
