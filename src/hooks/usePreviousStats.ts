import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { LeaderboardPlayer } from '../features/types/database';
import { firestore } from '../firebase';
import usePlayerStore from '../store/usePlayerStore';

const usePreviousStats = (
  textId?: string,
): UseQueryResult<LeaderboardPlayer | undefined> => {
  const { id: playerId } = usePlayerStore();

  return useQuery({
    queryKey: ['player-stats', playerId, textId],
    queryFn: async () => {
      if (textId == null) return undefined;
      const playerDataRef = doc(
        firestore,
        `leaderboard/${textId}/players/${playerId}`,
      );
      const snapshot = await getDoc(playerDataRef);
      return snapshot.exists()
        ? (snapshot.data() as LeaderboardPlayer)
        : undefined;
    },
    enabled: textId != null,
  });
};

export default usePreviousStats;
