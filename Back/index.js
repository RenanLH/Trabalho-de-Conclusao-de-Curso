import mongoose from 'mongoose'
import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import routes from './Routes/server.js';
import { createServer } from 'http';
import { Server } from 'socket.io';


dotenv.config();

const dbUri = process.env.DATABASE_URI;

mongoose.connect(dbUri)
  .catch((error) => console.log(error))
  .then(() => console.log("conected to database"))

const app = express();
const httpServer = createServer(app);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());
app.use(cors());
app.use(routes);

const io = new Server(httpServer, {
  cors: {
    origin: "https://plataforma.apoiomigrante.online",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Usuário conectado:', socket.id);

  socket.on('join', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} entrou na sala: ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

const PORT = process.env.PORT || 9875;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("SIGTERM", () => {
  app.close(() => {
    console.log("Server closed, port released.");
    process.exit(0);
  });
});

