// server.js

/* eslint-disable no-undef */
const express = require("express");
const app = express();
const http = require("http");
const Server = require("socket.io").Server;
const ACTIONS = require("./Actions.js").ACTIONS;
const config = require("dotenv").config;
const path = require("path");

const server = http.createServer(app);
const io = new Server(server);

// Define the maps here
const userToSocketMap = {};
const socketToUserMap = {};

app.use(express.static("dist"));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Your existing code continues...

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: socketToUserMap[socketId], // Corrected variable name
      };
    }
  );
};

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    // Disconnect previous connection if exists
    const existingSocketId = userToSocketMap[username];
    if (existingSocketId && io.sockets.sockets.get(existingSocketId)) {
      io.to(existingSocketId).emit(
        "forceDisconnect",
        "You have logged in from another device."
      );
      io.sockets.sockets.get(existingSocketId).disconnect(true);
    }

    // Update maps with new connection
    userToSocketMap[username] = socket.id;
    socketToUserMap[socket.id] = username;

    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    console.log(clients);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on("disconnecting", () => {
    const username = socketToUserMap[socket.id];
    if (username) {
      const rooms = [...socket.rooms];
      rooms.forEach((roomId) => {
        socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
          socketId: socket.id,
          username,
        });
      });
      // Clean up maps
      delete userToSocketMap[username];
      delete socketToUserMap[socket.id];
    }
  });
});

app.get("/", (req, res) => {
  res.send("API is running");
});

config();
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
