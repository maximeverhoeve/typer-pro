import { RepeatIcon } from '@chakra-ui/icons';
import { Button, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface Props {
  wpm?: number;
  onRestart: () => void;
}

const StatsView: React.FC<Props> = ({ wpm = 0, onRestart }) => {
  return (
    <VStack>
      <Text fontWeight="bold" fontSize="8xl" color="gray.600" align="center">
        {wpm} WPM
      </Text>
      <Button
        leftIcon={<RepeatIcon />}
        variant="solid"
        colorScheme="yellow"
        minW="32"
        onClick={onRestart}
        mx="auto"
      >
        Restart
      </Button>
    </VStack>
  );
};

export default StatsView;
