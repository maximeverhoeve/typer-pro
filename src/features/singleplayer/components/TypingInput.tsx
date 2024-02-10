import { Box, Text } from '@chakra-ui/react';
import { useSpring, animated } from '@react-spring/web';
import React, { FC, useEffect, useRef } from 'react';
import { TypingActionType, TypingStateType } from 'react-typing-game-hook';

interface Props {
  states: TypingStateType;
  actions: TypingActionType;
  text: string;
  onRestart: () => void;
  isDisabled?: boolean;
}

const TypingInput: FC<Props> = ({ text, onRestart, isDisabled, ...props }) => {
  const letterElements = useRef<HTMLDivElement>(null);
  const nextCharRef = useRef<HTMLParagraphElement>(null);

  const {
    states: { currIndex },
    actions: { insertTyping },
  } = props;
  const [{ left, top }] = useSpring<{ left: number; top: number }>(
    {
      left: nextCharRef.current?.offsetLeft || 0,
      top: (nextCharRef.current?.offsetTop || 0) + 2,
      config: {
        duration: 100,
      },
    },
    [currIndex],
  );

  // handle key presses
  const handleKeyDown = (letter: string, control: boolean): void => {
    if (letter === 'Escape') {
      onRestart();
    } else if (letter === 'Backspace') {
      /** Disabling going back in the text */
      // deleteTyping(control);
    } else if (letter.length === 1) {
      if (!isDisabled) {
        insertTyping(letter);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', () => {
      letterElements.current?.focus();
    });

    return () => {
      window.removeEventListener('keydown', () => {
        letterElements.current?.focus();
      });
    };
  }, []);

  const validText = text.substring(0, currIndex + 1);
  const textToType = text.substring(currIndex + 3);

  return (
    <Box fontSize="lg" _focus={{ border: 'none', outline: 'none' }}>
      <Box
        position="relative"
        tabIndex={0}
        _focus={{ border: 'none', outline: 'none' }}
        onKeyDown={(e) => handleKeyDown(e.key, e.ctrlKey)}
        onBlur={() => {
          letterElements.current?.focus();
        }}
      >
        <animated.p style={{ position: 'absolute', left, top }}>_</animated.p>
        <Box
          ref={letterElements}
          tabIndex={0}
          _focus={{ border: 'none', outline: 'none' }}
        >
          <Text as="span" color="text">
            {validText}
          </Text>
          <Text as="span" color="secondary" fontWeight="bold">
            {text[currIndex + 1]}
          </Text>
          {/* To get correct value for the indicator we also render the next char here */}
          <Text ref={nextCharRef} as="span" color="gray.500">
            {text[currIndex + 2]}
          </Text>
          <Text as="span" color="gray.500">
            {textToType}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default TypingInput;
