import React from 'react';
import { Room } from '../../types/RoomTypes';
import { Table, TableContainer } from '@chakra-ui/react';
import MultiplayerRoomTableHead from './MultiplayerRoomTableHead';
import MultiplayerRoomTableBody from './MultiplayerRoomTableBody';

interface Props {
  rooms: Room[];
  onAddRoom: () => void;
}

const MultiplayerRoomTable: React.FC<Props> = ({ rooms, onAddRoom }) => {
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
        <MultiplayerRoomTableHead />
        <MultiplayerRoomTableBody onAdd={onAddRoom} rooms={rooms} />
      </Table>
    </TableContainer>
  );
};

export default MultiplayerRoomTable;
