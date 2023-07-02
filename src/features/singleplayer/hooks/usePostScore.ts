import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import usePlayerStore from '../../../store/usePlayerStore';
import { PlayerStats } from '../types/GameTypes';

type PostScore = (stats: PlayerStats) => Promise<boolean>;

const usePostScore = (jokeId?: string): PostScore => {
  const { nickname, id: playerId } = usePlayerStore((state) => state);

  const postScore = async (stats: PlayerStats): Promise<boolean> => {
    if (jokeId == null) return false;
    const playerDocRef = doc(
      firestore,
      `leaderboard/${jokeId}/players/${playerId}`,
    );
    try {
      await setDoc(playerDocRef, {
        name: nickname,
        wpm: stats.wpm,
        acc: stats.acc,
        id: playerId,
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
