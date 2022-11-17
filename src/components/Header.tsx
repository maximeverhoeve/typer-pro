import {
  Box,
  Flex,
  Grid,
  Heading,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

interface Props {
  isDarkTheme: boolean;
  onThemeChange: () => void;
}

const Header: React.FC<Props> = ({ isDarkTheme, onThemeChange }) => {
  const handleToggle = (): void => {
    onThemeChange();
  };

  return (
    <Grid templateColumns="1fr auto 1fr">
      <Box />
      <VStack p="4" spacing="4" pt="16">
        <Heading as="h1" size="lg" textAlign={{ base: 'center', md: 'left' }}>
          <Text as="span" color="primary">
            [
          </Text>
          <Text as="span" px="4">
            typer:pro
          </Text>
          <Text as="span" color="secondary">
            ]
          </Text>
        </Heading>
        <Text>by devmax</Text>
      </VStack>
      <Flex justify="flex-end" p="4">
        <IconButton
          borderRadius="none"
          bg="none"
          _hover={{}}
          aria-label="darkmode"
          onClick={handleToggle}
          icon={isDarkTheme ? <BsFillSunFill /> : <BsFillMoonFill />}
          color="text"
        />
      </Flex>
    </Grid>
  );
};

export default Header;
