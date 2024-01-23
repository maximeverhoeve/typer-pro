import React from 'react';
import ThreeSingleplayerMain from './ThreeSingleplayerMain';
import ThreeSuspense from '../components/ThreeSuspense';
import useSinglePlayerStore from '../../../store/useSinglePlayerStore';

const ThreeSingleplayer: React.FC = () => {
  const setIsLoadingEnvironment = useSinglePlayerStore(
    (state) => state.setIsLoadingEnvironment,
  );

  return (
    <ThreeSuspense
      onLoading={setIsLoadingEnvironment.on}
      onFinish={setIsLoadingEnvironment.off}
    >
      <ThreeSingleplayerMain />
    </ThreeSuspense>
  );
};

export default ThreeSingleplayer;
