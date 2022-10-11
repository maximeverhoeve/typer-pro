import { RepeatIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  ScaleFade,
  SlideFade,
  StackDivider,
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
  return (
    <VStack spacing="20">
      <ScaleFade in={!!wpm}>
        <Heading mb="3" textAlign="center" color="gray.100">
          Great Job!
        </Heading>
        <HStack spacing="10">
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
