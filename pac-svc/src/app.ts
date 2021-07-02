import { Server } from "colyseus";
import { createServer } from "http";
import express from "express";
const port = Number(process.env.port) || 3000;

const app = express();
app.use(express.json());

// https://docs.colyseus.io/server/api/#new-server-options
const gameServer = new Server({
  server: createServer(app)
});

gameServer.listen(port);