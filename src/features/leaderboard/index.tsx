import React from 'react';
import { motion } from 'framer-motion';
import { Center, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react';
import useLeaderboard from './api/getLeaderboard';
import LeaderBoardCard from './components/leaderboard-card/LeaderBoardCard';

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
        <VStack spacing="6">
          <Text borderBottom="1px solid" borderColor="border" pb="4">
            The 10 last played games
          </Text>
          <SimpleGrid maxW="2xl" columns={1} gridGap="20" pb="10">
            {data?.map((item) => (
              <LeaderBoardCard key={item.id} data={item} />
            ))}
          </SimpleGrid>
        </VStack>
      </Center>
    </motion.div>
  );
};

export default LeaderBoard;
