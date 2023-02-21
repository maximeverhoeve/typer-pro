import React from 'react';
import useSinglePlayerStore from '../../../../store/useSinglePlayerStore';
import Player from '../Player';

const SinglePlayerScene: React.FC = () => {
  const progress = useSinglePlayerStore((state) => state.progress);

  return (
    <>
      <Player color="#0F0" />
    </>
  );
};

export default SinglePlayerScene;
