require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const { genericController } = require('./handlers/crudHandler');
const collections = require('./storage/collections');

const app = express();

app.use('/public', express.static(__dirname + '/../public'));
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json({ type: ['application/json', 'application/fhir+json'] }));

// Routes for collections
Object.values(collections).forEach((collectionName) => {
  app.use(`/collection/${collectionName}`, genericController(collectionName));
});

// frontend
app.get('/', (req, res) => res.redirect('/spt'));
app.get('/spt', (req, res) => res.sendFile('index.html', { root: __dirname + '/../public' }));

module.exports = app;
