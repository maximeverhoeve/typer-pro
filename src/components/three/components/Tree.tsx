import { Clone, useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import gsap, { Power2 } from 'gsap';
import React, { useEffect, useRef } from 'react';
import { Group } from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    tree_1: THREE.Mesh;
  };
  materials: {
    colormap: THREE.MeshStandardMaterial;
  };
};

const Tree: React.FC<GroupProps> = (props) => {
  const { nodes } = useGLTF('/objects/tree.glb') as GLTFResult;
  const treeRef = useRef<Group>(null);

  useEffect(() => {
    if (treeRef.current) {
      gsap.set(treeRef.current.scale, { y: 0 });
      gsap.to(treeRef.current.scale, {
        y: 1,
        ease: Power2.easeOut,
        duration: 1,
      });
    }
  }, []);

  return <Clone ref={treeRef} {...props} object={nodes.tree_1} />;
};

export default Tree;
