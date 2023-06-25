import React from 'react';
import { useLocation } from 'react-router-dom';
import MainScene from './MainScene';
import ThreeSingelplayer from './Singleplayer/ThreeSingleplayer';
import ThreeLeaderboard from './Leaderboard/ThreeLeaderboard';

enum SCENE {
  SINGLEPLAYER = 'SINGLEPLAYER',
  MULTIPLAYER = 'MULTIPLAYER',
  LEADERBOARD = 'LEADERBOARD',
  MAIN = 'MAIN',
  NONE = 'NONE',
}

const SceneRouter: React.FC = () => {
  const { pathname } = useLocation();
  const getScene = (): SCENE => {
    if (pathname.includes('singleplayer')) return SCENE.SINGLEPLAYER;
    if (pathname.includes('multiplayer')) return SCENE.MULTIPLAYER;
    if (pathname === '/leaderboard') return SCENE.NONE;
    if (pathname.includes('leaderboard/')) return SCENE.LEADERBOARD;
    return SCENE.MAIN;
  };

  return (
    <>
      {
        {
          SINGLEPLAYER: <ThreeSingelplayer />,
          MULTIPLAYER: <>multiplayer scene</>,
          MAIN: <MainScene />,
          LEADERBOARD: <ThreeLeaderboard />,
          NONE: <></>,
        }[getScene()]
      }
    </>
  );
};

export default SceneRouter;
