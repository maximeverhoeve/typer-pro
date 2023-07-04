import React, { useEffect } from 'react';
import { a } from '@react-spring/three';
import { useSpring } from '@react-spring/core';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import useCanvasStore from '../../../store/useCanvasStore';
import Player from './components/Player';
import { ThreePosition } from '../../../types/three';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call

const MainScene: React.FC = () => {
  const { hoveredItem } = useCanvasStore((state) => state);
  const { camera } = useThree();

  const [{ position2, position1, scale }] = useSpring(
    {
      position1: [
        hoveredItem === 'SINGLEPLAYER' ? 0 : -1,
        0,
        0,
      ] as ThreePosition,
      position2: [
        1,
        0,
        hoveredItem === 'SINGLEPLAYER' ? -3 : 0,
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

  useEffect(() => {
    camera.position.set(0, 0, 5.5);
    camera.lookAt(new Vector3(0, 0, 0));
  }, []);

  return (
    <group>
      <directionalLight
        position={[0, 10, 0.4]}
        intensity={0.3}
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-top={20}
        shadow-camera-right={20}
        shadow-camera-bottom={-20}
        shadow-camera-left={-20}
      />
      <a.group position={position1}>
        <Player />
      </a.group>
      <a.group position={position2} scale={scale}>
        <Player color="#00CACA" />
      </a.group>
    </group>
  );
};

export default MainScene;
