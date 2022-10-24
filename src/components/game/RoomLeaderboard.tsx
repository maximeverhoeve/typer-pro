import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import useSocketContext from '../../hooks/useSocketContext';
import { Stats } from '../../pages/Game';

interface Props {
  stats: Stats;
}

const RoomLeaderboard: React.FC<Props> = ({ stats }) => {
  const { players } = useSocketContext();

  const finishedPlayers = players.filter(({ progress }) => progress >= 1);

  return (
    <Box color="white">
      <Box border="1px solid" borderColor="gray.500" borderRadius="md" w="100%">
        <HStack
          bg="gray.500"
          borderTopRightRadius="md"
          borderTopLeftRadius="md"
          px="4"
          py="2"
          color="black"
          fontWeight="bold"
          justify="space-between"
          w="100%"
        >
          <Text>Player</Text>
          <Text>WPM</Text>
        </HStack>
        {/* player */}
        {finishedPlayers.map((player) => (
          <HStack
            justify="space-between"
            w="100%"
            key={`finisher_${player.nickname}`}
            px="4"
            py="3"
          >
            <Text>{player.nickname}</Text>
            <Text>{stats.wpm}</Text>
          </HStack>
        ))}
      </Box>
    </Box>
  );
};

export default RoomLeaderboard;
