import { Box, HStack } from '@chakra-ui/react';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SinglePlayerLeaderboard from '../components/leaderboard/SinglePlayerLeaderboard';
import { motion } from 'framer-motion';
import { Stats } from '../hooks/useTyper';
import LeaderBoardDetailStateStats from '../features/leaderboard/components/LeaderBoardDetailStateStats';

interface LocationType {
  state?: {
    stats?: Stats;
  };
}

const LeaderBoardDetail: React.FC = () => {
  const location = useLocation() as LocationType;
  const stats = location?.state?.stats;
  const { textId } = useParams<{ textId: string }>();
  if (!textId) return <p>Leaderboard for joke not found</p>;

  return (
    <motion.div
      style={{
        width: '100%',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <HStack
        w="100%"
        mx="auto"
        maxW="2xl"
        h="100%"
        spacing="6"
        align="stretch"
        maxH="268px"
      >
        {stats && <LeaderBoardDetailStateStats textId={textId} stats={stats} />}
        <Box flexGrow={1}>
          <SinglePlayerLeaderboard id={textId} />
        </Box>
      </HStack>
    </motion.div>
  );
};

export default LeaderBoardDetail;
