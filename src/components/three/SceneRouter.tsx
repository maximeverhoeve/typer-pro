import React from 'react';
import { useLocation } from 'react-router-dom';
import MainScene from './MainScene';
import ThreeSingelplayer from './singleplayer/ThreeSingleplayer';
import ThreeLeaderboard from './Leaderboard/ThreeLeaderboard';
import { useDebounce } from 'usehooks-ts';
import { Text } from '@react-three/drei';
import ThreePreGameLobby from './multiplayer/ThreePreGameLobby';
import ThreeMultiplayerGame from './multiplayer/ThreeMultiplayerGame';

enum SCENE {
  SINGLEPLAYER = 'SINGLEPLAYER',
  PREGAME_LOBBY = 'PREGAME_LOBBY',
  MULTIPLAYER_FINISH = 'MULTIPLAYER_FINISH',
  MULTIPLAYER = 'MULTIPLAYER',
  LEADERBOARD = 'LEADERBOARD',
  MAIN = 'MAIN',
  EMPTY = 'EMPTY',
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
  const pregameLobbyRegex = /^\/multiplayer\/[a-zA-Z0-9]+$/;

  const getScene = (): SCENE => {
    if (debouncedPath.includes('singleplayer')) return SCENE.SINGLEPLAYER;
    if (pregameLobbyRegex.test(debouncedPath)) return SCENE.PREGAME_LOBBY;
    if (debouncedPath.includes('/multiplayer/finish'))
      return SCENE.MULTIPLAYER_FINISH;
    if (debouncedPath === '/multiplayer') return SCENE.EMPTY;
    if (debouncedPath.includes('/multiplayer')) return SCENE.MULTIPLAYER;
    if (debouncedPath === '/leaderboard') return SCENE.MAIN;
    if (debouncedPath.includes('leaderboard/')) return SCENE.LEADERBOARD;
    return SCENE.MAIN;
  };

  return (
    <>
      {
        {
          SINGLEPLAYER: <ThreeSingelplayer />,
          MULTIPLAYER_FINISH: <Text>Finish</Text>,
          PREGAME_LOBBY: <ThreePreGameLobby />,
          MULTIPLAYER: <ThreeMultiplayerGame />,
          MAIN: <MainScene />,
          LEADERBOARD: <ThreeLeaderboard />,
          EMPTY: <></>,
        }[getScene()]
      }
    </>
  );
};

export default SceneRouter;
