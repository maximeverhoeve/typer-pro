import {
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Props {
  isDarkTheme: boolean;
  onThemeChange: () => void;
  onTransitionEnd: () => void;
}

const Header: React.FC<Props> = ({
  isDarkTheme,
  onThemeChange,
  onTransitionEnd,
}) => {
  const navigate = useNavigate();
  const handleToggle = (): void => {
    onThemeChange();
  };

  return (
    <Grid templateColumns="1fr auto 1fr">
      <Box>
        <IconButton
          borderRadius="none"
          bg="none"
          _hover={{}}
          size="lg"
          aria-label="darkmode"
          onClick={() => navigate('/')}
          icon={<AiFillHome />}
          color="text"
        />
      </Box>
      <AnimatePresence>
        <VStack p="4" spacing="4" pt="16">
          <HStack as={Heading} display="inline-flex" justify="center">
            <Text color="primary">[</Text>
            <motion.p
              style={{
                overflow: 'hidden',
              }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Text whiteSpace="nowrap" px="4">
                typer:pro
              </Text>
            </motion.p>
            <Text color="secondary">]</Text>
          </HStack>

          <motion.p
            initial={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 0.8 }}
            onAnimationComplete={onTransitionEnd}
          >
            by devmax
          </motion.p>
        </VStack>
      </AnimatePresence>
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
