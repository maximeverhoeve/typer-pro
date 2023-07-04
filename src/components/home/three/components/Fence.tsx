import { useGLTF } from '@react-three/drei';
import { GroupProps, dispose, useGraph } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { Mesh, Texture } from 'three';

interface Props {
  texture: Texture;
}

const Fence: React.FC<GroupProps & Props> = ({ texture, ...props }) => {
  const { scene } = useGLTF('/objects/fence.glb');
  const { nodes } = useGraph(scene);

  const clonedMesh = (nodes.Fence_Cube057 as Mesh).clone();

  useEffect(() => {
    return () => {
      dispose(clonedMesh);
    };
  }, []);

  return (
    <group {...props}>
      <mesh castShadow receiveShadow geometry={clonedMesh.geometry}>
        <meshMatcapMaterial color="#959595" matcap={texture} />
      </mesh>
    </group>
  );
};

export default Fence;

useGLTF.preload('/objects/fence.glb');
