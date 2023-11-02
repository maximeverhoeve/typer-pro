import React from 'react';
import { Table, TableContainer } from '@chakra-ui/react';
import { Player } from '../../../../../types/socketTypes';
import MultiplayerLobbyTableBody from './MultiplayerLobbyTableBody';
import MultiplayerLobbyTableHead from './MultiplayerLobbyTableHead';

interface Props {
  players: Player[];
}

const MultiplayerLobbyTable: React.FC<Props> = ({ players }) => {
  return (
    <TableContainer
      h="100%"
      w="100%"
      border="1px solid"
      borderColor="#414141"
      overflowY="auto"
      maxH="50vh"
      borderRadius="md"
      sx={{
        '&::-webkit-scrollbar': {
          width: '12px',
          bg: '#2F2F2F',
          borderTopRightRadius: 'md',
          borderBottomRightRadius: 'md',
          overflow: 'hidden',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
          overflow: 'hidden',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#454545',
          borderTopRightRadius: 'md',
          borderBottomRightRadius: 'md',
        },
      }}
    >
      <Table>
        <MultiplayerLobbyTableHead />
        <MultiplayerLobbyTableBody players={players} />
      </Table>
    </TableContainer>
  );
};

export default MultiplayerLobbyTable;
