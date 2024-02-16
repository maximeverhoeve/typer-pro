/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import GameEnvironment from '../components/GameEnvironment';

const SinglePlayerEnvironment: React.FC = () => {
  return <GameEnvironment position={[-0.4, -1.5, 0]} rotation={[0, 0, 0]} />;
};
export default SinglePlayerEnvironment;
