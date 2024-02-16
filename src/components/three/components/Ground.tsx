import { Clone, useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import gsap, { Power2 } from 'gsap';
import React, { useEffect, useRef } from 'react';
import { Group } from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    block_1: THREE.Mesh;
  };
  materials: {
    colormap: THREE.MeshStandardMaterial;
  };
};

const Ground: React.FC<GroupProps> = (props) => {
  const { nodes } = useGLTF('/objects/block.glb') as GLTFResult;
  const groundRef = useRef<Group>(null);

  useEffect(() => {
    if (groundRef.current) {
      gsap.set(groundRef.current.scale, { y: 0 });
      gsap.to(groundRef.current.scale, {
        y: 0.4,
        ease: Power2.easeOut,
        duration: 1,
      });
    }
  }, []);

  return (
    <group {...props}>
      <Clone
        ref={groundRef}
        position-x={0.5}
        position-z={-0.5}
        scale={[1, 1, 1]}
        object={nodes.block_1}
      />
    </group>
  );
};

export default Ground;
