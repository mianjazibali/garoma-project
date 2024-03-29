const express = require('express');
const bodyParser = require('body-parser');

global.db = require('./models');

const routes = require('./routes');

const app = express();

app.use(bodyParser.json());

routes(app);

module.exports = app;
