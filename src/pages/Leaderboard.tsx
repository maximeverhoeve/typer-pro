import React from 'react';
import { motion } from 'framer-motion';
import { Center, Spinner } from '@chakra-ui/react';
import useLeaderboard from '../api/getLeaderboard';

const LeaderBoard: React.FC = () => {
  const { data, isLoading } = useLeaderboard();

  console.log('devmax', data);
  if (isLoading) {
    return (
      <Center>
        <Spinner size="lg" color="secondary" />
      </Center>
    );
  }

  return (
    <motion.div
      style={{
        width: '100%',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <Center>
        <p>Leaderboard</p>
      </Center>
    </motion.div>
  );
};

export default LeaderBoard;
