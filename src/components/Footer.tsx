import { HStack, Switch } from '@chakra-ui/react';
import React from 'react';
import useGameContext from '../hooks/useGameContext';
import useSocketContext from '../hooks/useSocketContext';
import Controls from './Controls';
import SocketChat from './SocketChat';

interface Props {
  onThemeChange: () => void;
}

const Footer: React.FC<Props> = ({ onThemeChange }) => {
  const { room } = useSocketContext();
  const { isStarted } = useGameContext();
  return (
    <HStack align="stretch" justify="space-between" p="4">
      {!room && <Controls />}
      {!isStarted && <SocketChat />}
      <Switch size="lg" onChange={onThemeChange} />
    </HStack>
  );
};

export default Footer;
