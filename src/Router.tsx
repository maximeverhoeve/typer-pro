import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Player from './pages/player/PlayerPage';
import SinglePlayer from './features/singleplayer';
import MultiplayerSetup from './components/socket_chat/MultiplayerSetup';
import LeaderBoardDetail from './pages/LeaderboardDetail';
import LeaderBoard from './features/leaderboard';
import GameRoute from './components/GameRoute';

const Router: React.FC = () => {
  const location = useLocation();

  const getKeyForAnimationChange = (): string => {
    if (location.pathname.includes('/singleplayer/')) {
      return '/singleplayer';
    }
    return location.pathname;
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={getKeyForAnimationChange()}>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Player />} />
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
        <Route path="/multiplayer" element={<MultiplayerSetup />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
