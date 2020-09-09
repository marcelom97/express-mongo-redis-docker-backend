const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const { json } = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan');
const { yellow, bold, blue } = require('colors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// Adding environment variables
dotenv.config({ path: './config/config.env' });

// Importing Routes
const messageRouter = require('./routes/messageRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const roomsRouter = require('./routes/roomsRouter');
const servicesRouter = require('./routes/servicesRouter');

const app = express();
connectDB();

// Mount middlewares
// Needed to be able to read body data
app.use(json());
// Mount custome logger to Server
app.use(morgan('dev'));
// use express middleware for easier cookie handling
app.use(cookieParser());
// use cors
app.use(cors());

// Mount routes
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/rooms', roomsRouter);
app.use('/api/v1/service', servicesRouter);

// Error handler middleware
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(yellow(bold(`Listening on http://localhost:${port}`)));
});
