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
import CountUp from 'react-countup';
import { VscDebugRestart } from 'react-icons/vsc';
import { Stats } from '../hooks/useTyper';

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
      return 'Nice!';
    }
    if (wpm < 70) {
      return 'Ok ok.. You can do better!';
    }
    return 'Great Job!';
  };

  return (
    <VStack spacing="10" align="center">
      <ScaleFade in={!!wpm}>
        <Heading mb="4" textAlign="center" color="text">
          {renderText()}
        </Heading>
        <HStack justify="center" spacing="10">
          <HStack>
            <Text
              fontWeight="bold"
              lineHeight="100%"
              fontSize="3xl"
              color="primary"
              align="center"
            >
              <CountUp end={wpm} duration={0.6} />
            </Text>
            <Text align="center" fontSize="3xl" color="text" opacity="0.6">
              WPM
            </Text>
          </HStack>
          <HStack>
            <Text
              fontWeight="bold"
              lineHeight="100%"
              fontSize="3xl"
              color="primary"
              align="center"
            >
              <CountUp end={cpm} duration={0.6} />
            </Text>
            <Text align="center" fontSize="3xl" color="text" opacity="0.6">
              CPM
            </Text>
          </HStack>
        </HStack>
      </ScaleFade>
      <SlideFade in={!!wpm}>
        <Button
          leftIcon={<VscDebugRestart size="20px" />}
          variant="solid"
          colorScheme="cyan"
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
