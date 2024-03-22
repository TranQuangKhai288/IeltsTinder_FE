// SocketService.js

import io from "socket.io-client";

const ENDPOINT = "http://192.168.1.5:5000";
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
