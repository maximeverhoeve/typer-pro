import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import React from 'react';
import ShowedText from '../components/ShowedText';
import useTyper from '../hooks/useTyper';
const text = 'Lorem ipsum dolor sit amet consectetur test elit.';

const Home: React.FC = () => {
  const {
    textToType,
    validText,
    wordToType,
    inputValue,
    handleChange,
    isFinished,
    timer,
    onReset,
  } = useTyper(text);

  const getWPM = (): number => {
    const { start, end } = timer;

    const totalTime = end - start;
    const oneMinInMs = 60000;
    const textLength = text.split(' ').length;

    const wpm = textLength * (oneMinInMs / totalTime);
    return Math.round(wpm);
  };

  return (
    <Flex direction="column" bg="gray.700" h="100vh" overflow="hidden">
      <Box p="4">
        <Heading color="white">DevMax TyperPro</Heading>
      </Box>
      <Center flexGrow={1}>
        <VStack
          spacing="5"
          bg="gray.100"
          p="6"
          borderRadius="md"
          w="600px"
          maxW="90%"
          align="stretch"
        >
          {isFinished ? (
            <>
              <p>WPM: {getWPM()}</p>
              <Button
                leftIcon={<RepeatIcon />}
                variant="solid"
                colorScheme="yellow"
                minW="32"
                onClick={onReset}
              >
                Restart
              </Button>
            </>
          ) : (
            <>
              <ShowedText
                validText={validText}
                currentWord={wordToType}
                text={textToType}
              />
              <HStack>
                <Input bg="white" onChange={handleChange} value={inputValue} />
                <Button
                  leftIcon={<RepeatIcon />}
                  variant="solid"
                  colorScheme="yellow"
                  minW="32"
                  onClick={onReset}
                >
                  Restart
                </Button>
              </HStack>
            </>
          )}
        </VStack>
      </Center>
      <Box p="4">
        <Text align="right" color="white" fontSize="2xl">
          v0.1.0
        </Text>
      </Box>
    </Flex>
  );
};

export default Home;
