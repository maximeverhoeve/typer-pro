/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import Fence from './objects/Fence';
import { Text } from '@react-three/drei';

const SinglePlayerEnvironment: React.FC = () => {
  return (
    <>
      {/* <Sign
        direction="right"
        position={[2, -1, 2.85]}
        rotation={[0, -Math.PI / 2, 0]}
      /> */}
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
        fillOpacity={0.2}
        rotation={[0, -Math.PI / 2, 0]}
      >
        TYPING
      </Text>
      <Text
        font="/fonts/roboto-mono-medium.woff"
        position={[-1.2, 0.2, -2.9]}
        fillOpacity={0.2}
      >
        START
      </Text>
      <Text
        font="/fonts/roboto-mono-medium.woff"
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={1.4}
        position={[-0.5, -1.5, 99]}
        fillOpacity={0.2}
      >
        FINISH
      </Text>

      {/* <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.51, 0]}
        scale-y={50}
        scale-x={20}
        receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial color="#303030" />
      </mesh> */}
    </>
  );
};

export default SinglePlayerEnvironment;
