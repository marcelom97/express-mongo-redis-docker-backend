const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const messageRouter = require('./routes/messageRouter');
const { json } = require('body-parser');
// Adding environment variables
dotenv.config({ path: './config/config.env' });

const app = express();
connectDB();

app.use(json());
const port = process.env.PORT || 5000;

app.use('/api/v1/message', messageRouter);

app.get('/api/v1', (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Hello from '/'"
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
