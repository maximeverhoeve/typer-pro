import { ChangeEvent, useState } from 'react';

interface ReturnProps {
  validText: string;
  wordToType: string;
  inputValue: string;
  textToType: string;
  isFinished: boolean;
  onReset: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const useTyper = (text: string): ReturnProps => {
  const textArray = text.split(' ');
  const [validWords, setValidWords] = useState<string[]>([]);
  const [wordToTypeIndex, setWordToTypeIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    const valueWithoutSpaces = value.replaceAll(' ', '');
    const isWordValid = valueWithoutSpaces === textArray[wordToTypeIndex];
    const hasInputASpace = value.includes(' ');

    if (isWordValid && hasInputASpace) {
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
  };

  return {
    validText: validWords.join(' '),
    wordToType: textArray[wordToTypeIndex],
    inputValue,
    textToType: textArray.slice(wordToTypeIndex + 1).join(' '),
    isFinished: textArray.length < wordToTypeIndex + 1,
    onReset,
    handleChange,
  };
};

export default useTyper;
