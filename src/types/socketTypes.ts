export interface Player {
  nickname: string;
  isReady: boolean;
  isLoaded: boolean; // If multiplayer game is rednered
  progress: number; // percentage
  id: string;
  color: string;
}

export interface Message {
  message: string;
  nickname: string;
  room: string;
}

export interface Room {
  name: string;
  /** Player count */
  count: number;
}

export type RoomStatus =
  | 'IDLE' /** Not all players are ready in pre-game lobby / finish */
  | 'LAUNCHING' /** All players are ready in pre-game lobby and countdown started */
  | 'JOINING' /** Not all players are loaded in teh game yet */
  | 'STARTING' /** All players are loaded and the start countdown has started */
  | 'IN-PROGRESS'; /** All players are loaded and the players can type (countdown ended) */

export interface RoomState {
  name: string;
  status: RoomStatus;
  countdown: number;
  text?: string;
  leaderboard?: {
    [playerId: string]: {
      name: string;
      wpm: number;
      acc: number;
    };
  };
}

export interface ServerToClientEvents {
  'chat:receive': (p: { message: string; nickname: string }) => void;
  'room:joined': (p: { room: string; nickname: string }) => void;
  'room:left': () => void;
  'room:update': (players: Player[]) => void;
  'room:update-countdown': (countdown: number) => void;
  'room:countdown-ended': () => void;
  'rooms:get': (rooms: Room[]) => void;
  'game:started': (text: string) => void;
  'roomstate:update': (roomState: RoomState) => void;
}
export interface ClientToServerEvents {
  'chat:send': (p: { message: string; nickname: string; room: string }) => void;
  'room:join': (p: { room: string; nickname: string }) => void;
  'room:leave': () => void;
  'rooms:request': () => void;
  'room:request': (room: string) => void;
  'player:update': (payload: Partial<Player>) => void;
  'player:update-ready': (isReady: boolean) => void;
  'player:progress': (progress: number) => void;
  'room:finished': (stats: { wpm: number; acc: number }) => void;
}
