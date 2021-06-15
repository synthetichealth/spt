const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const collections = require('../storage/collections');
const db = require('../storage/DataAccess');
const { loadCsvFromDirectory } = require('../utils/csv');


router.post('/load', async (req, res) => {
  if (!req.body.path) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  let path = req.body.path;

  if (path.endsWith('patients.csv')) {
    path = path.slice(0, -12); // get just the path. TODO probably a safer way to do this
  }

  await loadCsvFromDirectory(path);
  res.sendStatus(StatusCodes.OK);
});

router.post('/clear', (_req, res) => {
  Object.values(collections).forEach(collectionName => {
    db.delete(collectionName, () => true);
  });
  res.sendStatus(StatusCodes.OK);
});


module.exports = router;
