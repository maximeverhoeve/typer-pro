import { Box, Flex, Grid, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';
import { getDisplayName } from '../features/singleplayer/utils/playerUtils';
import usePlayerStore from '../store/usePlayerStore';

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
  const { id, nickname } = usePlayerStore((state) => state);

  return (
    <motion.div
      style={{
        position: 'absolute',
        originY: '50%',
        width: '100%',
        left: 0,
        zIndex: 1,
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
        <Box p="4">
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
        <Flex justify="flex-end" align="flex-start" p="4">
          <Text
            sx={{
              span: {
                fontSize: '12px',
                opacity: 0.4,
                ml: 1,
              },
            }}
            dangerouslySetInnerHTML={{
              __html: getDisplayName({ id, name: nickname }),
            }}
          />
        </Flex>
      </Grid>
    </motion.div>
  );
};

export default Header;
