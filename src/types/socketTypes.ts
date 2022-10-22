export interface Message {
  message: string;
  nickname: string;
  room: string;
}

export interface ServerToClientEvents {
  'chat:receive': (p: { message: string; nickname: string }) => void;
  'room:joined': (p: { room: string; nickname: string }) => void;
  'room:left': () => void;
  'room:update': (players: string[]) => void;
}
export interface ClientToServerEvents {
  'chat:send': (p: { message: string; nickname: string; room: string }) => void;
  'room:join': (p: { room: string; nickname: string }) => void;
  'room:leave': () => void;
}

export interface SocketData {
  nickname: string;
  room: string;
}
