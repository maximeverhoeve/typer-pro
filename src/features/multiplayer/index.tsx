import { motion } from 'framer-motion';
import React from 'react';

const Multiplayer: React.FC = () => {
  return (
    <motion.div
      style={{ flexGrow: 1 }}
      initial={{ transform: 'scale(0.1)' }}
      animate={{ transform: 'scale(1)' }}
      exit={{ transform: 'scale(0.1)', opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p>Multiplayer</p>
    </motion.div>
  );
};

export default Multiplayer;
