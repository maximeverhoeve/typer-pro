import React, { useRef } from 'react';
import { GroupProps } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    finish: THREE.Mesh;
  };
};

const LeaderboardEnvironment: React.FC<GroupProps> = (props) => {
  const { nodes } = useGLTF('/objects/finish.glb') as GLTFResult;
  const texture = useTexture('/objects/Textures/colormap.png');

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.finish.geometry}
        position={[0, -1, 0]}
      >
        <meshStandardMaterial map={texture} map-flipY={false} />
      </mesh>
    </group>
  );
};

useGLTF.preload('/objects/finish.glb');

export default LeaderboardEnvironment;
