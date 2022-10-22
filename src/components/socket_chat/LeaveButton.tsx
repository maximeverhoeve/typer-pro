import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';
import useSocketContext from '../../hooks/useSocketContext';

const LeaveButton: React.FC = () => {
  const { socket } = useSocketContext();

  const handleClick = (): void => {
    // leave room evnt
    socket.emit('room:leave');
  };

  return (
    <Tooltip
      p="3"
      placement="top-end"
      hasArrow
      label="Leave room"
      shouldWrapChildren
      offset={[0, 10]}
    >
      <IconButton
        colorScheme="red"
        aria-label="Leave"
        icon={<MdLogout size="24px" />}
        onClick={handleClick}
      />
    </Tooltip>
  );
};

export default LeaveButton;
