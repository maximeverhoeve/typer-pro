import React from 'react';
import { LeaderBoardObject } from '../../../api/getLeaderboardJokes';
import { HStack, Text } from '@chakra-ui/react';
import { FaMedal } from 'react-icons/fa';

interface Props {
  data: LeaderBoardObject;
}

const LeaderBoardCardHeader: React.FC<Props> = ({ data }) => {
  return (
    <HStack p="3" bg="background" spacing="4">
      <FaMedal color="white" />
      <Text fontWeight="500" color="white" flexGrow="1">
        {data.topPlayer.name}
      </Text>
      {data.topPlayer.acc && (
        <Text fontWeight="300" color="white">
          {data.topPlayer.acc.toFixed(1)}% ACC
        </Text>
      )}
      <Text fontWeight="300" color="secondary">
        {data.topPlayer.wpm} WPM
      </Text>
    </HStack>
  );
};

export default LeaderBoardCardHeader;
