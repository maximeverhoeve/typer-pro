import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import CustomtableRow from './CustomtableRow';

export interface LeaderboardData {
  id: string;
  name: string;
  acc: number;
  wpm: number;
}

interface Props {
  data: LeaderboardData[];
  playerId?: string;
}

const CustomTable: React.FC<Props> = ({ data, playerId }) => {
  return (
    <Box
      w="100%"
      h="100%"
      border="1px solid"
      borderColor="#414141"
      overflowY="auto"
    >
      {/* Header */}
      <HStack
        borderBottom="1px solid"
        borderColor="#414141"
        fontWeight="medium"
        p="4"
        spacing="6"
      >
        {/* Adding invisible number for spacing purpose */}
        <Text opacity="0">2</Text>
        <Text flexGrow="1">Player</Text>
        <Text>acc[%]</Text>
        <Text>wpm</Text>
      </HStack>
      {data.map((player, index) => (
        <CustomtableRow
          key={player.id}
          data={player}
          nr={index + 1}
          activeId={playerId}
        />
      ))}
    </Box>
  );
};

export default CustomTable;
