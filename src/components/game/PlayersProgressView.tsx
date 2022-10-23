import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import useSocketContext from '../../hooks/useSocketContext';

const PlayersProgressView: React.FC = () => {
  const { players, nickname } = useSocketContext();
  return (
    <VStack align="stretch" spacing="4">
      {players.map(({ nickname: playerName, progress }) => {
        const isMe = nickname === playerName;
        return (
          <VStack align="stretch" key={`player-progress-${playerName}`}>
            <Text textAlign="left" color="white">
              {playerName}
            </Text>
            <Box
              h="10px"
              w={`${progress * 100}%`}
              bg={isMe ? 'yellow.400' : 'gray.200'}
            />
          </VStack>
        );
      })}
    </VStack>
  );
};

export default PlayersProgressView;
