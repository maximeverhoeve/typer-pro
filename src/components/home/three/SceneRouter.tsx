import React from 'react';
import { useLocation } from 'react-router-dom';
import MainScene from './MainScene';
import SinglePlayerScene from './Singleplayer/SinglePlayerScene';

enum SCENE {
  SINGLEPLAYER = 'SINGLEPLAYER',
  MULTIPLAYER = 'MULTIPLAYER',
  LEADERBOARD = 'LEADERBOARD',
  MAIN = 'MAIN',
}

const SceneRouter: React.FC = () => {
  const { pathname } = useLocation();
  const getScene = (): SCENE => {
    if (pathname.includes('singleplayer')) return SCENE.SINGLEPLAYER;
    if (pathname.includes('multiplayer')) return SCENE.MULTIPLAYER;
    if (pathname.includes('leaderboard')) return SCENE.LEADERBOARD;
    return SCENE.MAIN;
  };

  return (
    <group>
      {
        {
          SINGLEPLAYER: <SinglePlayerScene />,
          MULTIPLAYER: <>multiplayer scene</>,
          MAIN: <MainScene />,
          LEADERBOARD: <>singleplayer scene</>,
        }[getScene()]
      }
    </group>
  );
};

export default SceneRouter;
