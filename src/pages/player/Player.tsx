import { Button, Input, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import usePlayerStore from '../../store/usePlayerStore';

const Player: React.FC = () => {
  const placeholdername = 'devmax';
  const nickname = usePlayerStore((state) => state.nickname);
  const setNickname = usePlayerStore((state) => state.setNickname);

  const handleBlur = (): void => {
    if (!nickname) {
      setNickname(placeholdername);
    }
  };

  return (
    <VStack textAlign="center" spacing="12">
      <motion.div
        initial={{ translateX: 100, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        exit={{ translateX: 100, opacity: 0 }}
        transition={{ type: 'tween' }}
      >
        <Text fontSize="32px" as="span">
          My awesome nickname <br /> is
          <Input
            autoFocus
            display="inline"
            fontSize="32px"
            onChange={(e) => setNickname(e.currentTarget.value)}
            onBlur={handleBlur}
            color="secondary"
            value={nickname}
            w={`${nickname.length * 20}px`}
            p="0"
            fontWeight="bold"
            ml="4"
            maxLength={16}
            border="none"
            _active={{ outline: 'none', border: 'none', boxShadow: 'none' }}
            _focus={{ outline: 'none', border: 'none', boxShadow: 'none' }}
          />
        </Text>
      </motion.div>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          as={Link}
          to="/singleplayer"
          _hover={{ bg: 'unset' }}
          bg="primary"
          color="white"
          borderRadius="none"
          rightIcon={<HiArrowRight size="24px" color="white" />}
        >
          Start
        </Button>
      </motion.div>
    </VStack>
  );
};

export default Player;
