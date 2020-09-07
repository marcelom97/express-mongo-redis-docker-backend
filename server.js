const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const { json } = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan');
const { yellow, bold, blue } = require('colors');
const socket = require('socket.io');

// Adding environment variables
dotenv.config({ path: './config/config.env' });

// Importing Routes
const messageRouter = require('./routes/messageRouter');
const userRouter = require('./routes/userRouter');

const app = express();
connectDB();

// Mount middlewares
app.use(json());
app.use(morgan('dev'));

// Mount routes
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/user', userRouter);

// Error handler middleware
app.use(errorHandler);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(yellow(bold(`Listening on http://localhost:${port}`)));
});

const io = socket(server);

io.on('connection', function (socket) {
  console.log(blue('Made socket connection!'));

  socket.on('new user', function (data) {
    socket.userId = data;
    // activeUsers.add(data);
    io.emit('new user', [...activeUsers]);
  });

  socket.on('join', room => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
  });
  socket.on('chat', data => {
    const { message, room } = data;
    console.log(`msg: ${message}, room: ${room}`);
    io.to(room).emit('chat', message);
  });

  socket.on('disconnect', () => {
    // activeUsers.delete(socket.userId);
    io.emit('user disconnected', socket.userId);
  });
});
