import React from 'react';
import CustomTable from '../custom-table/CustomTable';

interface Props {
  id: string;
}

const SinglePlayerLeaderboard: React.FC<Props> = () => {
  const data = [
    {
      id: '3263236',
      name: 'Maxime',
      acc: 43,
      wpm: 120,
    },
    {
      id: '3263232',
      name: 'Robbe',
      acc: 96,
      wpm: 130,
    },
    {
      id: '3263237',
      name: 'Martijn',
      acc: 66,
      wpm: 85,
    },
    {
      id: '3263237',
      name: 'Martijn',
      acc: 66,
      wpm: 85,
    },
    {
      id: '3263237',
      name: 'Martijn',
      acc: 66,
      wpm: 85,
    },
    {
      id: '3263237',
      name: 'Martijn',
      acc: 66,
      wpm: 85,
    },
    {
      id: '3263237',
      name: 'Martijn',
      acc: 66,
      wpm: 85,
    },
    {
      id: '3263237',
      name: 'Martijn',
      acc: 66,
      wpm: 85,
    },
    {
      id: '3263237',
      name: 'Martijn',
      acc: 66,
      wpm: 85,
    },
    {
      id: '3263237',
      name: 'Martijn',
      acc: 66,
      wpm: 85,
    },
  ];

  return <CustomTable data={data} playerId="3263232" />;
};

export default SinglePlayerLeaderboard;
