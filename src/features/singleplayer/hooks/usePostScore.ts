import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import { Stats } from '../../../hooks/useTyper';
import usePlayerStore from '../../../store/usePlayerStore';

type PostScore = (stats: Stats) => Promise<boolean>;

const usePostScore = (jokeId?: string): PostScore => {
  const { nickname, id: playerId } = usePlayerStore((state) => state);

  const postScore = async (stats: Stats): Promise<boolean> => {
    if (!jokeId) return false;
    const playerDocRef = doc(
      firestore,
      `leaderboard/${jokeId}/players/${playerId}`,
    );
    try {
      await setDoc(playerDocRef, {
        name: nickname,
        wpm: stats.wpm,
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
