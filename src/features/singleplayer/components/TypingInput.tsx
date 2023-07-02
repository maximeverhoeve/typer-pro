import { Box, Text } from '@chakra-ui/react';
import React, { FC, useEffect, useRef } from 'react';
import {
  CharStateType,
  TypingActionType,
  TypingStateType,
} from 'react-typing-game-hook';
import { useClickAnyWhere } from 'usehooks-ts';

interface Props {
  states: TypingStateType;
  actions: TypingActionType;
  text: string;
  onRestart: () => void;
}

const TypingInput: FC<Props> = ({ text, onRestart, ...props }) => {
  const letterElements = useRef<HTMLDivElement>(null);
  useClickAnyWhere(() => {
    letterElements.current?.focus();
  });
  const {
    states: { charsState, currIndex },
    actions: { insertTyping },
  } = props;

  // handle key presses
  const handleKeyDown = (letter: string, control: boolean): void => {
    if (letter === 'Escape') {
      onRestart();
    } else if (letter === 'Backspace') {
      /** Disabling going back in the text */
      // deleteTyping(control);
    } else if (letter.length === 1) {
      insertTyping(letter);
    }
  };

  const getCharColor = (index: number): string => {
    const state = charsState[index];
    if (currIndex + 1 === index) return 'secondary';
    if (state === CharStateType.Incomplete) return 'gray.500';
    if (state === CharStateType.Correct) return 'text';
    return 'red.70';
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
        <Box
          ref={letterElements}
          tabIndex={0}
          _focus={{ border: 'none', outline: 'none' }}
        >
          {text.split('').map((letter, index) => {
            return (
              <Box as="span" key={`${letter}_${index}`} position="relative">
                <Text
                  as="span"
                  color={getCharColor(index)}
                  fontWeight={index === currIndex + 1 ? 'bold' : 'normal'}
                >
                  {letter}
                </Text>
                {index === currIndex + 1 && (
                  <Text position="absolute" color="white" left="0" top="1">
                    _
                  </Text>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
      {/* <p>
        {phase === PhaseType.Ended && startTime && endTime ? (
          <>
            <span>WPM: {Math.round(((60 / duration) * correctChar) / 5)}</span>
            <span>
              Accuracy:{' '}
              {(((correctChar - errorChar) / text.length) * 100).toFixed(2)}%
            </span>
            <span>Duration: {duration}s</span>
          </>
        ) : null}
        <span> Current Index: {currIndex}</span>
        <span> Correct Characters: {correctChar}</span>
        <span> Error Characters: {errorChar}</span>
      </p> */}
    </Box>
  );
};

export default TypingInput;
