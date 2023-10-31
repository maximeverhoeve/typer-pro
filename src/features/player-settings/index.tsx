import { Button, Input, Text, Tooltip, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import usePlayerStore from '../../store/usePlayerStore';
import { useNavigate } from 'react-router-dom';

const PlayerSettings: React.FC = () => {
  const navigate = useNavigate();
  const placeholdername = 'Typer Pro';
  /** The nickname is only set when pressing the start button
   * It's not set when changing the input
   */
  const nickname = usePlayerStore((state) => state.nickname);
  const [inputValue, setInputValue] = useState<string>(
    nickname || placeholdername,
  );
  const setNickname = usePlayerStore((state) => state.setNickname);
  const isButtonDisabled = !inputValue || inputValue === placeholdername;

  const handleBlur = (): void => {
    if (!inputValue) {
      setInputValue(placeholdername);
    }
  };

  const handleSubmit = (): void => {
    setNickname(inputValue);
    navigate('/singleplayer');
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
            onChange={(e) => setInputValue(e.currentTarget.value)}
            onBlur={handleBlur}
            color="secondary"
            value={inputValue}
            w={`${inputValue.length * 20}px`}
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
        <Tooltip
          label={`Make sure to enter a nickname not equal to "${placeholdername}"`}
          isDisabled={!isButtonDisabled}
        >
          <Button
            onClick={handleSubmit}
            _hover={{ bg: 'unset' }}
            bg="primary"
            color="white"
            isDisabled={isButtonDisabled}
            borderRadius="none"
            rightIcon={<HiArrowRight size="24px" color="white" />}
          >
            Start
          </Button>
        </Tooltip>
      </motion.div>
    </VStack>
  );
};

export default PlayerSettings;
