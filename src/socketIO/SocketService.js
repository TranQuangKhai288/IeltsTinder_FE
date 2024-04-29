// SocketService.js

import io from "socket.io-client";
const ENDPOINT = process.env.URL_API || "http://192.168.1.166:5000";

let socket;
export const connectSocket = () => {
  socket = io(ENDPOINT);
  // Lắng nghe sự kiện "connect"
  socket.on("connect", () => {
    console.log("Connected to server");
  });

  // Lắng nghe sự kiện "disconnect"
  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
};
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const getSocket = () => {
  return socket;
};

export const setupSocket = (user) => {
  if (socket) {
    socket.emit("setup", user);
  }
};

export const joinRoom = (room) => {
  if (socket) {
    socket.emit("join-a-chat-room", room);
  }
};
