import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Player from '../pages/player/Player';
import Leaderboard from '../pages/Leaderboard';
import SinglePlayer from '../features/singleplayer';
import MultiplayerSetup from './socket_chat/MultiplayerSetup';

const AnimatedRoutes: React.FC = () => {
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
        <Route path="/singleplayer" element={<SinglePlayer />}>
          <Route path=":textId" element={<SinglePlayer />} />
        </Route>
        <Route path="/leaderboard" element={<Leaderboard />}>
          <Route path=":textId" element={<Leaderboard />} />
        </Route>
        <Route path="/multiplayer" element={<MultiplayerSetup />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
