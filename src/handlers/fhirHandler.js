const express = require('express');
const { StatusCodes } = require('http-status-codes');

const collections = require('../storage/collections');
const db = require('../storage/DataAccess');
const { loadFhirFromPath } = require('../utils/fhirBulk');

const router = express.Router();

router.post('/load', async (req, res) => {
  if (!req.body.path) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
    return;
  }

  try {
    const summary = await loadFhirFromPath(req.body.path);
    res.status(StatusCodes.OK).send(summary);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: error.message || 'Unable to load FHIR files.',
    });
  }
});

router.post('/clear', (_req, res) => {
  Object.values(collections).forEach((collectionName) => {
    db.delete(collectionName, (row) => row.sourceFormat === 'fhir');
  });
  res.sendStatus(StatusCodes.OK);
});

module.exports = router;
