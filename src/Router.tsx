import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import PlayerSettings from './features/player-settings';
import SinglePlayer from './features/singleplayer';
import LeaderBoardDetail from './pages/LeaderboardDetail';
import LeaderBoard from './features/leaderboard';
import GameRoute from './components/GameRoute';
import Multiplayer from './features/multiplayer';
import MultiplayerLobby from './features/multiplayer/components/lobby/MultiplayerLobby';
import MultiplayerGame from './pages/MultiplayerGame';
import PreGameLobby from './pages/PreGameLobby';

const Router: React.FC = () => {
  const location = useLocation();

  const getKeyForAnimationChange = (): string => {
    if (location.pathname.includes('/singleplayer/')) {
      return '/singleplayer';
    }
    if (location.pathname.includes('/multiplayer/')) {
      return '/multiplayer';
    }
    return location.pathname;
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={getKeyForAnimationChange()}>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<PlayerSettings />} />
        <Route
          path="/singleplayer"
          element={
            <GameRoute>
              <SinglePlayer />
            </GameRoute>
          }
        >
          <Route
            path=":textId"
            element={
              <GameRoute>
                <SinglePlayer />
              </GameRoute>
            }
          />
        </Route>
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/leaderboard/:textId" element={<LeaderBoardDetail />} />
        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="/multiplayer/:room" element={<MultiplayerLobby />}>
          <Route path="" element={<PreGameLobby />} />
          <Route path="game" element={<MultiplayerGame />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
