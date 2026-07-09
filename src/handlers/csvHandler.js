const express = require('express');
const path = require('path');
const { StatusCodes } = require('http-status-codes');

const collections = require('../storage/collections');
const db = require('../storage/DataAccess');
const { loadCsvFromDirectory } = require('../utils/csv');

const router = express.Router();

router.post('/load', async (req, res) => {
  if (!req.body.path) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
    return;
  }

  const csvPath = req.body.path.endsWith('patients.csv')
    ? path.dirname(req.body.path)
    : req.body.path;

  try {
    const loadedFiles = await loadCsvFromDirectory(csvPath);
    res.status(StatusCodes.OK).send({ loadedFiles });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: error.message || 'Unable to load CSV files.',
    });
  }
});

router.post('/clear', (_req, res) => {
  Object.values(collections).forEach((collectionName) => {
    db.delete(collectionName, (row) => row.sourceFormat !== 'fhir');
  });
  res.sendStatus(StatusCodes.OK);
});

module.exports = router;
