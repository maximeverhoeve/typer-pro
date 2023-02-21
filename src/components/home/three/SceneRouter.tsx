import React from 'react';
import { a, SpringValue, useTransition } from '@react-spring/three';
import { useLocation } from 'react-router-dom';
import MainScene from './MainScene';
import SinglePlayerScene from './Singleplayer/SinglePlayerScene';
import { ThreePosition } from '../../../types/three';

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
  const transition = useTransition(getScene(), {
    from: { scale: 0, position: [0, 5, 0] as ThreePosition },
    enter: { scale: 1, position: [0, 0, 0] as ThreePosition },
    leave: { scale: 0, position: [0, -5, 0] as ThreePosition },
    config: {
      mass: 1.5,
      tension: 350,
      friction: 100,
      precision: 0.01,
      exitBeforeEnter: false,
    },
  });

  return transition((props, scene) => <SceneGroup scene={scene} {...props} />);
};

export default SceneRouter;

interface SceneGroupProps {
  scene: SCENE;
  scale: SpringValue<number>;
  position: SpringValue<ThreePosition>;
}

const SceneGroup: React.FC<SceneGroupProps> = ({ scene, ...props }) => {
  return (
    <a.group {...props}>
      {
        {
          SINGLEPLAYER: <SinglePlayerScene />,
          MULTIPLAYER: <>multiplayer scene</>,
          MAIN: <MainScene />,
          LEADERBOARD: <>singleplayer scene</>,
        }[scene]
      }
    </a.group>
  );
};
