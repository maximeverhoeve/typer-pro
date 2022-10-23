import React from 'react';
import useGame from '../hooks/useGame';
import Game from './Game';
import PreGameLobby from './PreGameLobby';

const MultiplayerView: React.FC = () => {
  const { isStarted } = useGame();

  if (isStarted) {
    return <Game />;
  }

  return <PreGameLobby />;
};

export default MultiplayerView;
