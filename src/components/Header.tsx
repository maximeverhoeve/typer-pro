import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  SlideFade,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';
import { getDisplayName } from '../features/singleplayer/utils/playerUtils';
import usePlayerStore from '../store/usePlayerStore';

interface Props {
  onTransitionEnd: () => void;
}

const Header: React.FC<Props> = ({ onTransitionEnd }) => {
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
      initial={{ height: '100vh', background: 'rgba(18, 18, 18, 1)' }}
      animate={{ height: 'unset', background: 'rgba(18, 18, 18, 0)' }}
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
        <SlideFade in={!!nickname}>
          <Flex justify="flex-end" align="flex-start" p="4">
            <Button
              as={Link}
              to="/player"
              variant="ghost"
              _hover={{ bg: 'gray.800' }}
            >
              <Text
                transition="0.2s"
                sx={{
                  span: {
                    fontSize: '12px',
                    fontWeight: 400,
                    opacity: 0.4,
                    ml: 1,
                  },
                }}
                dangerouslySetInnerHTML={{
                  __html: getDisplayName({ id, name: nickname || 'Typer Pro' }),
                }}
              />
            </Button>
          </Flex>
        </SlideFade>
      </Grid>
    </motion.div>
  );
};

export default Header;
