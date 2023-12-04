import React from 'react';
import { Player } from '../../../../types/socketTypes';
import { Circle, HStack, Text } from '@chakra-ui/react';
import { useSocket } from '../../../../hooks/useSocket';

interface Props {
  player: Player;
}

const playerColors = [
  '#e3c414',
  '#90ebfe',
  '#888d8a',
  '#db3d3d',
  '#db239d',
  '#3ca31c',
];

const MultiplayerLobbyPlayerSettings: React.FC<Props> = ({ player }) => {
  const { socket } = useSocket();
  const handleClick = (color: string): void => {
    socket.emit('player:update', { color });
  };

  return (
    <HStack spacing="4">
      <Text>Player color:</Text>
      <HStack>
        {playerColors.map((color) => {
          const isSelected = color === player.color;
          return (
            <Circle
              key={color}
              size="6"
              cursor="pointer"
              _hover={{ transform: 'scale(1.2)' }}
              transition="0.2s"
              bg={color}
              onClick={() => handleClick(color)}
              border="2px solid"
              borderColor={isSelected ? 'white' : 'border'}
            />
          );
        })}
      </HStack>
    </HStack>
  );
};

export default MultiplayerLobbyPlayerSettings;
