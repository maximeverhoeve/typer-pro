/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import Fence from './objects/Fence';
import { Text } from '@react-three/drei';
import { useControls } from 'leva';

const SinglePlayerEnvironment: React.FC = () => {
  const { color } = useControls('Text', {
    color: '#636363',
  });

  return (
    <>
      <Fence position={[-1.2, -1.5, -2.9]} rotation={[0, 0, 0]} />
      {[...Array(18)].map((_, i) => (
        <Fence
          key={i}
          scale={1}
          position={[2, -1.5, 5.8 * i]}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}
      <Text
        font="/fonts/roboto-mono-medium.woff"
        position={[2, 0.2, 1.5]}
        color={color}
        rotation={[0, -Math.PI / 2, 0]}
      >
        TYPING
      </Text>
      <Text
        font="/fonts/roboto-mono-medium.woff"
        position={[-1.2, 0.2, -2.9]}
        color={color}
      >
        START
      </Text>
      <Text
        font="/fonts/roboto-mono-medium.woff"
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={1}
        position={[-0.5, -1.49, 99]}
        color={color}
      >
        FINISH
      </Text>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-0.5, -1.49, 100]}
        scale-y={0.2}
        scale-x={5}
        receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial color="#717171" />
      </mesh>
    </>
  );
};

export default SinglePlayerEnvironment;
