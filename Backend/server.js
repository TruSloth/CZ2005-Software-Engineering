const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const register = require("./routes/register");
const login = require("./routes/login");
const queue = require("./routes/queue");
const serviceProvider = require("./routes/serviceProvider");
const history = require("./routes/history");
const {createServer} = require('http');
const {Server} = require('socket.io');

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected"));

const httpServer = createServer(app);

app.use(express.json());
app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: "*"
  },
})

io.on("connection", (socket) => {
  console.log('socket connected')
  socket.on('join-room', (room) => {
    console.log(`adding ${socket.data.userName} to ${room}`)
    socket.join(room);
  })

  socket.on('add-username', (userName) => {
    console.log(`attaching username ${userName} to socket`)
    socket.data.userName = userName
  })

  socket.on('send-chat-message', (msg, room) => {
    console.log(`received msg from ${socket.data.userName} in ${room}`)
    socket.to(room).emit('received-message', msg)
  })

  socket.on('leave-room', (room) => {
    console.log(`removing ${socket.data.userName} from ${room}`)
    socket.leave(room)
  })

  socket.on('leave-queue', () => {
    socket.disconnect(false)
  })
})

app.use("/", register);
app.use("/", login);
app.use("/", serviceProvider);
app.use("/", (req, res, next) => {
  req.io = io;
  console.log(req.io)
  next();
}, queue);
app.use("/", history);

httpServer.listen(4000, () => console.log("Server is up"));
