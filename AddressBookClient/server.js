'use strict'

// Bring in packages
const path = require("path");
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const router = require('./router');
const config = require('./config');
const server = express();
const DIST_DIR = path.join(__dirname, "dist");

// Use Helmet to secure express server
server.use(helmet());

// To support JSON and URL encoded bodies
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Mounting router
server.use(express.static(DIST_DIR));
server.use(router);

// Export module
module.exports = server;