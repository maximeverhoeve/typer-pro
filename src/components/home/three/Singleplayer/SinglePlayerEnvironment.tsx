/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useGraph } from '@react-three/fiber';
import { SkinnedMesh } from 'three';

const SinglePlayerEnvironment: React.FC = () => {
  const { scene } = useGLTF('/singleplayer-scene.glb');
  const { nodes } = useGraph(scene);
  const bakedTexture = useTexture('/baked.jpg');
  bakedTexture.flipY = false;

  return (
    <>
      <mesh
        rotation={[(Math.PI / 2) * 2, 0, 0]}
        position={[0, -1.5, -3.8]}
        scale={[2.8, -2.8, 2.8]}
        geometry={(nodes.baked as SkinnedMesh).geometry}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        position={[0, -1.5, 95]}
        scale={2.8}
        geometry={(nodes.baked as SkinnedMesh).geometry}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </>
  );
};
export default SinglePlayerEnvironment;
