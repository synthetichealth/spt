const express = require('express');
const { StatusCodes } = require('http-status-codes');
const db = require('../storage/DataAccess');
const { default: base64url } = require('base64url');

function createHandler(collectionName, req, res) {
  const newItem = req.body;
  db.insert(collectionName, newItem);
  res.status(StatusCodes.CREATED).send(newItem);
}

function isMatch(object, attrs) {
  // check if object contains all attrs
  // it's ok if object contains more things not in attrs
  for (const [key, value] of Object.entries(attrs)) {
    if (object[key] !== value) return false;
  }

  return true;
}

function getHandler(collectionName, req, res) {
  const result = db.select(collectionName, (row) => isMatch(row, req.query));
  res.send(result);
}

function updateHandler(collectionName, req, res) {
  const changedItem = req.body;
  if (req.query.id) db.upsert(collectionName, changedItem, (r) => r.id === req.query.id);
  else if (req.query.fullUrl) {
    const fullUrl = base64url.decode(req.query.fullUrl);
    db.upsert(collectionName, changedItem, (r) => r.fullUrl === fullUrl);
  } else {
    res.send('Must include id or fullUrl').status(StatusCodes.BAD_REQUEST);
    return;
  }

  res.sendStatus(StatusCodes.OK);
}

function deleteHandler(collectionName, req, res) {
  if (req.query.id) {
    db.delete(collectionName, (r) => r.id === req.query.id);
  } else if (req.query.fullUrl) {
    const fullUrl = base64url.decode(req.query.fullUrl);
    db.delete(collectionName, (r) => r.fullUrl === fullUrl);
  } else {
    res.send('Must include id or fullUrl').status(StatusCodes.BAD_REQUEST);
    return;
  }

  res.sendStatus(StatusCodes.OK);
}

function genericController(collectionName) {
  const router = express.Router();

  router.post('/', (req, res) => {
    createHandler(collectionName, req, res);
  });

  router.get('/', (req, res) => {
    getHandler(collectionName, req, res);
  });

  router.put('/', (req, res) => {
    updateHandler(collectionName, req, res);
  });

  router.delete('/', (req, res) => {
    deleteHandler(collectionName, req, res);
  });

  return router;
}

module.exports = { genericController };
