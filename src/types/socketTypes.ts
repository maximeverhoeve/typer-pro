export interface Player {
  nickname: string;
  isReady: boolean;
  progress: number; // percentage
}

export interface Message {
  message: string;
  nickname: string;
  room: string;
}

export interface ServerToClientEvents {
  'chat:receive': (p: { message: string; nickname: string }) => void;
  'room:joined': (p: { room: string; nickname: string }) => void;
  'room:left': () => void;
  'room:update': (players: Player[]) => void;
  'game:started': (text: string) => void;
}
export interface ClientToServerEvents {
  'chat:send': (p: { message: string; nickname: string; room: string }) => void;
  'room:join': (p: { room: string; nickname: string }) => void;
  'room:leave': () => void;
  'player:update-ready': (isReady: boolean) => void;
  'player:progress': (progress: number) => void;
  'game:start': () => void;
}
