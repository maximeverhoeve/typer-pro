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
const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';

const Home: React.FC = () => {
  const {
    textToType,
    validText,
    wordToType,
    inputValue,
    handleChange,
    isFinished,
  } = useTyper(text);

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
              <p>Is finished</p>
              <Button
                leftIcon={<RepeatIcon />}
                variant="solid"
                colorScheme="yellow"
                minW="32"
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
                >
                  Restart
                </Button>
              </HStack>
            </>
          )}
        </VStack>
      </Center>
      <Box p="4">
        <Text color="white" fontSize="2xl">
          v0.0.1
        </Text>
      </Box>
    </Flex>
  );
};

export default Home;
