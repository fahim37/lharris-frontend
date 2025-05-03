// utils/socket.ts
import { io } from "socket.io-client";

let socket: ReturnType<typeof io> | null = null;

export const connectSocket = (token: string, chatId: string) => {
  socket = io("http://localhost:5002", {
    query: {
      token,
      chatId,
    },
    transports: ["websocket"],
  });

  return socket;
};

export const getSocket = () => socket;
