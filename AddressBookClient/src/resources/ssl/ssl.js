'use strict'

const fs = require('fs');

module.exports = {
    key: fs.readFileSync('src/resources/ssl/server.key'),
    cert: fs.readFileSync('src/resources/ssl/server.crt')
};