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

export const useMitt = (): MittContextType => useContext(MittContext);
