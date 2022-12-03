import React from 'react';
import { useLocation } from 'react-router-dom';

const SinglePlayerResults: React.FC = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <div>
      <p>Results</p>
    </div>
  );
};

export default SinglePlayerResults;
