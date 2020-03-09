'use strict';

const serverless = require('serverless-http');
const app = require('./config/custom-express')

module.exports.handler = serverless(app);