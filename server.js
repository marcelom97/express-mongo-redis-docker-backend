const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const messageRouter = require('./routes/messageRouter');
const { json } = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan');
const { yellow, bold } = require('colors');
// Adding environment variables
dotenv.config({ path: './config/config.env' });

const app = express();
connectDB();

const port = process.env.PORT || 5000;

// Mount middlewares
app.use(json());
app.use(morgan('dev'));

// Mount routes
app.use('/api/v1/message', messageRouter);

app.get('/api/v1', (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Hello from '/'"
  });
});

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(yellow(bold(`Listening on http://localhost:${port}`)));
});
