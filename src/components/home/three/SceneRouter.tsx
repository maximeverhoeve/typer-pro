import React from 'react';
import { useLocation } from 'react-router-dom';
import MainScene from './MainScene';
import ThreeSingelplayer from './Singleplayer/ThreeSingleplayer';
import ThreeLeaderboard from './Leaderboard/ThreeLeaderboard';
import { useDebounce } from 'usehooks-ts';

enum SCENE {
  SINGLEPLAYER = 'SINGLEPLAYER',
  MULTIPLAYER = 'MULTIPLAYER',
  LEADERBOARD = 'LEADERBOARD',
  MAIN = 'MAIN',
}

const SceneRouter: React.FC = () => {
  const { pathname } = useLocation();
  const getPathnameWithConvertion = (): string => {
    if (pathname.includes('/singleplayer/')) {
      return '/singleplayer';
    }
    return pathname;
  };
  const debouncedPath = useDebounce<string>(getPathnameWithConvertion(), 500);

  const getScene = (): SCENE => {
    if (debouncedPath.includes('singleplayer')) return SCENE.SINGLEPLAYER;
    if (debouncedPath.includes('multiplayer')) return SCENE.MULTIPLAYER;
    if (debouncedPath === '/leaderboard') return SCENE.MAIN;
    if (debouncedPath.includes('leaderboard/')) return SCENE.LEADERBOARD;
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
        }[getScene()]
      }
    </>
  );
};

export default SceneRouter;
