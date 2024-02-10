import React, { useEffect } from 'react';
import { a } from '@react-spring/three';
import { useSpring } from '@react-spring/core';
import { useLoader, useThree } from '@react-three/fiber';
import { TextureLoader, Vector3 } from 'three';
import useCanvasStore from '../../store/useCanvasStore';
import Player from './components/Player';
import { ThreePosition } from '../../types/three';
import ThreeSuspense from './components/ThreeSuspense';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call

type GLTFResult = GLTF & {
  nodes: {
    ['floor-detail001']: THREE.Mesh;
    tree001: THREE.Mesh;
    tree002: THREE.Mesh;
    column001: THREE.Mesh;
    bricks001: THREE.Mesh;
    ['floor-detail002']: THREE.Mesh;
    ['floor-detail003']: THREE.Mesh;
    ['floor-detail004']: THREE.Mesh;
    ['floor-detail005']: THREE.Mesh;
    ['floor-detail006']: THREE.Mesh;
    block001: THREE.Mesh;
  };
  materials: {};
};

const MainScene: React.FC = () => {
  const { nodes, materials } = useGLTF(
    '/objects/typer-pro-environment.glb',
  ) as GLTFResult;
  const colorMap = useLoader(TextureLoader, '/colormap.png');
  const { hoveredItem } = useCanvasStore((state) => state);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(5, 3, 5.5);
    camera.lookAt(new Vector3(0, 0, 0));
  }, []);

  return (
    <ThreeSuspense>
      <spotLight position={[0, 1, 1]} />
      <group position={[-6.339, 0, 0]} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['floor-detail001'].geometry}
          position={[3.793, -0.011, 0.028]}
        >
          <meshStandardMaterial map={colorMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree001.geometry}
          position={[4.368, 0, -0.966]}
        >
          <meshStandardMaterial map={colorMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree002.geometry}
          position={[4.975, 0, -1.255]}
          scale={0.72}
        >
          <meshStandardMaterial map={colorMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.column001.geometry}
          position={[5.684, 0, -1.517]}
        >
          <meshStandardMaterial map={colorMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bricks001.geometry}
          position={[7.607, 0, -1.577]}
        >
          <meshStandardMaterial map={colorMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['floor-detail002'].geometry}
          position={[4.884, -0.011, 0.028]}
          rotation={[-Math.PI, 1.331, -Math.PI]}
        >
          <meshStandardMaterial map={colorMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['floor-detail003'].geometry}
          position={[5.777, -0.011, 0.028]}
        >
          <meshStandardMaterial map={colorMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['floor-detail004'].geometry}
          position={[6.868, -0.011, 0.028]}
          rotation={[-Math.PI, 1.331, -Math.PI]}
        >
          <meshStandardMaterial map={colorMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['floor-detail005'].geometry}
          position={[7.738, -0.011, 0.028]}
        >
          <meshStandardMaterial map={colorMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['floor-detail006'].geometry}
          position={[8.732, -0.011, 0.241]}
          rotation={[-Math.PI, 0.483, -Math.PI]}
        >
          <meshStandardMaterial map={colorMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.block001.geometry}
          position={[6.339, -0.207, -0.678]}
          scale={[6.222, 0.408, 4.407]}
        >
          <meshStandardMaterial map={colorMap} />
        </mesh>
      </group>
    </ThreeSuspense>
  );
};

export default MainScene;
