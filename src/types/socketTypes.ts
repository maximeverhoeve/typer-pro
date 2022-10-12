export interface Message {
  message: string;
  nickname: string;
}

export interface ServerToClientEvents {
  receive_message: (p: { message: string; nickname: string }) => void;
  room_joined: (p: { room: string; nickname: string }) => void;
}

export interface ClientToServerEvents {
  send_message: (p: { message: string }) => void;
  join_room: (p: { room: string; nickname: string }) => void;
}
