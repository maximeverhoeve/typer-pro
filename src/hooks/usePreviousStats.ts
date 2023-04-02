import { useFirestoreDocumentData } from '@react-query-firebase/firestore';
import { doc } from 'firebase/firestore';
import { UseQueryResult } from 'react-query';
import { LeaderboardPlayer } from '../features/types/database';
import { firestore } from '../firebase';
import usePlayerStore from '../store/usePlayerStore';

const usePreviousStats = (
  textId?: string,
): UseQueryResult<LeaderboardPlayer> => {
  const { id: playerId } = usePlayerStore();

  const playerDataRef =
    textId != null
      ? doc(firestore, `leaderboard/${textId}/players/${playerId}`)
      : undefined;

  return useFirestoreDocumentData(
    ['player-stats', playerId, textId],
    playerDataRef,
  );
};

export default usePreviousStats;
