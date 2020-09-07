const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const { json } = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan');
const { yellow, bold } = require('colors');
// Adding environment variables
dotenv.config({ path: './config/config.env' });

// Importing Routes
const messageRouter = require('./routes/messageRouter');

const app = express();
connectDB();

// Mount middlewares
app.use(json());
app.use(morgan('dev'));

// Mount routes
app.use('/api/v1/message', messageRouter);

// Error handler middleware
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(yellow(bold(`Listening on http://localhost:${port}`)));
});
