import { useGLTF } from '@react-three/drei';
import { GroupProps, useGraph } from '@react-three/fiber';
import { useControls } from 'leva';
import React from 'react';
import { Mesh } from 'three';

const Fence: React.FC<GroupProps> = (props) => {
  const { scene } = useGLTF('/objects/fence.glb');
  const { nodes } = useGraph(scene);
  const { color } = useControls(
    'Fences',
    {
      color: '#00d4ff',
    },
    { collapsed: true },
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Fence_Cube057 as Mesh).clone().geometry}
      >
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

export default Fence;
