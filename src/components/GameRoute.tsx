import React, { PropsWithChildren } from 'react';
import usePlayerStore from '../store/usePlayerStore';
import { Navigate } from 'react-router-dom';

/** This component checks if the user has a valid nickname  */
const GameRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const nickname = usePlayerStore((store) => store.nickname);

  if (!nickname) return <Navigate to="/player" replace />;

  return <>{children}</>;
};

export default GameRoute;
