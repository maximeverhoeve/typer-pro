import React from 'react';
import {
  Box,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { Stats } from '../../../hooks/useTyper';
import CountUp from 'react-countup';
import { VscDebugRestart } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { AiFillCaretRight } from 'react-icons/ai';

interface Props {
  textId: string;
  stats: Stats;
}

const LeaderBoardDetailStateStats: React.FC<Props> = ({ stats, textId }) => {
  const navigate = useNavigate();
  return (
    <VStack
      fontSize="2xl"
      textAlign="right"
      align="flex-end"
      justify="space-between"
    >
      <Box>
        <Text color="secondary" fontSize="lg">
          wpm
        </Text>
        <Text>
          <CountUp end={stats?.wpm} duration={0.6} />
        </Text>
      </Box>
      <Box>
        <Text color="secondary" fontSize="lg">
          acc
        </Text>
        <Text>
          <CountUp end={stats?.acc} duration={0.6} />%
        </Text>
      </Box>
      <Spacer />
      <VStack align="flex-end">
        <Tooltip label="Try again" placement="top" hasArrow>
          <IconButton
            variant="outline"
            size="lg"
            aria-label="Try again"
            onClick={() => navigate(`/singleplayer/${textId}`)}
            icon={<VscDebugRestart />}
          />
        </Tooltip>
        <Tooltip label="Start a new game" placement="top" hasArrow>
          <IconButton
            variant="outline"
            size="lg"
            aria-label="New game"
            onClick={() => navigate('/singleplayer')}
            icon={<AiFillCaretRight />}
          />
        </Tooltip>
      </VStack>
    </VStack>
  );
};

export default LeaderBoardDetailStateStats;
