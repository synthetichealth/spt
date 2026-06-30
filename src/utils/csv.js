const db = require('../storage/DataAccess');
const { parse } = require('csv-parse');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const { promisify } = require('util');

const globAsync = promisify(glob);

async function loadCsvFile(filePath) {
  const parser = fs.createReadStream(filePath).pipe(parse({ columns: true }));
  const extension = path.extname(filePath);
  const filename = path.basename(filePath, extension);

  for await (const record of parser) {
    db.insert(filename, record);
  }
}

async function loadCsvFromDirectory(dir) {
  const files = await globAsync(path.join(dir, '*.csv'));
  await Promise.all(files.map(loadCsvFile));
  return files;
}

module.exports = { loadCsvFromDirectory, loadCsvFile };
