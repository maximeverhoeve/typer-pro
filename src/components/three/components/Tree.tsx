import { Clone, useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import gsap, { Power2 } from 'gsap';
import React, { useEffect, useRef } from 'react';
import { Group, Vector3 } from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    tree_1: THREE.Mesh;
  };
  materials: {
    colormap: THREE.MeshStandardMaterial;
  };
};

interface Props {
  hide: boolean;
}

const Tree: React.FC<GroupProps & Props> = ({ hide, ...props }) => {
  const { nodes } = useGLTF('/objects/tree.glb') as GLTFResult;
  const treeRef = useRef<Group>(null);

  // useEffect(() => {
  //   if (treeRef.current) {
  //     if (hide) {
  //       gsap.to(treeRef.current.scale, {
  //         y: 1,
  //         ease: Power2.easeOut,
  //         duration: 1,
  //       });
  //     } else {
  //       gsap.set(treeRef.current.scale, { y: 0 });
  //       gsap.to(treeRef.current.scale, {
  //         y: 1,
  //         ease: Power2.easeOut,
  //         duration: 1,
  //       });
  //     }
  //   }
  // }, [hide]);

  return (
    <group {...props}>
      <Clone ref={treeRef} object={nodes.tree_1} />
    </group>
  );
};

export default Tree;
