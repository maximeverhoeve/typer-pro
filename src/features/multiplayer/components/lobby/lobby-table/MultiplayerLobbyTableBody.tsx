import React from 'react';
import {
  Box,
  HStack,
  Tbody,
  Td,
  Text,
  Tooltip,
  Tr,
  keyframes,
} from '@chakra-ui/react';
import { Player } from '../../../../../types/socketTypes';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useSocket } from '../../../../../hooks/useSocket';

interface Props {
  players: Player[];
}

const arrowAnimation = keyframes`
0% {transform: translate(10px, 0)}
50% {transform: translate(0, 0)}
100% {transform: translate(10px, 0)}
`;

const MultiplayerLobbyTableBody: React.FC<Props> = ({ players }) => {
  const { socket } = useSocket();
  const spinAnimation = `${arrowAnimation} infinite 1.5s ease`;

  const getBoxColor = (player: Player): string => {
    if (player.isLoaded) return 'orange.500';
    if (player.isReady) return 'green.700';
    return 'red.700';
  };

  const getStatusLabel = (player: Player): string => {
    if (player.isLoaded) return 'In game';
    if (player.isReady) return 'Ready';
    return 'Unready';
  };

  return (
    <Tbody>
      {players.map((player) => {
        const { id, nickname } = player;
        const isMe = socket.id === id;
        return (
          <Tr key={id}>
            <Td display="flex" alignItems="center" gap="2" position="relative">
              <Text fontWeight="300">{nickname}</Text>
              {isMe && (
                <Box animation={spinAnimation}>
                  <AiOutlineArrowLeft color="#ffffff" size="14px" />
                </Box>
              )}
            </Td>
            <Td>
              <HStack justify="flex-end">
                <Tooltip
                  hasArrow
                  placement="right"
                  label={getStatusLabel(player)}
                >
                  <Box
                    borderRadius="full"
                    borderColor="white"
                    bg={getBoxColor(player)}
                    w="20px"
                    h="20px"
                    transition="0.2s"
                    flexShrink={0}
                  />
                </Tooltip>
              </HStack>
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

export default MultiplayerLobbyTableBody;
