import React, { useEffect, useRef } from 'react';
import { a } from '@react-spring/three';
import { useSpring } from '@react-spring/core';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import useCanvasStore from '../../../store/useCanvasStore';
import Player from './Player';
import { ThreePosition } from '../../../types/three';
import Fence from './Singleplayer/objects/Fence';
import { useMatcapTexture } from '@react-three/drei';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call

const MainScene: React.FC = () => {
  const sphere = useRef<Group>(null);
  const sphere2 = useRef<Group>(null);
  const [Texture] = useMatcapTexture('64686F_BDC0C4_161718_A4A7AB', 256);
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

  useFrame((props, delta) => {
    if (sphere.current && sphere2.current) {
      sphere.current.rotation.y += delta * 0.5;
      sphere2.current.rotation.y += delta * 0.5;
    }
  });

  useEffect(() => {
    camera.position.set(0, 0, 5.5);
    camera.lookAt(new Vector3(0, 0, 0));
  }, []);

  return (
    <group>
      <Fence
        texture={Texture}
        position={[0, -1.5, -5.8]}
        rotation={[0, 0, 0]}
      />
      <Fence
        texture={Texture}
        position={[3, -1.5, -3]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Fence
        texture={Texture}
        position={[-3, -1.5, -3]}
        rotation={[0, Math.PI / 2, 0]}
      />
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
