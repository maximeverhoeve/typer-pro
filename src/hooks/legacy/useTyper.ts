import { ChangeEvent, useState } from 'react';
import useSinglePlayerStore from '../../store/useSinglePlayerStore';
import useSocketContext from './useSocketContext';

interface Timer {
  start: number;
  end: number;
}

interface ReturnProps {
  validText: string;
  wordToType: string;
  inputValue: string;
  textToType: string;
  isFinished: boolean;
  hasError: boolean;
  timer: Timer;
  onReset: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const defaultTimer = { start: 0, end: 0 };

export interface Stats {
  acc: number;
  wpm: number;
}

/**
 * @deprecated Old component that is not used anymore, removed once first finished version comes out
 */
const useTyper = (
  text: string,
  onFinish?: (stats: Stats) => void,
): ReturnProps => {
  const textArray = text.split(' ');
  const [validWords, setValidWords] = useState<string[]>([]);
  const [wordToTypeIndex, setWordToTypeIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [timer, setTimer] = useState<Timer>(defaultTimer);
  const { onChangeProgress, room } = useSocketContext();
  const { setProgress, progress, setIsGameStarted } = useSinglePlayerStore(
    (state) => state,
  );

  const isFinished = textArray.length < wordToTypeIndex + 1;
  const isLastWord = textArray.length < wordToTypeIndex + 2;
  const wordToType = textArray[wordToTypeIndex];
  const isInputValid =
    wordToType?.substring(0, inputValue.length) === inputValue;

  const getStats = (): Stats => {
    const { start, end } = timer;
    const _end = end || Date.now();
    const totalTime = _end - start;
    const oneMinInMs = 60000;
    const textWordLength = text.split(' ').length;

    const cpm = text.length * (oneMinInMs / totalTime);
    const wpm = textWordLength * (oneMinInMs / totalTime);
    return {
      wpm: Math.round(wpm),
      acc: Math.round(cpm),
    };
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!timer.start) {
      // onStart
      setTimer((prev) => ({ ...prev, start: Date.now() }));
      setIsGameStarted.on();
    }

    const value = e.currentTarget.value;
    const endsWithSpace = value.slice(-1) === ' ';
    const valueWithoutLastSpace = endsWithSpace ? value.slice(0, -1) : value;
    const isWordValid = valueWithoutLastSpace === textArray[wordToTypeIndex];
    const stop = isWordValid && isLastWord;

    if (stop || (isWordValid && endsWithSpace)) {
      if (stop) {
        setTimer((prev) => ({ ...prev, end: Date.now() }));
        onFinish?.(getStats());
      }
      setValidWords((prev) => {
        const newValidWords = [...prev, value.replaceAll(' ', '')];
        // set new progress value
        const allCharsLength = textArray.join('').length;
        const validCharsLength = newValidWords.join('').length;
        /** This setProgress call will trigger error (not fixable right now)  */
        setProgress(validCharsLength / allCharsLength);
        return newValidWords;
      });
      setWordToTypeIndex((prev) => {
        const newIndex = prev + 1;
        const progress = newIndex / textArray.length;
        if (room) onChangeProgress(progress);
        return newIndex;
      });

      setInputValue('');
    } else {
      const allCharsLength = textArray.join('').length;
      const validCharsLength = validWords.join('').length;
      const newProgress = (validCharsLength + value.length) / allCharsLength;
      if (isInputValid && newProgress > progress) {
        setProgress((validCharsLength + value.length) / allCharsLength);
      }
      setInputValue(value);
    }
  };

  const onReset = (): void => {
    setInputValue('');
    setValidWords([]);
    setWordToTypeIndex(0);
    setTimer(defaultTimer);
    setProgress(0);
    setIsGameStarted.off();
  };

  return {
    validText: validWords.join(' '),
    wordToType,
    inputValue,
    textToType: textArray.slice(wordToTypeIndex + 1).join(' '),
    isFinished,
    hasError: !isInputValid,
    timer,
    onReset,
    handleChange,
  };
};

export default useTyper;
