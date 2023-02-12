import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import CountUp from 'react-countup';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SinglePlayerLeaderboard from '../components/leaderboard/SinglePlayerLeaderboard';
import { motion } from 'framer-motion';
import { Stats } from '../hooks/useTyper';
import { VscDebugRestart } from 'react-icons/vsc';

interface LocationType {
  state?: {
    stats?: Stats;
  };
}

const SinglePlayerResults: React.FC = () => {
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
        maxH="250px"
      >
        {stats && (
          <VStack fontSize="2xl" align="stretch">
            <Box>
              <Text>wpm:</Text>
              <Text>
                <CountUp end={stats?.wpm} duration={0.6} />
              </Text>
            </Box>
            <IconButton
              variant="outline"
              size="lg"
              aria-label="darkmode"
              icon={<VscDebugRestart />}
            />
          </VStack>
        )}
        <Box flexGrow={1}>
          <SinglePlayerLeaderboard id={textId} />
        </Box>
      </HStack>
    </motion.div>
  );
};

export default SinglePlayerResults;
