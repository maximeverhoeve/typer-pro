import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import getLeaderBoardJokes from '../api/getLeaderboardJokes';
import { useBoolean } from '@chakra-ui/react';

const LeaderBoard: React.FC = () => {
  const [isLoading, setIsLoading] = useBoolean();

  const loadData = async (): Promise<void> => {
    setIsLoading.on();
    const data = await getLeaderBoardJokes();
    console.log(data);
    setIsLoading.off();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <motion.div
      style={{
        width: '100%',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      {isLoading ? <p>Loading...</p> : <p>Leaderboard</p>}
    </motion.div>
  );
};

export default LeaderBoard;
