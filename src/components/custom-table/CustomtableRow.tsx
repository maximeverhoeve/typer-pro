import { HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { LeaderboardData } from './CustomTable';

interface Props {
  data: LeaderboardData;
  nr: number;
  activeId?: string;
}

const CustomtableRow: React.FC<Props> = ({ data, nr, activeId }) => {
  const { name, acc, wpm, id } = data;
  const isActiveRow = id === activeId;

  return (
    <HStack px="4" bg={isActiveRow ? 'primary' : 'unset'} py="3" spacing="6">
      <Text>{nr}</Text>
      <Text flexGrow="1">{name}</Text>
      <Text>{acc}</Text>
      <Text>{wpm}</Text>
    </HStack>
  );
};

export default CustomtableRow;
