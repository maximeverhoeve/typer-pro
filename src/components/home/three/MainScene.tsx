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

interface Props {
  hoveringItem: number;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const AnimatedMaterial = a(MeshDistortMaterial);

const MainScene: React.FC<Props> = ({ hoveringItem }) => {
  const sphere = useRef<Mesh>(null);
  const light = useRef(null);
  const [isDown, setIsDown] = useBoolean();
  const [isHovering, setIsHovering] = useBoolean();

  const colorPerItem = ['#9d0054', '#008888', '#202020'];

  useFrame((props, delta) => {
    if (sphere.current) {
      sphere.current.rotation.y += delta * 2;
    }
  });

  const [{ wobble, coat, color, ambient, env }] = useSpring(
    {
      wobble: isDown ? 1.2 : isHovering ? 1.2 : 1,
      coat: 10,
      ambient: !isHovering ? 1.5 : 0.5,
      env: !isHovering ? 0.4 : 1,
      color: colorPerItem[hoveringItem],
      config: (n) =>
        (n === 'wobble' &&
          isHovering && { mass: 2, tension: 1000, friction: 10 }) ||
        {},
    },
    [isHovering, isDown, hoveringItem],
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={75}>
        <a.ambientLight intensity={ambient} />
        <a.pointLight
          ref={light}
          position-z={-15}
          intensity={env}
          color="#F8C069"
        />
      </PerspectiveCamera>
      <Suspense fallback={null}>
        <a.mesh
          ref={sphere}
          scale={wobble}
          onPointerOver={setIsHovering.on}
          onPointerOut={setIsHovering.off}
          onPointerDown={setIsDown.on}
          onPointerUp={setIsDown.off}
        >
          <sphereGeometry args={[1, 64, 64]} />
          <AnimatedMaterial
            color={color}
            envMapIntensity={env}
            clearcoat={coat}
            clearcoatRoughness={0}
            metalness={0.1}
          />
        </a.mesh>
        <Environment preset="warehouse" />
        <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -1.5, 0]}
          opacity={0.4}
          width={1}
          height={1}
          blur={2.5}
          far={1.5}
        />
      </Suspense>
    </>
  );
};

export default MainScene;
