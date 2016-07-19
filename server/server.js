// Main starting point of the application
const express = require('express');
const http = require('http');
const bp = require('body-parser');
const morgan = require('morgan');
const router = require('./router.js');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Database Setup
mongoose.connect('mongodb://localhost/server_side_auth');

// App Setup
  // Express Middleware
app.use(morgan('combined'));
app.use(cors());
app.use(bp.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
console.log('Server Listening on PORT', port);
