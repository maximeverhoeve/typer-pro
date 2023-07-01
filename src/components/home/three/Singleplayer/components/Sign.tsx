import { useGLTF } from '@react-three/drei';
import { GroupProps, useGraph } from '@react-three/fiber';
import { useControls } from 'leva';
import React from 'react';
import { Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Sign1_1: Mesh;
    Sign1_2: Mesh;
    Sign1_3: Mesh;
  };
  materials: {
    ['Dark Wood']: MeshStandardMaterial;
    ['Light Wood']: MeshStandardMaterial;
    Herbs: MeshStandardMaterial;
  };
};

interface Props {
  direction: 'left' | 'right';
}

const Sign: React.FC<GroupProps & Props> = ({ direction, ...props }) => {
  const { scene } = useGLTF('/objects/sign-left.glb');
  const { nodes } = useGraph(scene) as GLTFResult;
  const { signPole, sign } = useControls(
    'Fences',
    {
      signPole: '#333333',
      sign: '#929292',
    },
    { collapsed: true },
  );

  const arrowRotationY = direction === 'left' ? 0 : 2 * (Math.PI / 2);

  return (
    <group {...props} dispose={null}>
      <group scale={100}>
        <mesh
          name="Pole"
          castShadow
          receiveShadow
          geometry={nodes.Sign1_1.geometry}
        >
          <meshStandardMaterial color={signPole} />
        </mesh>
        <mesh
          name="Arrow"
          castShadow
          rotation={[0, arrowRotationY, 0]}
          receiveShadow
          position={[0, -0.009, 0]}
          scale={1.5}
          geometry={nodes.Sign1_2.geometry}
        >
          <meshStandardMaterial color={sign} />
        </mesh>
        {/* <mesh
          name="Grass"
          castShadow
          receiveShadow
          geometry={nodes.Sign1_3.geometry}
        >
          <meshStandardMaterial color={color3} />
        </mesh> */}
      </group>
    </group>
  );
};

export default Sign;

useGLTF.preload('/objects/sign-left.glb');
