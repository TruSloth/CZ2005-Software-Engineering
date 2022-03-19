const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const register = require("./routes/register");
const login = require("./routes/login");
const queue = require("./routes/queue");
const {createServer} = require('http');
const {Server} = require('socket.io');
const { stringify } = require("querystring");

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database connected")
);

app.use(express.json());
app.use(cors());
app.use("/", register);
app.use("/", login);
app.use("/", queue);

const httpServer = createServer(app);
//app.listen(4000, () => console.log("Server is up"));

const io = new Server(httpServer, {
  cors: {
    origin: "*"
  },
})

io.on("connection", (socket) => {
  socket.on('join-room', (room) => {
    socket.join(room);
  })

  socket.on('send-chat-message', (msg, room) => {
    socket.to(room).emit('received-message', msg)
  })

  socket.on('leave-room', (room) => {
    socket.leave(room)
  })

  socket.on('leave-queue', () => {
    socket.disconnect(false)
  })
})

httpServer.listen(4000, () => console.log("Server is up"));
