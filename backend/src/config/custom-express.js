'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('../app/routes/router')
const container = require('./container');
const requestContainer = require('../app/middlewares/request-container');
const { scopePerRequest } = require('awilix-express');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet.hidePoweredBy())

app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

app.use(scopePerRequest(container));
app.use(requestContainer);
app.use('/v1', routes);

app.get("/", function(req, res) {
    res.send({});
});

module.exports = app;