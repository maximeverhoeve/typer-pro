import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import CountUp from 'react-countup';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SinglePlayerLeaderboard from '../components/leaderboard/SinglePlayerLeaderboard';
import { Stats } from '../hooks/useTyper';
import { motion } from 'framer-motion';

const SinglePlayerResults: React.FC = () => {
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
        <VStack fontSize="2xl" align="stretch">
          <Box>
            <Text>wpm:</Text>
            <Text>
              <CountUp end={0} duration={0.6} />
            </Text>
          </Box>
        </VStack>
        <Box flexGrow={1}>
          <SinglePlayerLeaderboard id={textId} />
        </Box>
      </HStack>
    </motion.div>
  );
};

export default SinglePlayerResults;
