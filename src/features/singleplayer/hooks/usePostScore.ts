import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import usePlayerStore from '../../../store/usePlayerStore';
import { PlayerStats } from '../types/GameTypes';

type PostScore = (stats: PlayerStats, text: string) => Promise<boolean>;

const usePostScore = (jokeId?: string): PostScore => {
  const { nickname, id: playerId } = usePlayerStore((state) => state);

  const postScore = async (
    stats: PlayerStats,
    text: string,
  ): Promise<boolean> => {
    if (jokeId == null) return false;
    const playerDocRef = doc(
      firestore,
      `leaderboard/${jokeId}/players/${playerId}`,
    );
    const jokeDocRef = doc(firestore, `leaderboard/${jokeId}`);
    try {
      await setDoc(playerDocRef, {
        name: nickname,
        wpm: stats.wpm,
        acc: stats.acc,
        id: playerId,
      });
      await setDoc(jokeDocRef, {
        text,
      });
      return true;
    } catch (err) {
      console.error('playerdata was not added', err);
      return false;
    }
  };

  return postScore;
};

export default usePostScore;
