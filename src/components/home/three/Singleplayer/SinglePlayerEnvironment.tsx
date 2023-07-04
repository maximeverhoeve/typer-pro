/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from 'react';
import Fence from '../components/Fence';
import { Text, useMatcapTexture } from '@react-three/drei';
import { useControls } from 'leva';

const SinglePlayerEnvironment: React.FC = () => {
  const [Texture] = useMatcapTexture('9D9D9D_4E4E4E_646464_6C6C6C', 256);
  const { color } = useControls('Text', { color: '#7e7e7e' });

  useEffect(() => {
    return () => {
      Texture.dispose();
    };
  });

  return (
    <>
      <Fence
        texture={Texture}
        position={[-1.2, -1.5, -2.9]}
        rotation={[0, 0, 0]}
      />
      {[...Array(18)].map((_, i) => (
        <Fence
          texture={Texture}
          key={i}
          scale={1}
          position={[2, -1.5, 5.8 * i]}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}
      <Text
        font="/fonts/roboto-mono-medium.woff"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-0.5, -1.49, 1.6]}
        color={color}
        outlineColor={'black'}
        outlineWidth={0.02}
      >
        START
      </Text>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-0.5, -1.49, 0.8]}
        scale-y={0.1}
        scale-x={3.5}
        receiveShadow
      >
        <planeGeometry />
        <meshBasicMaterial color={color} />
      </mesh>
      <Text
        font="/fonts/roboto-mono-medium.woff"
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={1}
        position={[-0.5, -1.49, 99]}
        color={color}
        outlineColor={'black'}
        outlineWidth={0.02}
      >
        FINISH
      </Text>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-0.5, -1.49, 100]}
        scale-y={0.1}
        scale-x={3.5}
        receiveShadow
      >
        <planeGeometry />
        <meshBasicMaterial color={color} />
      </mesh>
    </>
  );
};
export default SinglePlayerEnvironment;
