import React, { useRef } from 'react';
import { a } from '@react-spring/three';
import { useSpring } from '@react-spring/core';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import useCanvasStore from '../../../store/useCanvasStore';
import Player from './Player';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call

const MainScene: React.FC = () => {
  const sphere = useRef<Mesh>(null);
  const sphere2 = useRef<Mesh>(null);
  const { hoveredItem } = useCanvasStore((state) => state);

  const AnimatedPlayer = a(Player);

  const [{ position2, position1, scale }] = useSpring(
    {
      position1: [hoveredItem === 'SINGLEPLAYER' ? 0 : -1, 0, 0] as [
        number,
        number,
        number,
      ],
      position2: [hoveredItem === 'SINGLEPLAYER' ? 0 : 1, 0, 0] as [
        number,
        number,
        number,
      ],
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
    <>
      <AnimatedPlayer ref={sphere} position={position1} color="#DC0077" />
      <AnimatedPlayer
        ref={sphere2}
        position={position2}
        color="#00CACA"
        scale={scale}
      />
    </>
  );
};

export default MainScene;
