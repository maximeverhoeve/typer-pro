import { Box, Center, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import useSocketContext from '../../hooks/useSocketContext';

const PlayersProgressView: React.FC = () => {
  const { players, nickname } = useSocketContext();

  return (
    <VStack align="stretch" spacing="14" w="100%">
      {players.map(({ nickname: playerName, progress }) => {
        const isMe = nickname === playerName;
        const parsedProgress = Math.min(Math.max(progress, 0), 1);

        return (
          <VStack align="stretch" key={`player-progress-${playerName}`}>
            <Box
              h="10px"
              borderRadius="md"
              borderTopRightRadius="0"
              w={`${parsedProgress * 100}%`}
              transition="0.3s"
              bg={isMe ? 'yellow.400' : 'gray.200'}
              position="relative"
            >
              <Center
                position="absolute"
                right="0"
                bottom="100%"
                px="3"
                p="2"
                bg={isMe ? 'yellow.400' : 'gray.200'}
                borderTopRadius="md"
                color="black"
              >
                <Text fontWeight="bold">{playerName}</Text>
              </Center>
            </Box>
          </VStack>
        );
      })}
    </VStack>
  );
};

export default PlayersProgressView;
