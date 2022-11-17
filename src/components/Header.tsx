import { Box, Flex, Grid, IconButton } from '@chakra-ui/react';
import React from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';

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
    <motion.div
      style={{
        position: 'relative',
        originY: '50%',
      }}
      initial={{ height: '100vh' }}
      animate={{ height: 'unset' }}
      transition={{
        delay: 2.6,
        duration: 0.3,
        type: 'tween',
      }}
      onAnimationComplete={onTransitionEnd}
    >
      <Grid h="100%" templateColumns="1fr auto 1fr">
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
        <HeaderLogo />
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
    </motion.div>
  );
};

export default Header;
