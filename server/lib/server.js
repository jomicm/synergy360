const express = require('express');
const { createServer } = require('http');
const socket = require('./socket');

const app = express();
const server = createServer(app);

module.exports.run = (config) => {
  server.listen(config.PORT);
  socket(server);
  console.log(`Server is listening at :${config.PORT}`);
};
