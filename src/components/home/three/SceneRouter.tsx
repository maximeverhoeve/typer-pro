import { Transition } from '@react-spring/core';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useLocation } from 'react-router-dom';
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
    <Transition
      items={[]}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
    >
      {
        {
          SINGLEPLAYER: () => <SinglePlayerScene />,
          MULTIPLAYER: () => <>multiplayer scene</>,
          MAIN: () => <>main scene</>,
          LEADERBOARD: () => <>singleplayer scene</>,
        }[getScene()]
      }
    </Transition>
  );
};

export default SceneRouter;
