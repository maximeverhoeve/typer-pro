import React, { useRef } from 'react';
import { a } from '@react-spring/three';
import { useSpring } from '@react-spring/core';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';
import useCanvasStore from '../../../store/useCanvasStore';
import Player from './Player';
import { ThreePosition } from '../../../types/three';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call

const MainScene: React.FC = () => {
  const sphere = useRef<Group>(null);
  const sphere2 = useRef<Group>(null);
  const { hoveredItem } = useCanvasStore((state) => state);

  const [{ position2, position1, scale }] = useSpring(
    {
      position1: [
        hoveredItem === 'SINGLEPLAYER' ? 0 : -1,
        0,
        0,
      ] as ThreePosition,
      position2: [
        hoveredItem === 'SINGLEPLAYER' ? 0 : 1,
        0,
        0,
      ] as ThreePosition,
      scale: hoveredItem === 'SINGLEPLAYER' ? 0 : 1,
      config: {
        mass: 1,
        tension: 250,
        friction: 20,
        precision: 0.01,
      },
    },
    [hoveredItem],
  );

  useFrame((props, delta) => {
    if (sphere.current && sphere2.current) {
      sphere.current.rotation.y += delta * 0.5;
      sphere2.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group>
      <Player />
      {/* <Player position={[2, 0, 0]} /> */}
    </group>
  );
};

export default MainScene;
