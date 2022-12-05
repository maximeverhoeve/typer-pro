import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import SinglePlayerLeaderboard from '../components/leaderboard/SinglePlayerLeaderboard';
import { Stats } from '../hooks/useTyper';

interface LocationState {
  stats: Stats;
  textId: string;
}

const SinglePlayerResults: React.FC = () => {
  const location = useLocation();
  const { stats, textId } = location.state as LocationState;

  return (
    <HStack
      w="100%"
      maxW="2xl"
      h="100%"
      spacing="6"
      align="stretch"
      maxH="250px"
    >
      <VStack fontSize="2xl" align="stretch">
        <Box>
          <Text>wpm:</Text>
          <Text>{stats.wpm}</Text>
        </Box>
      </VStack>
      <Box flexGrow={1}>
        <SinglePlayerLeaderboard id={textId} />
      </Box>
    </HStack>
  );
};

export default SinglePlayerResults;
