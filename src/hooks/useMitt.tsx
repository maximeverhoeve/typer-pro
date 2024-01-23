import React, { useContext, PropsWithChildren } from 'react';
import mitt, { Emitter } from 'mitt';
import { MittEvents } from '../types/mittTypes';

const emitter: Emitter<MittEvents> = mitt();

export interface MittContextType {
  emitter: Emitter<MittEvents>;
}

const MittContext = React.createContext<MittContextType>({ emitter });

export const MittProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <MittContext.Provider value={{ emitter }}>{children}</MittContext.Provider>
  );
};

/**
 * Used for communicating between the react components and the react three fiber components
 * Using this instead of listing to state updates in a useEffect to prevent unneed rerenders or states that are behind
 * Works like custom event listeners
 */
export const useMitt = (): MittContextType => useContext(MittContext);
