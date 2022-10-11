import { RepeatIcon } from '@chakra-ui/icons';
import {
  Button,
  Heading,
  HStack,
  ScaleFade,
  SlideFade,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Stats } from './TypingContainer';

interface Props {
  stats: Stats;
  onRestart: () => void;
}

const StatsView: React.FC<Props> = ({ stats, onRestart }) => {
  const { wpm, cpm } = stats;

  const renderText = (): string => {
    if (wpm > 100) {
      return 'Like Sonic... But faster!';
    }
    if (wpm > 80) {
      return 'Oeh, pretty fast!';
    }
    if (wpm > 70) {
      return 'Nicee!';
    }
    if (wpm > 70) {
      return 'Ok ok.. You can do better!';
    }
    return 'Great Job!';
  };

  return (
    <VStack spacing="10" align="center">
      <ScaleFade in={!!wpm}>
        <Heading mb="4" textAlign="center" color="gray.100">
          {renderText()}
        </Heading>
        <HStack justify="center" spacing="10">
          <HStack>
            <Text
              fontWeight="bold"
              lineHeight="100%"
              fontSize="3xl"
              color="yellow.400"
              align="center"
            >
              {wpm}
            </Text>
            <Text align="center" fontSize="3xl" color="gray.300" opacity="0.6">
              WPM
            </Text>
          </HStack>
          <HStack>
            <Text
              fontWeight="bold"
              lineHeight="100%"
              fontSize="3xl"
              color="yellow.400"
              align="center"
            >
              {cpm}
            </Text>
            <Text align="center" fontSize="3xl" color="gray.300" opacity="0.6">
              CPM
            </Text>
          </HStack>
        </HStack>
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
