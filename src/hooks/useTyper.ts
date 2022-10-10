import { ChangeEvent, useState } from 'react';

interface ReturnProps {
  validText: string;
  wordToType: string;
  inputValue: string;
  textToType: string;
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

  return {
    validText: validWords.join(' '),
    wordToType: textArray[wordToTypeIndex],
    inputValue,
    textToType: textArray.slice(wordToTypeIndex + 1).join(' '),
    handleChange,
  };
};

export default useTyper;
