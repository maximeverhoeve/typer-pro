import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import MultiplayerView from '../pages/MultiplayerView';
import SinglePlayerView from '../pages/SinglePlayerView';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/singleplayer" element={<SinglePlayerView />} />
        <Route path="/multiplayer" element={<MultiplayerView />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
