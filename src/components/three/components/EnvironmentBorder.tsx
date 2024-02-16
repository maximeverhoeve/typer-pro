import { Clone, useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import gsap, { Power2 } from 'gsap';
import React, { useEffect, useRef } from 'react';
import { Group } from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    border: THREE.Mesh;
  };
  materials: {
    colormap: THREE.MeshStandardMaterial;
  };
};

const EnvironmentBorder: React.FC<GroupProps> = (props) => {
  const { nodes } = useGLTF('/objects/platform-border.glb') as GLTFResult;
  const ref = useRef<Group>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.set(ref.current.scale, { y: 0 });
      gsap.to(ref.current.scale, {
        y: 1,
        ease: Power2.easeOut,
        duration: 0.6,
      });
    }
  }, []);

  return (
    <group {...props}>
      <Clone ref={ref} object={nodes.border} castShadow receiveShadow />
    </group>
  );
};

export default EnvironmentBorder;
