import { useBoolean } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export interface Joke {
  joke: string;
}

interface ReturnProps {
  jokes: Joke[];
  isLoading: boolean;
  onRestart: () => void;
}

const useJokes = (): ReturnProps => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useBoolean();
  const getData = async (): Promise<void> => {
    setIsLoading.on();
    const data = await fetch(
      'https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist,sexist&type=single&amount=2',
    );
    if (data.ok) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const res: { jokes: Joke[] } = await data.json();
      const _jokes = res.jokes.map((j) => ({
        ...j,
        joke: j.joke.replace(/\s+/g, ' ').trim(),
      }));
      setJokes(_jokes);
    } else {
      console.error('Error fetching jokes api', data);
    }
    setIsLoading.off();
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData();
  }, []);

  const onRestart = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData();
  };

  return {
    jokes,
    isLoading,
    onRestart,
  };
};

export default useJokes;
