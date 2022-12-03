import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Player from '../pages/Player';
import SinglePlayerResults from '../pages/SinglePlayerResults';
import SinglePlayerView from '../pages/SinglePlayerView';
import MultiplayerSetup from './socket_chat/MultiplayerSetup';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Player />} />
        <Route path="/singleplayer" element={<SinglePlayerView />} />
        <Route path="/singleplayer/results" element={<SinglePlayerResults />} />
        <Route path="/multiplayer" element={<MultiplayerSetup />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
