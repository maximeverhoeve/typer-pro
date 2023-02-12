import { useBoolean } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export interface Joke {
  id: string;
  error: boolean;
  category: string;
  safe: boolean;
  lang: string;
  joke: string;
}

interface ReturnProps {
  joke?: Joke;
  isLoading: boolean;
  onRestart: () => void;
}

const useJoke = (textId?: string): ReturnProps => {
  const [joke, setJoke] = useState<Joke>();
  const [isLoading, setIsLoading] = useBoolean();

  const formatJoke = (j: Joke): Joke => {
    const withoutWeirdChars = j.joke.replace(/\s+/g, ' ').trim();
    const removedWeirdLine = withoutWeirdChars
      .replaceAll('–', '-')
      // eslint-disable-next-line @typescript-eslint/quotes
      .replaceAll(`’`, `'`);

    return { ...j, joke: removedWeirdLine.replaceAll('"', '') };
  };

  const getData = async (): Promise<void> => {
    setIsLoading.on();
    let url =
      'https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist,sexist&type=single&amount=1';
    if (textId) {
      url = url + `&idRange=${textId}`;
    }
    const data = await fetch(url);
    if (data.ok) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const res: Joke = await data.json();
      setJoke(formatJoke(res));
    } else {
      console.error('Error fetching jokes api', data);
    }
    setIsLoading.off();
  };

  useEffect(() => {
    if (!isLoading) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getData();
    }
  }, []);

  const onRestart = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData();
  };

  return {
    joke,
    isLoading,
    onRestart,
  };
};

export default useJoke;
