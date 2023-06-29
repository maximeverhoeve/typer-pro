/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import Fence from './objects/Fence';
import Sign from './objects/Sign';

const SinglePlayerEnvironment: React.FC = () => {
  return (
    <>
      <Sign
        direction="right"
        position={[2, -1, 2.85]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Fence position={[-1.2, -1.5, -2.9]} rotation={[0, 0, 0]} />
      {[...Array(18)].map((_, i) => (
        <Fence
          key={i}
          scale={1}
          position={[2, -1.5, 5.8 * i]}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}
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
