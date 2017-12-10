'use strict'

//const https = require('https');
const http = require('http');
const server = require('./server.js');
//const ssl = require('./resources/ssl');
const config = require('./config');

//Specifying port number from config.js
const port = process.env.PORT || config.port.web;

//Creating a HTTPS server
http.createServer(server).listen(port, function () {
    console.log("Running Address Book client on port:", port);
});
