import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

const createServer = () => {
  const app = express();
  const server = http.createServer(app);
  app.use(cors());
  const io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));

  return { app, server, io };
};

export default createServer;
