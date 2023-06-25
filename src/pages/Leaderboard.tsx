import React from 'react';
import { motion } from 'framer-motion';

const LeaderBoard: React.FC = () => {
  return (
    <motion.div
      style={{
        width: '100%',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <p>Leaderboard</p>
    </motion.div>
  );
};

export default LeaderBoard;
