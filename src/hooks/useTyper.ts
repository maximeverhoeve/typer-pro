import { ChangeEvent, useState } from 'react';

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
  const isFinished = textArray.length < wordToTypeIndex + 1;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!timer.start) {
      setTimer((prev) => ({ ...prev, start: Date.now() }));
    }
    const value = e.currentTarget.value;
    const valueWithoutSpaces = value.replaceAll(' ', '');
    const isWordValid = valueWithoutSpaces === textArray[wordToTypeIndex];
    const hasInputASpace = value.includes(' ');

    if (isWordValid && hasInputASpace) {
      if (textArray.length < wordToTypeIndex + 2) {
        // finsihed => stop timer
        setTimer((prev) => ({ ...prev, end: Date.now() }));
      }
      setValidWords((prev) => [...prev, valueWithoutSpaces]);
      setWordToTypeIndex((prev) => (prev += 1));
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
    wordToType: textArray[wordToTypeIndex],
    inputValue,
    textToType: textArray.slice(wordToTypeIndex + 1).join(' '),
    isFinished,
    timer,
    onReset,
    handleChange,
  };
};

export default useTyper;
