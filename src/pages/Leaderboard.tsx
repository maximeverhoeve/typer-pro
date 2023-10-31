import React from 'react';
import { motion } from 'framer-motion';
import { Center, SimpleGrid, Spinner } from '@chakra-ui/react';
import useLeaderboard from '../api/getLeaderboard';
import LeaderBoardCard from '../features/leaderboard/components/LeaderBoardCard';

const LeaderBoard: React.FC = () => {
  const { data, isLoading } = useLeaderboard();

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
      initial={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      exit={{ translateY: 0, opacity: 0 }}
    >
      <Center>
        <SimpleGrid maxW="2xl" columns={1} gridGap="10">
          {data?.map((item) => (
            <LeaderBoardCard key={item.id} data={item} />
          ))}
        </SimpleGrid>
      </Center>
    </motion.div>
  );
};

export default LeaderBoard;
