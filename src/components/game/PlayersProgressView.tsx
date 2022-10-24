import { Box, Center, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import useSocketContext from '../../hooks/useSocketContext';

const PlayersProgressView: React.FC = () => {
  const { players, nickname } = useSocketContext();
  const playerColor = 'yellow.400';
  const enemyColor = 'gray.300';

  const sortedPlayers = players.sort((a, b) => {
    if (a.nickname === nickname) {
      return 1;
    }
    return -1;
  });

  return (
    <VStack
      borderRadius="lg"
      bg="gray.900"
      p="8"
      pt="6"
      align="stretch"
      spacing="12"
      w="100%"
    >
      <Text fontSize="xl" color="white" align="center">
        Type!
      </Text>
      {sortedPlayers.map(({ nickname: playerName, progress }) => {
        const isMe = nickname === playerName;
        const parsedProgress = Math.min(Math.max(progress, 0), 1);

        return (
          <VStack align="stretch" key={`player-progress-${playerName}`}>
            <Box
              h="10px"
              borderRadius="md"
              w="100%"
              bg="gray.600"
              position="relative"
            >
              <Box
                h="100%"
                borderRadius="md"
                borderTopRightRadius="0"
                w={`${parsedProgress * 100}%`}
                transition="0.3s"
                bg={isMe ? playerColor : enemyColor}
                position="absolute"
              >
                <Center
                  position="absolute"
                  right="0"
                  bottom="calc(100% - 10px)"
                  px="3"
                  p="2"
                  bg={isMe ? playerColor : enemyColor}
                  borderTopRadius="md"
                  borderBottomLeftRadius="md"
                  color="black"
                >
                  <Text fontWeight="bold">{playerName}</Text>
                </Center>
              </Box>
            </Box>
          </VStack>
        );
      })}
    </VStack>
  );
};

export default PlayersProgressView;
