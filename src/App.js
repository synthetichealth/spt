require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const csvHandler = require('./handlers/csvHandler');
const { genericController } = require('./handlers/crudHandler');
const collections = require('./storage/collections');

const app = express();

app.use('/public', express.static(__dirname + '/../public'));
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json({ type: ['application/json', 'application/fhir+json'] }));

// Routes for collections
Object.values(collections).forEach(collectionName => {
  app.use(`/collection/${collectionName}`, genericController(collectionName));
});

app.use('/csv', csvHandler);

// frontend
app.get('/', (req, res) => res.sendFile('index.html', { root: __dirname + '/../public' }));

module.exports = app;
