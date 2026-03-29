import { UseQueryResult, useQuery } from '@tanstack/react-query';
import getLeaderBoardJokes from './getLeaderboardJokes';
import { LeaderBoardObject } from '../types/LeaderBoardTypes';

const useLeaderboard = (): UseQueryResult<LeaderBoardObject[]> => {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: getLeaderBoardJokes,
    retry: false,
  }) as UseQueryResult<LeaderBoardObject[]>;
};

export default useLeaderboard;
