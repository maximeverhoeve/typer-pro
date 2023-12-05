import React from 'react';
// import useGameContext from '../hooks/useGameContext';
import PreGameLobby from './PreGameLobby';

const MultiplayerView: React.FC = () => {
  // const { isStarted } = useGameContext();

  // if (isStarted) {
  //   return <Game />;
  // }

  return <PreGameLobby />;
};

export default MultiplayerView;
