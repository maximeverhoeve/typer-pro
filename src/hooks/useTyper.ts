import { ChangeEvent, useState } from 'react';
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

const useTyper = (text: string): ReturnProps => {
  const textArray = text.split(' ');
  const [validWords, setValidWords] = useState<string[]>([]);
  const [wordToTypeIndex, setWordToTypeIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [timer, setTimer] = useState<Timer>(defaultTimer);
  const { onChangeProgress, room } = useSocketContext();

  const isFinished = textArray.length < wordToTypeIndex + 1;
  const isLastWord = textArray.length < wordToTypeIndex + 2;
  const wordToType = textArray[wordToTypeIndex];
  const isInputValid =
    wordToType?.substring(0, inputValue.length) === inputValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!timer.start) {
      setTimer((prev) => ({ ...prev, start: Date.now() }));
    }

    const value = e.currentTarget.value;
    const endsWithSpace = value.slice(-1) === ' ';
    const valueWithoutLastSpace = endsWithSpace ? value.slice(0, -1) : value;
    const isWordValid = valueWithoutLastSpace === textArray[wordToTypeIndex];
    const stop = isWordValid && isLastWord;

    if (stop || (isWordValid && endsWithSpace)) {
      if (stop) {
        setTimer((prev) => ({ ...prev, end: Date.now() }));
      }
      setValidWords((prev) => [...prev, value.replaceAll(' ', '')]);
      setWordToTypeIndex((prev) => {
        const newIndex = prev + 1;
        const progress = newIndex / textArray.length;
        if (room) onChangeProgress(progress);
        return newIndex;
      });

      setInputValue('');
    } else {
      setInputValue(value);
    }
  };

  const onReset = (): void => {
    setInputValue('');
    setValidWords([]);
    setWordToTypeIndex(0);
    setTimer(defaultTimer);
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
