const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const { json } = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan');
const { yellow, bold, red } = require('colors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xXssProtection = require('x-xss-protection');
const hpp = require('hpp');

// Adding environment variables
dotenv.config({ path: './config/config.env' });

// Importing Routes
const messageRouter = require('./routes/messageRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const roomsRouter = require('./routes/roomsRouter');
const servicesRouter = require('./routes/servicesRouter');

const app = express();
app.set('trust proxy', true);

connectDB();

// Mount middlewares
// Needed to be able to read body data
app.use(json());
app.use(express.urlencoded({ extended: true }));
// Mount custome logger to Server
app.use(morgan('dev'));
// use express middleware for easier cookie handling
app.use(cookieParser());

// use cors
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
  })
);
app.use(mongoSanitize());
app.use(helmet());
app.use(xXssProtection());
app.use(hpp());

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

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(red(`Error: ${err.message}`));
});
