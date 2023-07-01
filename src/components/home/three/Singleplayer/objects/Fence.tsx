import { useGLTF } from '@react-three/drei';
import { GroupProps, useGraph } from '@react-three/fiber';
import React from 'react';
import { Mesh, Texture } from 'three';

interface Props {
  texture: Texture;
}

const Fence: React.FC<GroupProps & Props> = ({ texture, ...props }) => {
  const { scene } = useGLTF('/objects/fence.glb');
  const { nodes } = useGraph(scene);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Fence_Cube057 as Mesh).clone().geometry}
      >
        <meshMatcapMaterial matcap={texture} />
      </mesh>
    </group>
  );
};

export default Fence;

useGLTF.preload('/objects/fence.glb');
