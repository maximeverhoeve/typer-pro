import React, { useRef, Suspense } from 'react';
import { a } from '@react-spring/three';
import { useSpring } from '@react-spring/core';
import { useBoolean } from '@chakra-ui/react';
import { useFrame } from '@react-three/fiber';
import {
  PerspectiveCamera,
  Environment,
  MeshDistortMaterial,
  ContactShadows,
} from '@react-three/drei';
import { Mesh } from 'three';
import useCanvasStore from '../../../store/useCanvasStore';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const AnimatedMaterial = a(MeshDistortMaterial);

const MainScene: React.FC = () => {
  const sphere = useRef<Mesh>(null);
  const sphere2 = useRef<Mesh>(null);
  const { hoveredItem } = useCanvasStore((state) => state);
  const light = useRef(null);
  const [isDown, setIsDown] = useBoolean();
  const [isHovering, setIsHovering] = useBoolean();

  const { position } = useSpring({
    position: [0.5, hoveredItem === 'SINGLEPLAYER' ? -3.5 : 0, 0] as [
      number,
      number,
      number,
    ],
  });

  useFrame((props, delta) => {
    if (sphere.current && sphere2.current) {
      sphere.current.rotation.y += delta * 0.5;
      sphere2.current.rotation.y += delta * 0.5;
    }
  });

  const AnimatedAmbientLight = a.ambientLight;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={75}>
        {/* @ts-expect-error: https://github.com/pmndrs/react-spring/issues/1515 */}
        <AnimatedAmbientLight intensity={1} />
        <a.pointLight
          ref={light}
          position-z={-15}
          intensity={1}
          color="#F8C069"
        />
      </PerspectiveCamera>
      <a.mesh
        ref={sphere}
        onPointerOver={setIsHovering.on}
        onPointerOut={setIsHovering.off}
        onPointerDown={setIsDown.on}
        onPointerUp={setIsDown.off}
        position={[-0.5, 0, 0]}
      >
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial
          color="#DC0077"
          roughness={0.1}
          metalness={0.4}
          // wireframe
        />
      </a.mesh>
      <a.mesh ref={sphere2} position={position}>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial
          color="#00CACA"
          roughness={0.1}
          metalness={0.4}
          // wireframe
        />
      </a.mesh>
      <Environment preset="forest" />
      <ContactShadows
        rotation={[Math.PI / 2, 0, 0]}
        color="#DC0077"
        position={[0, -1.5, 0]}
        opacity={0.8}
        width={1}
        height={1}
        blur={2.5}
        far={1.5}
      />
    </>
  );
};

export default MainScene;
