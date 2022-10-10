import { RepeatIcon } from '@chakra-ui/icons';
import { Button, ScaleFade, SlideFade, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Stats } from './TypingContainer';

interface Props {
  stats: Stats;
  onRestart: () => void;
}

const StatsView: React.FC<Props> = ({ stats, onRestart }) => {
  const { wpm, cpm } = stats;
  return (
    <VStack>
      <ScaleFade in={!!wpm}>
        <Text fontWeight="bold" fontSize="8xl" color="gray.600" align="center">
          {wpm}{' '}
          <Text as="span" opacity="0.6">
            WPM
          </Text>
        </Text>
        <Text fontWeight="bold" fontSize="4xl" color="gray.600" align="center">
          ({cpm}{' '}
          <Text as="span" opacity="0.6">
            CPM
          </Text>
          )
        </Text>
      </ScaleFade>
      <SlideFade in={!!wpm}>
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
      </SlideFade>
    </VStack>
  );
};

export default StatsView;
